import { projectConfig } from "@/config";
import mongoose from "mongoose";
import { ServerApiVersion } from "mongodb";

export async function connectToDb() {
  return mongoose.connect(projectConfig.DATABASE_URL || "", {
    serverApi: ServerApiVersion.v1
  })
}



