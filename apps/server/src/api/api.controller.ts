import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
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

  @Get('pictures')
  async getPictures(@Query('take') take: string, @Query('skip') skip?: string) {
    const [takeParsed, skipParsed] = [take, skip].map((par) => {
      const value = par ? parseInt(par) : 0;
      return isNaN(value) ? 0 : value;
    });

    const pictures = await this.picturesService.getPictures({
      url: this.PICTURE_URL_BASE,
      take: takeParsed,
      skip: skipParsed,
    });

    return pictures;
  }

  @Get('pictures/count')
  async countPictures() {
    const count = await this.picturesService.countPictures();
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
    console.log(file.path);
    return resp;
  }

  @Get('picture/:id')
  async getPicture(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    console.log(id);
    const { picture, file } = await this.picturesService.getPicture({ id });

    console.log(picture);

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
