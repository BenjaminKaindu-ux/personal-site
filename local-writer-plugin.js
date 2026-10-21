import fs from 'node:fs'
import path from 'node:path'

/**
 * `localWriter` — the dev-server-only helper behind the Writing Studio.
 * It NEVER runs during `vite build` and is never deployed.
 *
 * Serves two things on your machine:
 *   1. POST /__write      → save an essay as a .md file into ./content
 *   2. GET/POST /api/pieces → the same "publish" API the live site has
 *      (backed by content/live-pieces.json locally, Cloudflare D1 in
 *      production) — so the studio behaves identically in dev.
 */

const TYPES = ['essays', 'ideas', 'notes', 'projects']
const LIVE_FILE = 'content/live-pieces.json'

const slugify = (s) =>
  String(s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)

function send(res, status, data) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json')
  res.end(JSON.stringify(data))
}

export default function localWriter() {
  return {
    name: 'local-writer',
    apply: 'serve', // dev-only
    configureServer(server) {
      const root = () => server.config.root

      const readLive = () => {
        const file = path.join(root(), LIVE_FILE)
        if (!fs.existsSync(file)) return []
        try {
          return JSON.parse(fs.readFileSync(file, 'utf8')).pieces || []
        } catch {
          return []
        }
      }

      const writeLive = (pieces) => {
        const file = path.join(root(), LIVE_FILE)
        fs.mkdirSync(path.dirname(file), { recursive: true })
        fs.writeFileSync(file, JSON.stringify({ pieces }, null, 2))
      }

      const piecesGet = (req, res) => {
        send(res, 200, { ok: true, pieces: readLive().map(serialize) })
      }

      const piecesPost = async (req, res) => {
        let body = ''
        for await (const chunk of req) body += chunk

        let input = {}
        try {
          input = JSON.parse(body || '{}')
        } catch {
          return send(res, 400, { ok: false, error: 'Invalid JSON body' })
        }

        const type = input.type
        const title = String(input.title || '').trim()
        if (!TYPES.includes(type)) return send(res, 400, { ok: false, error: 'Unknown type' })
        if (!title) return send(res, 400, { ok: false, error: 'Title is required' })
        if (!String(input.body || '').trim()) return send(res, 400, { ok: false, error: 'Body is required' })

        const pieces = readLive()
        const baseSlug = slugify(title) || 'piece'
        let slug = baseSlug
        let n = 2
        while (pieces.some((p) => p.type === type && p.slug === slug)) {
          slug = `${baseSlug}-${n++}`
          if (n > 1000) return send(res, 409, { ok: false, error: 'Could not allocate a unique slug' })
        }

        const piece = {
          id: Date.now(),
          type,
          slug,
          title,
          excerpt: String(input.excerpt || '').slice(0, 300),
          body: String(input.body || ''),
          tags: (Array.isArray(input.tags) ? input.tags : []).map(String).map((t) => t.trim()).filter(Boolean),
          style: String(input.style || '').slice(0, 40),
          createdAt: new Date().toISOString().replace('T', ' ').slice(0, 19),
        }
        pieces.unshift(piece)
        writeLive(pieces)
        send(res, 201, { ok: true, piece: serialize(piece) })
      }

      server.middlewares.use((req, res, next) => {
        if (!req.method || !req.url) return next()
        const url = req.url.split('?')[0]

        if (url === '/__write' && req.method === 'POST') {
          handleWrite(req, res, root())
          return
        }
        if (url === '/api/pieces') {
          if (req.method === 'GET') return piecesGet(req, res)
          if (req.method === 'POST') return piecesPost(req, res)
          return send(res, 405, { ok: false, error: 'Method not allowed' })
        }
        next()
      })
    },
  }
}

function serialize(p) {
  return {
    type: p.type,
    slug: p.slug,
    title: p.title,
    excerpt: p.excerpt || '',
    date: String(p.createdAt || '').slice(0, 10),
    createdAt: p.createdAt,
    tags: p.tags || [],
    style: p.style || '',
    body: p.body,
  }
}

function handleWrite(req, res, root) {
  let bodyRaw = ''
  req.on('data', (chunk) => (bodyRaw += chunk))
  req.on('end', () => {
    try {
      const { type, filename, content } = JSON.parse(bodyRaw || '{}')
      const dirs = ['essays', 'ideas', 'notes', 'projects']
      if (!dirs.includes(type)) throw new Error(`Unknown content type "${type}"`)
      if (typeof filename !== 'string' || !/^[a-z0-9][a-z0-9-]{0,79}\.md$/.test(filename)) {
        throw new Error('Filename must look like "my-essay.md"')
      }
      if (typeof content !== 'string' || content.length > 400_000) {
        throw new Error('Content missing or too large')
      }
      const dir = path.join(root, 'content', type)
      const file = path.resolve(dir, filename)
      if (!file.startsWith(path.resolve(root) + path.sep)) throw new Error('Bad path')
      fs.mkdirSync(dir, { recursive: true })
      fs.writeFileSync(file, content)
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify({ ok: true, file: path.relative(root, file) }))
    } catch (err) {
      res.statusCode = 500
      res.setHeader('Content-Type', 'application/json')
      res.end(
        JSON.stringify({ ok: false, error: String(err && err.message ? err.message : err) })
      )
    }
  })
}