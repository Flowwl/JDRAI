import { Injectable } from "@nestjs/common";
import { AppPrompt } from "@backend/modules/app.prompt";
import { Character } from "@backend/modules/characters/types";
import { OpenAIService } from "@backend/externalModules";

@Injectable()
export class StoriesPrompt extends AppPrompt {
  constructor(private readonly openAIService: OpenAIService) {
    super();
  }

  async generateStoryWithSelectedCharacter(char: Character) {
    const result = await this.openAIService.generateResponse([
      { role: "system", content: this.getSystemContext() },
      {
        role: "user",
        content: [this.getCharacterStoryAttributes(char), ...this.getStoryGenerationUserContext()].join(" ")
      }
    ]);

    return JSON.parse(result.data.choices[0].message.content);
  }

  private getCharacterStoryAttributes(char: Character) {
    return `Le personnage choisit par le joueur est ${char.firstName} ${char.lastName}, un ${char.class} ${char.race}.`;
  }

  private getStoryGenerationUserContext() {
    return [
      "Génère-moi une histoire avec 3 actions à effectuer par le jouer pour avancer dans l'histoire",
      "Retourne-moi juste le code json sans rien d'autre",
      "Les valeurs seront en français.",
      "Le JSON sera sous la forme `{ description: mon histoire, actions: liste de 3 actions à effectuer pour avancer dans l'histoire }`"
    ].join(" ");
  }
}
