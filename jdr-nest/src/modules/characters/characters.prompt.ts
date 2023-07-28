import { Injectable } from "@nestjs/common";
import { AppPrompt } from "@backend/modules/app.prompt";
import { Character } from "@backend/modules/characters/types";
import { OpenAIService } from "@backend/externalModules";

@Injectable()
export class CharactersPrompt extends AppPrompt {
  constructor(private readonly openAIService: OpenAIService) {
    super();
  }

  async generateCharacters(n: number) {
    const result = await this.openAIService.generateResponse([
      { role: "system", content: this.getSystemContext() },
      { role: "user", content: this.getCharacterGenerationUserContext(n) }
    ]);
    const { characters }: { characters: Character[] } = JSON.parse(result.data.choices[0].message.content);
    return characters;
  }

  private getCharAttributes(): (keyof Character)[] {
    return [
      "firstName",
      "lastName",
      "race",
      "class",
      "level",
      "pv",
      "strength",
      "dexterity",
      "constitution",
      "intelligence",
      "wisdom",
      "charisma",
      "story"
      // "inventory"
    ];
  }

  private getCharacterGenerationUserContext(n: number) {
    return [
      `Genère-moi une liste de ${n} personnages`,
      `Le JSON sera sous la forme \`{ characters: ma liste de character }\` ayant comme attributs 
      ${this.getCharAttributes().join(", ")} `
    ].join();
  }

  characterImageGenerationContext = ["In Medieval fantasy style.", "Only upper body", "With a White background"];
}
