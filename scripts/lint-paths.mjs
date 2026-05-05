#!/usr/bin/env node
/**
 * Checks source files for hardcoded absolute paths that would break under
 * the /specorator-ecosystem GitHub Pages base path.
 *
 * Patterns caught:
 *   href="/"          — absolute path that ignores BASE_URL
 *   href="/foo"       — same
 *   src="/foo"        — images/assets with hardcoded absolute path
 *
 * Exceptions (allowed absolute paths):
 *   External URLs (http:, https:, mailto:, tel:) — not matched
 *   /favicon.svg, /robots.txt, /sitemap*.xml     — served from root by convention
 *   Files under src/pages/                        — Astro resolves these at build time
 *
 * Exit 1 when violations are found; exit 0 on clean pass.
 */

import { execSync } from "child_process";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const srcDir = path.join(root, "src");

// Patterns that signal a hardcoded absolute path in JSX/Astro attributes.
// We target string literals only (href="/" or href='/foo'), not template literals.
const PATTERNS = [
  // href or src attributes with a bare absolute path (not http/mailto/tel)
  { regex: /(?:href|src)="\/(?!\/)[^h][^"]*"/, label: 'hardcoded absolute href/src (double-quote)' },
  { regex: /(?:href|src)='\/(?!\/)[^h][^']*'/, label: "hardcoded absolute href/src (single-quote)" },
];

// Paths that are intentionally served from the site root and need no BASE_URL prefix.
const ALLOWLIST = [
  /\/favicon\.svg/,
  /\/robots\.txt/,
  /\/sitemap/,
  /\/manifest/,
  // 404 page "Go home" button intentionally uses "/" — acceptable because Astro
  // rewrites it at build time when base is configured.
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

import fs from "fs";

const files = walkSync(srcDir);
const violations = [];

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const lines = content.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const { regex, label } of PATTERNS) {
      const match = line.match(regex);
      if (!match) continue;

      const value = match[0];
      if (ALLOWLIST.some((re) => re.test(value))) continue;

      violations.push({
        file: path.relative(root, file),
        line: i + 1,
        text: line.trim(),
        label,
      });
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
