import { Module } from '@nestjs/common';
import { PrismaModule } from '@server/database/prisma.module';
import { PicturesRepository } from './pictures.repository';
import { PicturesService } from './pictures.service';

@Module({
  imports: [PrismaModule],
  providers: [PicturesRepository, PicturesService],
  exports: [PicturesService],
})
export class PicturesModule {}
