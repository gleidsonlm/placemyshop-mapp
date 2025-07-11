import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
// import { defineConfig } from "eslint/config"; // defineConfig is not standard and might cause issues if not available

// Using a simple array export as per common flat config examples
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { jsplugin: js }, // Renamed to avoid conflict if 'js' is a reserved keyword in some context for plugins
    rules: js.configs.recommended.rules
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: tseslint.parser, // Specify TypeScript parser
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.json", // Assuming tsconfig.json is in the root
      },
    }
  },
  // Applying typescript-eslint recommended rules
  ...tseslint.configs.recommended.map(config => ({
    ...config,
    files: ["**/*.{ts,mts,cts,tsx}"], // Apply TS rules only to TS files
  })),
  // Applying React plugin recommended rules
  {
    files: ["**/*.{jsx,tsx}"], // Apply React rules only to JSX/TSX files
    plugins: {
      react: pluginReact
    },
    rules: pluginReact.configs.recommended.rules,
    settings: {
      react: {
        version: "detect" // Automatically detect React version
      }
    }
  }
];
