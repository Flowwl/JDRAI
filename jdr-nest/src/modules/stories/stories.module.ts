import { Module } from "@nestjs/common";
import { OpenAIModule } from "@backend/externalModules";
import { GenerateStoriesController } from "./controllers";
import { StoriesPrompt } from "./stories.prompt";

@Module({
  imports: [OpenAIModule],
  controllers: [GenerateStoriesController],
  providers: [StoriesPrompt]
})
export class StoriesModule {}
