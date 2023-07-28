import { Injectable } from "@nestjs/common";
import { AppPrompt } from "@backend/modules/app.prompt";
import { Character } from "@backend/modules/characters/types";
import { OpenAIService } from "@backend/externalModules";
import { ChatCompletionRequestMessage } from "openai";
import { Story } from "@backend/modules/stories/types";

@Injectable()
export class StoriesPrompt extends AppPrompt {
  constructor(private readonly openAIService: OpenAIService) {
    super();
  }

  async generateStoryWithSelectedCharacter(
    char: Character,
    previousStoryLine?: { choosenAction: string; previousStory }
  ): Promise<Story> {
    const result = await this.openAIService.generateResponse([
      { role: "system", content: this.getSystemContext() },
      {
        role: "user",
        content: [this.getCharacterStoryAttributes(char), ...this.getStoryGenerationUserContext()].join(" ")
      },
      ...this.getNextStoryLine(previousStoryLine)
    ]);

    return JSON.parse(result.data.choices[0].message.content);
  }

  private getNextStoryLine(previousStoryLine?: {
    choosenAction: string;
    previousStory: string;
  }): ChatCompletionRequestMessage[] {
    if (!previousStoryLine) {
      return [];
    }

    return [
      {
        role: "assistant",
        content: previousStoryLine.previousStory
      },
      {
        role: "user",
        content: [
          `Je choisis de ${previousStoryLine.choosenAction}.`,
          "Génère-moi la suite de l'histoire sous la forme `{ summary: résumé de tout se qu'il s'est passé jusqu'à maintenant, description: la suite de histoire, actions: liste de 3 actions en string à effectuer pour avancer dans l'histoire}`"
        ].join(" ")
      }
    ];
  }

  private getCharacterStoryAttributes(char: Character) {
    return `Le personnage choisit par le joueur est ${char.firstName} ${char.lastName}, un ${char.class} ${char.race}.`;
  }

  private getStoryGenerationUserContext() {
    return [
      "Génère-moi une histoire avec 3 actions à effectuer par le jouer pour avancer dans l'histoire",
      "Retourne-moi juste le code json sans rien d'autre",
      "Les valeurs seront en français.",
      "Le JSON sera sous la forme `{ summary: résumé de tout se qu'il s'est passé jusqu'à maintenant, description: mon histoire, actions: liste de 3 actions en string à effectuer pour avancer dans l'histoire}`"
    ].join(" ");
  }
}
