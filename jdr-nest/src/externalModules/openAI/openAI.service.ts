import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

@Injectable()
export class OpenAIService {
  private openAIApi: OpenAIApi;
  model = "gpt-3.5-turbo";

  constructor(private configService: ConfigService) {
    const openAIKey = configService.get<string>("OPEN_AI_KEY");
    const configuration = new Configuration({
      apiKey: openAIKey
    });

    this.openAIApi = new OpenAIApi(configuration);
  }

  async generateResponse(messages: ChatCompletionRequestMessage[]) {
    return this.openAIApi.createChatCompletion({
      model: this.model,
      messages: messages
    });
  }
}
