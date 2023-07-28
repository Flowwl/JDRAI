import { Controller, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { AmbientService } from "@backend/modules/ambient/ambient.service";

export class MusicParams {
  keyword: string;
}

@Controller("ambients/music")
export class GetMusicUrlController {
  constructor(private ambientService: AmbientService) {}

  @Get("/:keyword")
  @HttpCode(HttpStatus.OK)
  async getMusicUrl(@Param() params: MusicParams) {
    return this.ambientService.getMusicUrl(params.keyword);
  }
}
