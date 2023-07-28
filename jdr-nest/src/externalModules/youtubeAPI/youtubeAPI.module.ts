import { Module } from "@nestjs/common";
import { YoutubeAPIService } from "./youtubeAPI.service";

@Module({
  providers: [YoutubeAPIService],
  exports: [YoutubeAPIService]
})
export class YoutubeAPIModule {}
