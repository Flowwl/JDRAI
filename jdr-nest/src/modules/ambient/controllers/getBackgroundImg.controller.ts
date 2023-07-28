import { Controller, Get, HttpCode, HttpStatus, Param } from "@nestjs/common";
import { AmbientService } from "@backend/modules/ambient/ambient.service";

export class ImgParams {
  keyword: string;
}

@Controller("ambients/background")
export class GetBackgroundImgController {
  constructor(private ambientService: AmbientService) {}

  @Get("/:keyword")
  @HttpCode(HttpStatus.OK)
  async getBackgroundImg(@Param() params: ImgParams) {
    return this.ambientService.getBackgroundImg(params.keyword);
  }
}
