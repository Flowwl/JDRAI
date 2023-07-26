import cors from "cors";
import { projectConfig } from "../config";

const corsOptions: cors.CorsOptions = {
  origin: [projectConfig.APP_URL || ""],
  credentials: true
};

const corsMiddleware = {
  cors: cors(corsOptions)
};

export {
  corsMiddleware
};
