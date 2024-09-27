import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// UPDATE PLACEFIPSCODE FIELD IN VISIT

async function updateVisitPlaceFipsCode() {
  await prisma.$executeRaw`
    UPDATE "Visit"
    SET "placeFipsCode" = "Place"."fips_code"
    FROM "Place"
    WHERE "Visit"."placeId" = "Place"."place_id";
  `
  console.log("Updated placeFipsCode in Visit table")
}

// updateVisitPlaceFipsCode()
//   .catch(e => console.error(e))
//   .finally(async () => {
//     await prisma.$disconnect()
//   })


// DELETE PLACEID FIELD FROM VISIT

async function deletePlaceId() {
  await prisma.visit.updateMany({
    data: {
      placeId: null
    }
  })
}

deletePlaceId();