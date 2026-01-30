import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import jsxA11y from "eslint-plugin-jsx-a11y";

export default tseslint.config(
  // Global ignore patterns
  { ignores: ["dist"] },

  // Base configurations
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // React and Accessibility custom configuration
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "jsx-a11y": jsxA11y,
    },
    rules: {
      // React hooks recommended rules
      ...reactHooks.configs.recommended.rules,

      // Fast Refresh rules for Vite
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // WCAG accessibility rules from jsx-a11y plugin
      ...jsxA11y.configs.recommended.rules,

      // Example of a custom accessibility override
      "jsx-a11y/anchor-is-valid": "warn",
    },
  },
);
