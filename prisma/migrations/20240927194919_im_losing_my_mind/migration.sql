-- DropForeignKey
ALTER TABLE "Visit" DROP CONSTRAINT "Visit_placeId_fkey";

-- AddForeignKey
ALTER TABLE "Visit" ADD CONSTRAINT "Visit_placeFipsCode_fkey" FOREIGN KEY ("placeFipsCode") REFERENCES "Place"("fips_code") ON DELETE RESTRICT ON UPDATE CASCADE;
