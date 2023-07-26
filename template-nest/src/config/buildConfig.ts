export type NodeEnvs = "test" | "development" | "prod";
export type EnvironmentVariables = {
  NODE_ENV: NodeEnvs;
  // DATABASE
  DATABASE_URL: string;
  MIGRATE_MIGRATIONS_PATH: string;
  MIGRATE_TEMPLATE_PATH: string;
  // SERVER
  PORT: number;
  API_PREFIX: string;
  JWT_API_KEY: string;
  EXPIRATION_TOKEN: number;
};

export function buildConfig(): EnvironmentVariables {
  return {
    // GLOBAL
    NODE_ENV: process.env.NODE_ENV as NodeEnvs,
    // DATABASE
    DATABASE_URL: process.env.DATABSE_URL,
    MIGRATE_MIGRATIONS_PATH: process.env.MIGRATE_MIGRATIONS_PATH,
    MIGRATE_TEMPLATE_PATH: process.env.MIGRATE_TEMPLATE_PATH,
    // SERVER
    PORT: parseInt(process.env.PORT),
    API_PREFIX: process.env.API_PREFIX,
    JWT_API_KEY: process.env.JWT_API_KEY,
    EXPIRATION_TOKEN: parseInt(process.env.EXPIRATION_TOKEN)
  };
}
