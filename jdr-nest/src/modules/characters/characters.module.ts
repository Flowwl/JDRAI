import { Module } from "@nestjs/common";
import { OpenAIModule } from "@backend/externalModules";
import { GenerateCharactersController } from "./controllers";
import { CharactersPrompt } from "./characters.prompt";

@Module({
  imports: [OpenAIModule],
  controllers: [GenerateCharactersController],
  providers: [CharactersPrompt]
})
export class CharactersModule {}
