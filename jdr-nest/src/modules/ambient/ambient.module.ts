import { Module } from "@nestjs/common";
import { YoutubeAPIModule } from "@backend/externalModules";
import { AmbientService } from "./ambient.service";
import { GetMusicUrlController } from "./controllers";

@Module({
  imports: [YoutubeAPIModule],
  providers: [AmbientService],
  controllers: [GetMusicUrlController]
})
export class AmbientModule {}
