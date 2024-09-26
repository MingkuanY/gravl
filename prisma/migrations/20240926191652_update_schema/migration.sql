/*
  Warnings:

  - Made the column `fips_code` on table `Place` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "Place_place_id_idx";

-- AlterTable
ALTER TABLE "Place" ALTER COLUMN "fips_code" SET NOT NULL;

-- CreateIndex
CREATE INDEX "Place_fips_code_idx" ON "Place"("fips_code");
