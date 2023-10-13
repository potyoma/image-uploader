import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
  StreamableFile,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UpdateCommentDto } from '@server/models/update-comment.dto';
import { PicturesService } from '@server/modules/pictures/pictures.service';
import { Request, Response } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Controller('api')
export class ApiController {
  constructor(private readonly picturesService: PicturesService) {}

  private getUrl(request: Request) {
    return `${request.protocol}://${request.get('Host')}/api`;
  }

  @Post('picture')
  @UseInterceptors(FileInterceptor('picture', { dest: './storage' }))
  async uploadPicture(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const resp = await this.picturesService.createPicture({
      name: file.originalname,
      alt: file.originalname,
      path: file.path,
      mimeType: file.mimetype,
      url: this.getUrl(req),
    });
    return resp;
  }

  @Post('pictures')
  @UseInterceptors(FilesInterceptor('pictures', 10, { dest: './storage' }))
  async uploadPictures(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Req() req: Request,
  ) {
    const resp = await this.picturesService.createPictures({
      pictures: files.map(({ originalname, path, mimetype }) => ({
        name: originalname,
        alt: originalname,
        path,
        mimeType: mimetype,
      })),
      url: this.getUrl(req),
    });
    return resp;
  }

  @Get('pictures')
  async getPictures(@Req() req: Request) {
    return await this.picturesService.getPictures({ url: this.getUrl(req) });
  }

  @Get('picture/:id')
  async getPicture(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const picture = await this.picturesService.getPicture({ id });

    if (!picture) {
      res.status(404).send();
      return;
    }

    const file = createReadStream(join(process.cwd(), picture.path));

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
    @Req() req: Request,
  ) {
    const { comment } = update;
    const updated = await this.picturesService.updateComment({
      id,
      comment,
      url: this.getUrl(req),
    });
    return updated;
  }
}
