/*
  Warnings:

  - Added the required column `placeId` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Visit" ADD COLUMN     "placeId" TEXT NOT NULL;
