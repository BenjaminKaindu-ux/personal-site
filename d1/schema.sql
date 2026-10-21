-- Reference schema for the Cloudflare D1 database used by /api/pieces.
-- You don't normally need to run this: the function creates the table
-- automatically on first use. It's kept here for documentation/backup.

CREATE TABLE IF NOT EXISTS pieces (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  type        TEXT NOT NULL,              -- essays | ideas | notes | projects
  slug        TEXT NOT NULL,
  title       TEXT NOT NULL,
  excerpt     TEXT DEFAULT '',
  body        TEXT NOT NULL,
  tags        TEXT DEFAULT '',            -- comma separated
  style       TEXT DEFAULT '',
  created_at  TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_pieces_type ON pieces(type);