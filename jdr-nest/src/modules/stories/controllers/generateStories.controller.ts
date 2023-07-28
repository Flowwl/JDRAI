import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { StoriesPrompt } from "../stories.prompt";
import { Character } from "@backend/modules/characters/types";
import { Prop } from "@nestjs/mongoose";

class generateStoryBody {
  @Prop()
  selectedCharacter: Character;
}

@ApiTags("stories")
@Controller("stories/generate")
export class GenerateStoriesController {
  constructor(private readonly storyPrompt: StoriesPrompt) {}

  @Post()
  async generate(@Body() body: generateStoryBody) {
    return this.storyPrompt.generateStoryWithSelectedCharacter(body.selectedCharacter);
  }
}
