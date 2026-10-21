// ============================================================
//  Cloudflare Pages Function — /api/pieces
//  The tiny API behind the Writing Studio's "Publish" button.
//  Stores writing in Cloudflare D1 (edge SQLite) and serves it
//  back to the site so published pieces appear instantly for
//  everyone. Requires a D1 binding named `DB` (see README).
//
//  Endpoints:
//    GET  /api/pieces  → list all published pieces
//    POST /api/pieces  → create/replace a published piece
// ============================================================

const TYPES = ["essays", "ideas", "notes", "projects"];

const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const slugify = (s) =>
  String(s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

async function ensureTable(env) {
  await env.DB.prepare(
    `CREATE TABLE IF NOT EXISTS pieces (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      type        TEXT NOT NULL,
      slug        TEXT NOT NULL,
      title       TEXT NOT NULL,
      excerpt     TEXT DEFAULT '',
      body        TEXT NOT NULL,
      tags        TEXT DEFAULT '',
      style       TEXT DEFAULT '',
      created_at  TEXT DEFAULT (datetime('now'))
    )`
  ).run();
  await env.DB.prepare(
    `CREATE INDEX IF NOT EXISTS idx_pieces_type ON pieces(type)`
  ).run();
}

function rowToPiece(row) {
  return {
    type: row.type,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt || "",
    date: String(row.created_at || "").slice(0, 10),
    createdAt: row.created_at,
    tags: (row.tags || "").split(",").map((t) => t.trim()).filter(Boolean),
    style: row.style || "",
    body: row.body,
  };
}

export async function onRequestGet(context) {
  const { env } = context;
  if (!env?.DB) return json({ ok: false, error: "DB_UNCONFIGURED" }, 500);

  try {
    await ensureTable(env);
    const rows = await env.DB.prepare(
      "SELECT * FROM pieces ORDER BY created_at DESC, id DESC LIMIT 500"
    ).all();
    return json({ ok: true, pieces: (rows.results || []).map(rowToPiece) });
  } catch (err) {
    return json({ ok: false, error: String(err && err.message ? err.message : err) }, 500);
  }
}

export async function onRequestPost(context) {
  const { env, request } = context;
  if (!env?.DB) return json({ ok: false, error: "DB_UNCONFIGURED" }, 500);

  let input;
  try {
    input = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON body" }, 400);
  }

  const type = input.type;
  let title = String(input.title || "").trim();
  if (!TYPES.includes(type)) return json({ ok: false, error: "Unknown type" }, 400);
  if (!title) return json({ ok: false, error: "Title is required" }, 400);
  if (title.length > 140) return json({ ok: false, error: "Title too long" }, 400);
  const body = String(input.body || "");
  if (!body.trim()) return json({ ok: false, error: "Body is required" }, 400);

  const baseSlug = input.slug || slugify(title) || "piece";
  const tags = Array.isArray(input.tags) ? input.tags.map(String).map((t) => t.trim()).filter(Boolean) : [];
  const style = String(input.style || "").slice(0, 40);

  try {
    await ensureTable(env);

    // find a slug that isn't taken yet (base, base-2, base-3, …)
    let slug = baseSlug;
    let n = 2;
    for (;;) {
      const existing = await env.DB.prepare("SELECT id FROM pieces WHERE type = ? AND slug = ?")
        .bind(type, slug)
        .first();
      if (!existing) break;
      if (n > 1000) return json({ ok: false, error: "Could not allocate a unique slug" }, 409);
      slug = `${baseSlug}-${n++}`;
    }

    await env.DB.prepare(
      `INSERT INTO pieces (type, slug, title, excerpt, body, tags, style)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(type, slug, title, String(input.excerpt || "").slice(0, 300), body, tags.join(","), style)
      .run();

    const row = await env.DB.prepare("SELECT * FROM pieces WHERE type = ? AND slug = ?")
      .bind(type, slug)
      .first();
    return json({ ok: true, piece: rowToPiece(row) }, 201);
  } catch (err) {
    return json({ ok: false, error: String(err && err.message ? err.message : err) }, 500);
  }
}