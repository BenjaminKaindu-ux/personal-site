import { useEffect, useMemo, useState } from "react";

/**
 * Tiny hash router — no dependencies, works perfectly on any static
 * host (Cloudflare Pages included) with zero rewrite rules.
 * Routes look like:  #/essays/my-essay-slug  |  #/contact?subject=Hi
 */
export function useRoute() {
  const [hash, setHash] = useState(() => window.location.hash || "#/");

  useEffect(() => {
    const onChange = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);

  return useMemo(() => parse(hash), [hash]);
}

function parse(hash) {
  let h = hash.replace(/^#/, "") || "/";
  let query = {};
  if (h.includes("?")) {
    const [path, qs] = h.split("?");
    h = path;
    for (const part of qs.split("&")) {
      const [k, v] = part.split("=");
      query[decodeURIComponent(k)] = decodeURIComponent(v || "");
    }
  }
  const parts = h.split("/").filter(Boolean);
  return {
    path: h,
    parts,
    view: (parts[0] || "home").toLowerCase(), // home | essays | ideas | notes | projects | about | contact | studio
    slug: parts[1] || "",
    query,
    go(url) {
      window.location.hash = url.startsWith("#") ? url : `#${url.startsWith("/") ? "" : "/"}${url}`;
    },
  };
}

export function navigate(url) {
  window.location.hash = url.startsWith("#") ? url : `#${url.startsWith("/") ? "" : "/"}${url}`;
  if ("scrollTo" in window) window.scrollTo({ top: 0 });
}