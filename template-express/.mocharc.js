require("module-alias/register")

module.exports = {
  "spec": "src/**/*.spec.ts",
  "require": "ts-node/register",
  "extension": ["ts"],
  "exit": true,
  "package": "./package.json"
}
