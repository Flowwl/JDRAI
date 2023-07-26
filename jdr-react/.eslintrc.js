// eslint-disable-next-line no-undef
const config = {
  parser: "@typescript-eslint/parser",
  // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020,
    // Allows for the parsing of modern ECMAScript features
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      version: "detect"
      // Tells eslint-plugin-react to automatically detect the version of React to use
    }
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    "plugin:prettier/recommended"
    // Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  rules: {
    quotes: ["error", "double"],
    semi: ["error", "always"],
    "max-len": "off",
    indent: ["error", 2, { SwitchCase: 1 }],
    "@typescript-eslint/comma-dangle": ["error", "never"],
    "no-empty-function": ["warn", { allow: ["arrowFunctions"] }],
    "comma-dangle": ["error", "never"],
    "no-console": "warn",
    "multiline-ternary": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/prefer-ts-expect-error": "warn",
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/ban-ts-comment": "off"
  }
};
// eslint-disable-next-line no-undef
module.exports = config;
