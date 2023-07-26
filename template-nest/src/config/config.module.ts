import { ConfigModule as Config } from "@nestjs/config";
import { buildConfig } from "./buildConfig";
import { Module } from "@nestjs/common";

@Module({
  imports: [
    Config.forRoot({
      load: [buildConfig],
      envFilePath: ".env",
      isGlobal: true
    })
  ]
})
export class ConfigModule {}
