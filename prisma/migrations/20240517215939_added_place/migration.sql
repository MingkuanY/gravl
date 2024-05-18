/*
  Warnings:

  - You are about to drop the column `homeBase` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `Map` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TravelData` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Map" DROP CONSTRAINT "Map_userId_fkey";

-- DropForeignKey
ALTER TABLE "TravelData" DROP CONSTRAINT "TravelData_mapId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "homeBase",
ADD COLUMN     "location" TEXT;

-- DropTable
DROP TABLE "Map";

-- DropTable
DROP TABLE "TravelData";

-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "place_id" TEXT NOT NULL,
    "map_type" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
