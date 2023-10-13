/*
  Warnings:

  - You are about to alter the column `comment` on the `Picture` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1000)` to `VarChar(100)`.
  - Added the required column `path` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Picture" ADD COLUMN     "path" TEXT NOT NULL,
ALTER COLUMN "comment" SET DATA TYPE VARCHAR(100);
