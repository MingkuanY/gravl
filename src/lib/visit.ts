import { Visit, PrismaClient } from "@prisma/client";
import trips from "../assets/MyTrips.json";

const prisma = new PrismaClient();

export async function getPlacesByUserAndType(
  user_id: string | undefined,
  type: string
) {
  if (!user_id) {
    return [];
  }

  const visits = await prisma.visit.findMany({
    where: {
      trip: {
        userId: user_id,
      },
      place: {
        map_type: type,
      },
    },
    include: {
      place: true,
    },
    orderBy: {
      order: "asc",
    },
  });

  return visits.map((visit) => visit.place);
}

// Convert and add places from MyTravels.json

type VisitInput = {
  place_id: string;
  date: string;
  label: string;
  order: number;
};

type VisitWithoutId = Omit<Visit, "id">;

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
