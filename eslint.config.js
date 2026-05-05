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
        {
          // Catches: const x = import.meta.env.BASE_URL  (bare alias assignment)
          // Aliasing the raw value into a variable is the canonical bypass for the
          // BinaryExpression selectors above — once aliased, `x + "/foo"` looks like
          // any other string concat. Force callers to either use buildUrl() directly
          // or apply trailing-slash normalization inline (e.g. .replace(/\/$/, "")),
          // which makes this selector inapplicable because init becomes a CallExpression.
          selector:
            "VariableDeclarator[init.type='MemberExpression'][init.property.name='BASE_URL'][init.object.property.name='env'][init.object.object.type='MetaProperty']",
          message:
            "Don't alias import.meta.env.BASE_URL into a variable. Use buildUrl() from '@/lib/utils/url', or normalize inline via import.meta.env.BASE_URL.replace(/\\/$/, '').",
        },
        {
          // Same as above but for computed notation: const x = import.meta.env['BASE_URL']
          selector:
            "VariableDeclarator[init.type='MemberExpression'][init.computed=true][init.property.value='BASE_URL'][init.object.property.name='env'][init.object.object.type='MetaProperty']",
          message:
            "Don't alias import.meta.env['BASE_URL'] into a variable. Use buildUrl() from '@/lib/utils/url', or normalize inline via import.meta.env.BASE_URL.replace(/\\/$/, '').",
        },
        {
          // Catches: base = import.meta.env.BASE_URL  (post-declaration assignment)
          // VariableDeclarator only fires at the declaration site, so a separate
          // assignment after `let base = ""` would otherwise slip through.
          selector:
            "AssignmentExpression[right.type='MemberExpression'][right.property.name='BASE_URL'][right.object.property.name='env'][right.object.object.type='MetaProperty']",
          message:
            "Don't alias import.meta.env.BASE_URL into a variable. Use buildUrl() from '@/lib/utils/url', or normalize inline via import.meta.env.BASE_URL.replace(/\\/$/, '').",
        },
        {
          // Same as above but for computed notation: base = import.meta.env['BASE_URL']
          selector:
            "AssignmentExpression[right.type='MemberExpression'][right.computed=true][right.property.value='BASE_URL'][right.object.property.name='env'][right.object.object.type='MetaProperty']",
          message:
            "Don't alias import.meta.env['BASE_URL'] into a variable. Use buildUrl() from '@/lib/utils/url', or normalize inline via import.meta.env.BASE_URL.replace(/\\/$/, '').",
        },
        {
          // Catches: const { BASE_URL } = import.meta.env  (destructuring alias)
          // Even rarer, but a free bypass once destructured because BASE_URL becomes
          // a plain identifier the BinaryExpression selectors can't trace back to env.
          selector:
            "VariableDeclarator[id.type='ObjectPattern'][init.type='MemberExpression'][init.property.name='env'][init.object.type='MetaProperty'] > ObjectPattern > Property[key.name='BASE_URL']",
          message:
            "Don't destructure BASE_URL from import.meta.env. Use buildUrl() from '@/lib/utils/url'.",
        },
        {
          // Catches: ({ BASE_URL } = import.meta.env)  (destructuring assignment)
          // Same as above, but for assignment after declaration rather than at it.
          selector:
            "AssignmentExpression[left.type='ObjectPattern'][right.type='MemberExpression'][right.property.name='env'][right.object.type='MetaProperty'] > ObjectPattern > Property[key.name='BASE_URL']",
          message:
            "Don't destructure BASE_URL from import.meta.env. Use buildUrl() from '@/lib/utils/url'.",
        },
        {
          // Catches alias RHS wrapped by optional-chain or TS non-null assertion:
          //   const x = import.meta.env?.BASE_URL
          //   const x = import.meta.env.BASE_URL!
          //   x = import.meta.env?.BASE_URL
          //   x = import.meta.env.BASE_URL!
          // Without this, those wrappers change init/right.type from MemberExpression
          // to ChainExpression / TSNonNullExpression and bypass the bare-alias selectors.
          selector:
            ":matches(VariableDeclarator, AssignmentExpression) > :matches(ChainExpression, TSNonNullExpression) > MemberExpression[property.name='BASE_URL'][object.property.name='env'][object.object.type='MetaProperty']",
          message:
            "Don't alias import.meta.env.BASE_URL (incl. optional-chain or non-null assertion) into a variable. Use buildUrl() from '@/lib/utils/url'.",
        },
        {
          // Same as above for computed notation: import.meta.env?.['BASE_URL'] / ['BASE_URL']!
          selector:
            ":matches(VariableDeclarator, AssignmentExpression) > :matches(ChainExpression, TSNonNullExpression) > MemberExpression[computed=true][property.value='BASE_URL'][object.property.name='env'][object.object.type='MetaProperty']",
          message:
            "Don't alias import.meta.env['BASE_URL'] (incl. optional-chain or non-null assertion) into a variable. Use buildUrl() from '@/lib/utils/url'.",
        },
      ],
    },
  },
];
