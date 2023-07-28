import { Module } from "@nestjs/common";
import { OpenAIModule, YoutubeAPIModule } from "@backend/externalModules";
import { AmbientService } from "./ambient.service";
import { GetBackgroundImgController, GetMusicUrlController } from "./controllers";

@Module({
  imports: [YoutubeAPIModule, OpenAIModule],
  providers: [AmbientService],
  controllers: [GetMusicUrlController, GetBackgroundImgController]
})
export class AmbientModule {}
