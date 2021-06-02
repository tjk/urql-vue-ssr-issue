module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:vue/recommended",
  ],
  globals: {
    process: "readonly",
  },
  parserOptions: {
    parser: "babel-eslint",
    // ??? ecmaVersion: 2017,
  },
  ignorePatterns: ["plugins/monaco/libs/*.ts"],
}
