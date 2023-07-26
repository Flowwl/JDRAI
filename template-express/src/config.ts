import dotenv from "dotenv";

dotenv.config();

const v = process.env;

const projectConfig = {
  // GLOBAL
  NODE_ENV: v.NODE_ENV || "development" || "",
  // API
  PORT: v.PORT || "",
  API_URL: `${v.API_URL}:${v.PORT}` || "",
  APP_URL: v.APP_URL || "",
  // APP / CLIENT
  APP_NAME: v.APP_NAME || "",
  APP_MAIN_ADMIN_EMAIL: v.APP_MAIN_ADMIN_EMAIL || "",
  APP_MAIN_ADMIN_PASSWORD: v.APP_MAIN_ADMIN_PASSWORD || "",
  CI_MODE: v.CI_MODE || "",
  // DB
  DATABASE_URL: v.DATABASE_URL || "",
  DATABASE_NAME: v.DATABASE_NAME || "",
  // JWT
  JWT_API_KEY: v.JWT_API_KEY || "",
  EXPIRATION_TOKEN: v.EXPIRATION_TOKEN || "",

  SPACE_ENDPOINT: v.SPACE_ENDPOINT || "",
  SPACE_KEY: v.SPACE_KEY || "",
  SPACE_SECRET: v.SPACE_SECRET || "",
  SPACE_BUCKET_NAME: v.SPACE_BUCKET_NAME || ""
};

export {
  projectConfig
};
