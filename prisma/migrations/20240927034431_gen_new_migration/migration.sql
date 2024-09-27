/*
  Warnings:

  - You are about to drop the column `placeFipsCode` on the `Visit` table. All the data in the column will be lost.
  - Added the required column `placeId` to the `Visit` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_placeFipsCode_fkey";

-- AlterTable
ALTER TABLE "Visit" DROP COLUMN "placeFipsCode",
ADD COLUMN     "placeId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("place_id") ON DELETE RESTRICT ON UPDATE CASCADE;
