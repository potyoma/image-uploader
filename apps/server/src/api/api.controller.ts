import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CountResult } from '@server/models/count.result';
import { UpdateCommentDto } from '@server/models/update-comment.dto';
import { PicturesService } from '@server/modules/pictures/pictures.service';
import { Response } from 'express';

@Controller('api')
export class ApiController {
  constructor(private readonly picturesService: PicturesService) {}

  private PICTURE_URL_BASE = '/api';

  private checkExists(res: Response, entity?: any) {
    if (!entity) return res.status(404).send();
    return res.status(200).send(entity);
  }

  @Get('pictures/count')
  async countPictures() {
    const count = await this.picturesService.countPictures();
    await new Promise((res) => setTimeout(res, 3000));
    return { count } as CountResult;
  }

  @Post('picture')
  @UseInterceptors(FileInterceptor('picture', { dest: './storage' }))
  async uploadPicture(@UploadedFile() file: Express.Multer.File) {
    const resp = await this.picturesService.createPicture({
      name: file.originalname,
      alt: file.originalname,
      path: file.path,
      mimeType: file.mimetype,
      url: this.PICTURE_URL_BASE,
    });
    return resp;
  }

  @Get('pictures')
  async getPictures() {
    return await this.picturesService.getPictures({
      url: this.PICTURE_URL_BASE,
    });
  }

  @Get('picture/:id')
  async getPicture(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { picture, file } = await this.picturesService.getPicture({ id });

    if (!picture) {
      res.status(404).send();
      return;
    }

    res.set({
      'Content-Type': picture.mimeType,
      'Content-Disposition': `attachment; filename=${picture.name}`,
    });

    return new StreamableFile(file);
  }

  @Patch('picture/:id/comment')
  async updateComment(
    @Param('id') id: string,
    @Body() update: UpdateCommentDto,
    @Res() res: Response,
  ) {
    const { comment } = update;
    const updated = await this.picturesService.updateComment({
      id,
      comment,
      url: this.PICTURE_URL_BASE,
    });
    return this.checkExists(res, updated);
  }

  @Delete('picture/:id')
  async deletePicture(@Param('id') id: string, @Res() res: Response) {
    const pic = this.picturesService.deletePicture({ id });
    return this.checkExists(res, pic);
  }
}
