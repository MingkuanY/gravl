/*
  Warnings:

  - Made the column `placeFipsCode` on table `Visit` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Visit" ALTER COLUMN "placeFipsCode" SET NOT NULL;
