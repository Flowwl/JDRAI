module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module"
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  rules: {
    "new-cap": ["off"],
    "object-curly-spacing": ["error", "always"],
    "indent": ["error", 2, { SwitchCase: 1, MemberExpression: 1, ObjectExpression: 1, }],
    "linebreak-style": ["error", "unix"],
    "no-console": "warn",
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "valid-jsdoc": "off"
  }
};
