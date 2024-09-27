/*
  Warnings:

  - You are about to drop the column `placeId` on the `Visit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[fips_code]` on the table `Place` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `placeFipsCode` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_placeId_fkey";

-- AlterTable
ALTER TABLE "Visit" DROP COLUMN "placeId",
ADD COLUMN     "placeFipsCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Place_fips_code_key" ON "Place"("fips_code");

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_placeFipsCode_fkey" FOREIGN KEY ("placeFipsCode") REFERENCES "Place"("fips_code") ON DELETE RESTRICT ON UPDATE CASCADE;
