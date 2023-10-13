import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@server/database/prisma.service';

@Injectable()
export class PicturesRepository {
  constructor(private prisma: PrismaService) {}

  async createPicture(params: { data: Prisma.PictureCreateInput }) {
    const { data } = params;
    return this.prisma.picture.create({ data });
  }

  async createPictures(params: { data: Prisma.PictureCreateInput[] }) {
    const { data } = params;
    const createPromises = data.map(
      async (d) => await this.createPicture({ data: d }),
    );
    return await Promise.all(createPromises);
  }

  async getPictures() {
    return this.prisma.picture.findMany();
  }

  async updatePicture(params: {
    where: Prisma.PictureWhereUniqueInput;
    data: Prisma.PictureUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.picture.update({ where, data });
  }

  async deletePicture(params: { where: Prisma.PictureWhereUniqueInput }) {
    const { where } = params;
    return this.prisma.picture.delete({ where });
  }

  async getPicture(params: { where: Prisma.PictureWhereUniqueInput }) {
    const { where } = params;
    return this.prisma.picture.findUnique({ where });
  }
}