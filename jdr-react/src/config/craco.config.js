/* eslint-disable no-undef,@typescript-eslint/no-var-requires */
const CracoAlias = require("craco-alias");
module.exports = {
  reactScriptsVersion: "react-scripts" /* (default value) */,
  style: {
    postcss: {
      loaderOptions: {
        postcssOptions: {
          config: "./src/config/postcss.config.js"
        }
      }
    }
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: ".",
        tsConfigPath: "tsconfig.paths.json"
      }
    }
  ]
};
