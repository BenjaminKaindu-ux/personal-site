// ============================================================
//  LIVE API CLIENT — talks to /api/pieces.
//  In dev this is served by the local-writer plugin (JSON file).
//  In production it's the Cloudflare Pages Function + D1.
//  Same contract, zero config difference.
// ============================================================

async function api(path, options) {
  const res = await fetch(path, {
    headers: { Accept: "application/json" },
    ...options,
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    /* non-JSON response */
  }
  if (!res.ok) {
    const err = new Error((data && data.error) || `Request failed (${res.status})`);
    err.status = res.status;
    throw err;
  }
  return data;
}

export async function fetchPieces() {
  const data = await api("/api/pieces");
  return Array.isArray(data.pieces) ? data.pieces : [];
}

export async function publishPiece(piece) {
  const data = await api("/api/pieces", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(piece),
  });
  return data.piece || null;
}

export function isApiAvailableError(err) {
  return Boolean(err) && (err.status === 404 || err.status === 500 || err.name === "TypeError");
}