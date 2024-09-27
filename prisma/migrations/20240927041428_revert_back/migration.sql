-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_placeFipsCode_fkey";

-- AlterTable
ALTER TABLE "Visit" ALTER COLUMN "placeFipsCode" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("place_id") ON DELETE RESTRICT ON UPDATE CASCADE;
