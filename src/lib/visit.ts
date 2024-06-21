import { Visit, PrismaClient } from "@prisma/client";
import trips from "../assets/MyTrips.json";

const prisma = new PrismaClient();

export async function getPlacesByUserAndType(
  user_id: string | undefined,
  type: string
) {
  const result = await prisma.$queryRaw`
    SELECT place.place_id
    FROM trip
    JOIN visit ON trip.id=visit.tripId
    JOIN place ON visit.place_id=place.id
    WHERE trip.userId=${user_id} AND place.map_type=${type}`;
  console.log("Result: ", result);
}

// convert and add places from MyTravels.json

type VisitInput = {
  place_id: string;
  date: string;
  label: string;
  order: number;
};

// type VisitWithoutId = Omit<Visit, "id">;

// export async function addTripToUser(
//   id: string,
//   type: string,
//   visits: VisitInput[]
// ) {
//   const formattedVisits: VisitWithoutId[] = visits.map((visit) => ({
//     place_id: visit.place_id,
//     date: new Date(visit.date),
//     label: visit.label,
//     map_type: type,
//     userId: id,
//     order: visit.order,
//   }));

//   const addedVisits = await prisma.visit.createMany({
//     data: formattedVisits,
//   });

//   return addedVisits;
// }

// mytrips.forEach(trip => {
//   addTripToUser("clx8jlyqh000couavwktxpxr2", trip);
// })
