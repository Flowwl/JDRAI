import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { DatabaseService } from "./database.service";
import { ConfigModule, EnvironmentVariables } from "../config";
import { mongoTestServer } from "../tests/database";
import { NodeEnvs } from "../config/buildConfig";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri:
          (configService.get<EnvironmentVariables>("NODE_ENV") as unknown as NodeEnvs) === "test"
            ? mongoTestServer.getUri()
            : configService.get<EnvironmentVariables>("DATABASE_URL")
      }),
      inject: [ConfigService]
    })
  ],
  providers: [DatabaseService],
  exports: [DatabaseService]
})
export class DatabaseModule {}
