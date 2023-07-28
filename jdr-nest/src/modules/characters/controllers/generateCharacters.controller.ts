import { Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CharactersPrompt } from "../characters.prompt";

@ApiTags("characters")
@Controller("characters/generate")
export class GenerateCharactersController {
  constructor(private readonly charactersPrompt: CharactersPrompt) {}

  @Post()
  async generate() {
    return this.charactersPrompt.generateCharacters(3);
  }
}
