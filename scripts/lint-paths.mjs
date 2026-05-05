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
// gs flags: g = global (find all matches), s = dotAll (. matches \n, not used here
// but \s* inside braces already handles newlines between { and the opening quote).
const PATTERNS = [
  { regex: new RegExp(`(?:href|src)="${ABS.source}[^"]*"`, "gs"), label: "string attr (double-quote)" },
  { regex: new RegExp(`(?:href|src)='${ABS.source}[^']*'`, "gs"), label: "string attr (single-quote)" },
  { regex: new RegExp(`(?:href|src)=\\{\\s*"${ABS.source}[^"]*"\\s*\\}`, "gs"), label: "JSX expression string (double-quote)" },
  { regex: new RegExp(`(?:href|src)=\\{\\s*'${ABS.source}[^']*'\\s*\\}`, "gs"), label: "JSX expression string (single-quote)" },
  { regex: new RegExp(`(?:href|src)=\\{\\s*\`${ABS.source}[^\`]*\`\\s*\\}`, "gs"), label: "JSX template literal" },
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
  /^\/sitemap(?:-index|-\d+)?\.xml$/, // sitemap.xml, sitemap-index.xml, sitemap-0.xml
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
  // Match against the full file content so multiline attributes like
  //   href={
  //     "/broken"
  //   }
  // are caught. Derive line number from the match index after the fact.
  const lineStarts = [0];
  for (let i = 0; i < content.length; i++) {
    if (content[i] === "\n") lineStarts.push(i + 1);
  }
  const lineOf = (index) => {
    let lo = 0, hi = lineStarts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if (lineStarts[mid] <= index) lo = mid; else hi = mid - 1;
    }
    return lo + 1;
  };

  for (const { regex, label } of PATTERNS) {
    regex.lastIndex = 0;
    for (const match of content.matchAll(regex)) {
      const urlPath = extractPath(match[0]);
      if (urlPath && ALLOWLIST.some((re) => re.test(urlPath))) continue;

      const lineNum = lineOf(match.index);
      const lineEnd = content.indexOf("\n", match.index);
      const lineText = content.slice(lineStarts[lineNum - 1], lineEnd === -1 ? undefined : lineEnd);

      violations.push({
        file: path.relative(root, file),
        line: lineNum,
        text: lineText.trim(),
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
