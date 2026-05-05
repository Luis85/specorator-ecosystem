/**
 * Builds a site-relative URL that correctly handles Astro's BASE_URL.
 *
 * Astro sets BASE_URL to the configured `base` value (e.g. "/specorator-ecosystem")
 * which has no trailing slash. Naively concatenating BASE_URL + "path" produces
 * broken URLs like "/specorator-ecosystempath". This helper always inserts the
 * separator correctly regardless of whether BASE_URL has a trailing slash or not.
 *
 * Usage:
 *   import { buildUrl } from "@/lib/utils/url";
 *   href={buildUrl("integrations/" + slug)}
 */
export function buildUrl(path: string): string {
  const base = (import.meta.env.BASE_URL ?? "/").replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return `${base}/${normalizedPath}`;
}
