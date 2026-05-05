import eslintPluginAstro from "eslint-plugin-astro";
import tsParser from "@typescript-eslint/parser";

export default [
  ...eslintPluginAstro.configs.recommended,
  {
    ignores: ["dist/", "node_modules/", ".astro/", "scripts/"],
  },
  // TypeScript parser for .ts/.tsx files — no extra TS rules, just enables parsing
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
    },
  },
  {
    // Apply the BASE_URL concatenation ban to all source file types
    files: ["**/*.ts", "**/*.tsx", "**/*.astro"],
    // Catch BASE_URL raw string concatenation — use buildUrl() from @/lib/utils/url instead.
    // Raw concatenation omits trailing-slash normalization and produces broken paths
    // under the /specorator-ecosystem GitHub Pages base (e.g. /specorator-ecosystemfoo).
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          // Catches: import.meta.env.BASE_URL + <anything>  (dot notation)
          // Anchored to MetaProperty so foo.env.BASE_URL doesn't trigger.
          selector:
            "BinaryExpression[operator='+'] MemberExpression[property.name='BASE_URL'][object.property.name='env'][object.object.type='MetaProperty']",
          message:
            "Use buildUrl() from '@/lib/utils/url' instead of concatenating import.meta.env.BASE_URL directly. Raw concatenation breaks the GitHub Pages base path.",
        },
        {
          // Catches: import.meta.env['BASE_URL'] + <anything>  (computed notation)
          // Same broken-concatenation behavior, just bypasses dot-notation selector.
          selector:
            "BinaryExpression[operator='+'] MemberExpression[computed=true][property.value='BASE_URL'][object.property.name='env'][object.object.type='MetaProperty']",
          message:
            "Use buildUrl() from '@/lib/utils/url' instead of concatenating import.meta.env['BASE_URL'] directly. Raw concatenation breaks the GitHub Pages base path.",
        },
      ],
    },
  },
];
