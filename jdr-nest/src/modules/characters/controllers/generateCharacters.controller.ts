import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { OpenAIService } from "@backend/externalModules";
import { Prop } from "@nestjs/mongoose";

class GenerateBody {
  @Prop()
  prompt: string;
}

@ApiTags("characters")
@Controller("characters/generate")
export class GenerateCharactersController {
  constructor(private readonly openAIService: OpenAIService) {}

  @Post("generate")
  generate(@Body() { prompt }: GenerateBody) {
    return this.openAIService.generateResponse(prompt);
  }
}
