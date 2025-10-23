import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    // ignore generated and third-party folders (replacement for .eslintignore)
    ignores: [
      "node_modules/**",
      ".next/**",
      "playwright-report/**",
      "test-results/**",
      "public/**",
      "coverage/**",
      "dist/**",
    ],
  },
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:testing-library/react",
    "plugin:jest-dom/recommended"
  ),
  // relax rules for test and e2e files to reduce noise from tests
  {
    files: ["**/*.test.*", "tests/**", "e2e/**"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "react/display-name": "off",
      "testing-library/prefer-screen-queries": "off",
      "testing-library/no-node-access": "off",
      "testing-library/no-container": "off",
      "@typescript-eslint/no-require-imports": "off",
      // allow unused vars in tests (prefix with _ to silence if desired)
      "@typescript-eslint/no-unused-vars": ["warn", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }]
    },
  },
];

export default eslintConfig;
