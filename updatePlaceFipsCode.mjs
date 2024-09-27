import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function updateVisitPlaceFipsCode() {
  await prisma.$executeRaw`
    UPDATE "Visit"
    SET "placeFipsCode" = "Place"."fips_code"
    FROM "Place"
    WHERE "Visit"."placeId" = "Place"."place_id";
  `
  console.log("Updated placeFipsCode in Visit table")
}

updateVisitPlaceFipsCode()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })