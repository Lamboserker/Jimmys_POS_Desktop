module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended", // Accessibility Plugin hinzugefügt
    "plugin:prettier/recommended", // Prettier Plugin hinzugefügt für Codeformatierung
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "jsx-a11y", "prettier"],
  rules: {
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "jsx-a11y/no-autofocus": "warn", // Warnung für Autofocus zur besseren Barrierefreiheit
    "prettier/prettier": "warn", // Prettier-Regel zur Sicherstellung der Codeformatierung
  },
};
