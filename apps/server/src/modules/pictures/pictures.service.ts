import { Injectable } from '@nestjs/common';
import { PicturesRepository } from './pictures.repository';
import { Picture } from '@prisma/client';
import { PictureInfo } from '@server/models/picture.info';
import * as moment from 'moment';
import { join } from 'path';
import { ReadStream, createReadStream } from 'fs';
import { unlink } from 'fs/promises';

@Injectable()
export class PicturesService {
  constructor(private repository: PicturesRepository) {}

  private getFullPath(path?: string) {
    if (!path) return path;
    return join(process.cwd(), path);
  }

  private async tryAccessFile(
    operation: (path: string) => ReadStream | void | Promise<ReadStream | void>,
    path?: string,
  ) {
    try {
      const fullPath = this.getFullPath(path);

      if (!fullPath) throw 'Access file error';

      const res = operation(fullPath);

      if (res instanceof Promise) return await res;

      return res;
    } catch (err) {
      console.log(err);
    }
  }

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

  async getPictures(params: { url: string; take: number; skip?: number }) {
    const { url, take, skip } = params;
    console.log(take, skip);
    const pictures = await this.repository.getPictures({ take, skip });
    return pictures.map((p) => this.toModel(p, url));
  }

  async getPicture(params: { id: Picture['id'] }) {
    const { id } = params;
    const picture = await this.repository.getPicture({ where: { id } });
    const file = (await this.tryAccessFile(
      createReadStream,
      picture?.path,
    )) as ReadStream;

    return { picture, file };
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

  async deletePicture(params: { id: string }) {
    const { id } = params;
    const deleted = await this.repository.deletePicture({ where: { id } });

    await this.tryAccessFile(unlink, deleted.path);

    return deleted;
  }

  async countPictures() {
    return await this.repository.countPictures();
  }
}
