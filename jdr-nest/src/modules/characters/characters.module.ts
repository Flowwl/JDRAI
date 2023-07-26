import { Module } from "@nestjs/common";
import { OpenAIModule } from "@backend/externalModules";
import { GenerateCharactersController } from "@backend/modules/characters/controllers/generateCharacters.controller";

@Module({
  imports: [OpenAIModule],
  controllers: [GenerateCharactersController]
})
export class CharactersModule {}
