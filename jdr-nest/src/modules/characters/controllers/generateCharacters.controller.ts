import { Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OpenAIService } from "@backend/externalModules";
import { CHARACTER_CONTEXT, CHARACTER_GENERATION } from "@backend/modules/characters/prompt";

@ApiTags("characters")
@Controller("characters/generate")
export class GenerateCharactersController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post()
  async generate() {
    const result = await this.openAIService.generateResponse([
      { role: "system", content: CHARACTER_CONTEXT.join("") },
      { role: "user", content: CHARACTER_GENERATION.join("") }
    ]);
    const { characters } = JSON.parse(result.data.choices[0].message.content);
    return characters;
  }
}
