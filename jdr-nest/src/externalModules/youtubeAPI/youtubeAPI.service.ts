import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { google } from "googleapis";
import * as youtubesearchapi from "youtube-search-api";

const OAuth2 = google.auth.OAuth2;
const YOUTUBE_URL = "https://www.youtube.com";

@Injectable()
export class YoutubeAPIService {
  constructor(private configService: ConfigService) {}

  async getVideoUrl(keyword: string) {
    const result = await youtubesearchapi.GetListByKeyword(keyword, false, 1);
    if (!result || result.items.length === 0) {
      return;
    }

    return `${YOUTUBE_URL}/watch?v=${result.items[0].id}`;
  }
}
