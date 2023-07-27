import { Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OpenAIService } from "@backend/externalModules";
import { STORY_CONTEXT, STORY_GENERATION } from "@backend/modules/stories/prompt";
import { Story } from "@backend/modules/stories/types";

@ApiTags("stories")
@Controller("stories/generate")
export class GenerateStoriesController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post()
  async generate() {
    const result = await this.openAIService.generateResponse([
      { role: "system", content: STORY_CONTEXT.join("") },
      { role: "user", content: STORY_GENERATION.join("") }
    ]);
    const { description }: { description: Story["description"] } = JSON.parse(result.data.choices[0].message.content);
    return description;
  }
}
