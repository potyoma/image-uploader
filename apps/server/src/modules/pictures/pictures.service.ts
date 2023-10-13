import { Injectable } from '@nestjs/common';
import { PicturesRepository } from './pictures.repository';
import { Picture } from '@prisma/client';
import { PictureInfo } from '@server/models/picture.info';
import * as moment from 'moment';

@Injectable()
export class PicturesService {
  constructor(private repository: PicturesRepository) {}

  private toModel(picture: Picture, url: string) {
    return {
      ...picture,
      date: moment(picture.date).format('DD.MM.YYYY'),
      src: `${url}/picture/${picture.id}`,
    } as PictureInfo;
  }

  async createPicture(params: {
    name: Picture['name'];
    alt: Picture['alt'];
    path: Picture['path'];
    mimeType: Picture['mimeType'];
    url: string;
  }) {
    const { name, alt, path, mimeType, url } = params;
    const picture = await this.repository.createPicture({
      data: { name, alt, path, mimeType },
    });
    return this.toModel(picture, url);
  }

  async createPictures(params: {
    pictures: {
      name: Picture['name'];
      alt: Picture['alt'];
      path: Picture['path'];
      mimeType: Picture['mimeType'];
    }[];
    url: string;
  }) {
    const { pictures: data, url } = params;
    const pictures = await this.repository.createPictures({ data });
    return pictures.map((p) => this.toModel(p, url));
  }

  async getPictures(params: { url: string }) {
    const { url } = params;
    const pictures = await this.repository.getPictures();
    return pictures.map((p) => this.toModel(p, url));
  }

  async getPicture(params: { id: Picture['id'] }) {
    const { id } = params;
    return await this.repository.getPicture({ where: { id } });
  }

  async updateComment(params: {
    id: Picture['id'];
    comment: Picture['comment'];
    url: string;
  }) {
    const { id, comment, url } = params;
    const picture = await this.repository.updatePicture({
      where: { id },
      data: { comment },
    });
    return this.toModel(picture, url);
  }
}
