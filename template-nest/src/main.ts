import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { DatabaseService } from "./database/database.service";
import { ValidationPipe } from "@nestjs/common";
import { setupSwagger } from "@backend/swagger";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn"]
  });
  const config = app.get(ConfigService);
  const database = app.get(DatabaseService);

  setupSwagger(app);
  
  app.use(cookieParser())
  app.enableCors();
  app.setGlobalPrefix(config.get("API_PREFIX"));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  await database.migrateUp();
  await app.listen(config.get("PORT"));
  console.log("Listening at", await app.getUrl());
}

bootstrap();
