/*
  Warnings:

  - Made the column `placeFipsCode` on table `Visit` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_placeId_fkey";

-- AlterTable
ALTER TABLE "Visit" ALTER COLUMN "placeFipsCode" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_placeFipsCode_fkey" FOREIGN KEY ("placeFipsCode") REFERENCES "Place"("fips_code") ON DELETE RESTRICT ON UPDATE CASCADE;
