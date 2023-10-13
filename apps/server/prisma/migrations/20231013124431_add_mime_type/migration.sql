/*
  Warnings:

  - Added the required column `mimeType` to the `Picture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Picture" ADD COLUMN     "mimeType" TEXT NOT NULL;
