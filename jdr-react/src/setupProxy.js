/* eslint-disable no-undef,@typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require("http-proxy-middleware");

const { REACT_APP_API_URL, REACT_APP_API_BASE_PATH } = process.env;

module.exports = function (app) {
  if (process.env.NODE_ENV === "development") {
    app.use(
      createProxyMiddleware(REACT_APP_API_BASE_PATH, {
        target: REACT_APP_API_URL,
        changeOrigin: true
      })
    );
  }
};
