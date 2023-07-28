import { Injectable } from "@nestjs/common";
import { OpenAIService, YoutubeAPIService } from "@backend/externalModules";

@Injectable()
export class AmbientService {
  constructor(private youtubeApiService: YoutubeAPIService, private openAiService: OpenAIService) {}

  async getMusicUrl(keyword: string) {
    return this.youtubeApiService.getVideoUrl(keyword);
  }

  async getBackgroundImg(keyword: string) {
    return this.openAiService.generateImage(keyword);
  }
}
