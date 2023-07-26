import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Configuration, OpenAIApi } from "openai";

@Injectable()
export class OpenAIService {
  private openAIApi: OpenAIApi;
  model = "text-davinci-002";

  constructor(private configService: ConfigService) {
    const openAIKey = configService.get<string>("OPEN_AI_KEY");
    const configuration = new Configuration({
      apiKey: openAIKey
    });

    this.openAIApi = new OpenAIApi(configuration);
  }

  async generateResponse(prompt: string) {
    return this.openAIApi.createCompletion({
      model: this.model,
      prompt: prompt
    });
  }
}
