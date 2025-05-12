import { includeIgnoreFile } from "@eslint/compat";
import { fileURLToPath } from "node:url";
import path from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, ".gitignore");

export default [
  {
    files: ["wwwroot/js/**/*.js"],
    ignores: ["wwwroot/js/**/*.min.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "script",
      globals: {
        $: "readonly",
        jQuery: "readonly",
        console: "readonly",
        window: "readonly",
        document: "readonly",
      },
    },
    plugins: {},
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-console": "off",
      eqeqeq: "error",
      "no-undef": "error",
    },
  },
  includeIgnoreFile(gitignorePath),
  {
    ignores: ["wwwroot/js/**/*.min.js"],
  },
];
