import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PicturesModule } from './modules/pictures/pictures.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [PicturesModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
