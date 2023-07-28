import { Injectable } from "@nestjs/common";
import { YoutubeAPIService } from "@backend/externalModules";

@Injectable()
export class AmbientService {
  constructor(private youtubeApiService: YoutubeAPIService) {}

  async getMusicUrl(keyword: string) {
    return this.youtubeApiService.getVideoUrl(keyword);
  }
}
