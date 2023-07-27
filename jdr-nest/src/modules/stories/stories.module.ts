import { Module } from "@nestjs/common";
import { OpenAIModule } from "@backend/externalModules";
import { GenerateStoriesController } from "./controllers";

@Module({
  imports: [OpenAIModule],
  controllers: [GenerateStoriesController]
})
export class StoriesModule {}
