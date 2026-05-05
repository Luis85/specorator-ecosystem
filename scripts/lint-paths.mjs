#!/usr/bin/env node
/**
 * Checks source files for hardcoded absolute paths that would break under
 * the /specorator-ecosystem GitHub Pages base path.
 *
 * Patterns caught:
 *   href="/"            — string attribute with absolute path
 *   href="/foo"         — same
 *   href={"/foo"}       — JSX expression with string literal
 *   href={`/foo/${x}`}  — JSX template literal with absolute path
 *   src="/foo"          — same for src attributes
 *
 * Exceptions (allowed absolute paths):
 *   External URLs (http:, https:, mailto:, tel:) — not matched
 *   /favicon.svg, /robots.txt, /sitemap*.xml, /manifest* — root assets
 *
 * Exit 1 when violations are found; exit 0 on clean pass.
 */

import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "src");

// \/(?!\/) — leading slash, negative lookahead excludes protocol-relative //
const ABS = /\/(?!\/)/;

// All forms an href/src attribute can take in .astro/.tsx files:
//   href="/foo"        — plain string attribute
//   href='/foo'        — single-quote variant
//   href={"/foo"}      — JSX expression with double-quoted string
//   href={'/foo'}      — JSX expression with single-quoted string
//   href={`/foo`}      — JSX template literal (may contain ${…} interpolation)
const PATTERNS = [
  { regex: new RegExp(`(?:href|src)="${ABS.source}[^"]*"`, "g"), label: "string attr (double-quote)" },
  { regex: new RegExp(`(?:href|src)='${ABS.source}[^']*'`, "g"), label: "string attr (single-quote)" },
  { regex: new RegExp(`(?:href|src)=\\{"${ABS.source}[^"]*"\\}`, "g"), label: "JSX expression string (double-quote)" },
  { regex: new RegExp(`(?:href|src)=\\{'${ABS.source}[^']*'\\}`, "g"), label: "JSX expression string (single-quote)" },
  { regex: new RegExp(`(?:href|src)=\\{\`${ABS.source}[^\`]*\`\\}`, "g"), label: "JSX template literal" },
];

// Extract just the path portion from a matched string so allowlist patterns
// can be anchored precisely (e.g. /^\/favicon\.svg$/ won't match /favicon.svg.bak).
function extractPath(matched) {
  const m = matched.match(/["'`](\/[^"'`]*)/);
  return m ? m[1] : null;
}

// Root-served assets that legitimately use absolute paths because they live
// at the domain root regardless of the GitHub Pages base prefix.
// Patterns are anchored (^ and $) to avoid matching unrelated routes.
const ALLOWLIST = [
  /^\/favicon\.svg$/,
  /^\/favicon\.ico$/,
  /^\/robots\.txt$/,
  /^\/sitemap[-\w]*(?:\.xml)?$/,   // /sitemap.xml, /sitemap-index.xml, /sitemap
  /^\/manifest(?:\.json|\.webmanifest)?$/, // /manifest.json, /manifest.webmanifest
];

const EXT_PATTERN = /\.(tsx|ts|astro)$/;
const IGNORED_DIRS = ["dist", "node_modules", ".astro", "scripts"];

function walkSync(dir, results = []) {
  let entries;
  try {
    entries = execSync(`find "${dir}" -type f`, { encoding: "utf8" })
      .split("\n")
      .filter(Boolean);
  } catch {
    return results;
  }
  for (const entry of entries) {
    if (IGNORED_DIRS.some((d) => entry.includes(`/${d}/`))) continue;
    if (EXT_PATTERN.test(entry)) results.push(entry);
  }
  return results;
}

const files = walkSync(srcDir);
const violations = [];

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const { regex, label } of PATTERNS) {
      for (const match of line.matchAll(regex)) {
        const urlPath = extractPath(match[0]);
        if (urlPath && ALLOWLIST.some((re) => re.test(urlPath))) continue;

        violations.push({
          file: path.relative(root, file),
          line: i + 1,
          text: line.trim(),
          label,
        });
      }
    }
  }
}

if (violations.length === 0) {
  console.log("✓ lint-paths: no hardcoded absolute paths found");
  process.exit(0);
}

console.error(`\n✗ lint-paths: ${violations.length} hardcoded absolute path(s) found\n`);
console.error(
  "  Absolute paths break GitHub Pages deployments under the /specorator-ecosystem base.\n" +
    "  Use buildUrl() from '@/lib/utils/url' for internal links, or import.meta.env.BASE_URL\n" +
    "  with trailing-slash normalization for template literals.\n",
);

for (const v of violations) {
  console.error(`  ${v.file}:${v.line}  [${v.label}]`);
  console.error(`    ${v.text}\n`);
}

process.exit(1);
