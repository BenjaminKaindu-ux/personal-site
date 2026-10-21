import fs from 'node:fs'
import path from 'node:path'

/**
 * `localWriter` — the engine behind the in-site Writing Studio.
 *
 * It only runs when you start the dev server (never in `vite build`,
 * never deployed), and it only lets YOU write files into the local
 * `content/` folder on this machine. The production site contains no
 * server, no backend, no API keys — it is 100% static, built from
 * those Markdown files.
 */
export default function localWriter() {
  return {
    name: 'local-writer',
    apply: 'serve', // dev-only
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.method || req.method !== 'POST' || !req.url.startsWith('/__write')) {
          next()
          return
        }

        let body = ''
        req.on('data', (chunk) => (body += chunk))
        req.on('end', () => {
          try {
            const root = server.config.root
            const { type, filename, content } = JSON.parse(body || '{}')

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
            if (!file.startsWith(path.resolve(root) + path.sep)) {
              throw new Error('Bad path')
            }

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
        return
      })
    },
  }
}