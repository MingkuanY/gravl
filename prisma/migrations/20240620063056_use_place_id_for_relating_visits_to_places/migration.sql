/*
  Warnings:

  - A unique constraint covering the columns `[place_id]` on the table `Place` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_placeId_fkey";

-- AlterTable
ALTER TABLE "Visit" ALTER COLUMN "placeId" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Place_place_id_key" ON "Place"("place_id");

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("place_id") ON DELETE RESTRICT ON UPDATE CASCADE;
