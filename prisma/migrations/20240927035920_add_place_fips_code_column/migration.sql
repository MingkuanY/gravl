/*
  Warnings:

  - You are about to drop the column `placeFipsCodes` on the `Visit` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Visit" DROP COLUMN "placeFipsCodes",
ADD COLUMN     "placeFipsCode" TEXT;
