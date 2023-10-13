import { Module } from '@nestjs/common';
import { PicturesModule } from '@server/modules/pictures/pictures.module';
import { ApiController } from './api.controller';

@Module({ imports: [PicturesModule], controllers: [ApiController] })
export class ApiModule {}
