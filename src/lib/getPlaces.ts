import { Visit, PrismaClient } from "@prisma/client";
import trips from "../assets/MyTravels.json";

const prisma = new PrismaClient();

export async function getVisitsByTrip(id: string | undefined) {
  const visits = await prisma.visit.findMany({
    where: {
      userId: id,
    },
  });
  return places;
}

export async function filterVisitsByType(id: string, type: string) {
  const filteredPlaces = await prisma.place.findMany({
    where: {
      userId: id,
      map_type: type,
    },
  });
  return filteredPlaces;
}

// convert and add places from MyTravels.json

type VisitInput = {
  place_id: string;
  date: string;
  label: string;
  order: number;
};

type VisitWithoutId = Omit<Visit, "id">;

export async function addTripToUser(
  id: string,
  type: string,
  visits: VisitInput[]
) {
  const formattedVisits: VisitWithoutId[] = visits.map((visit) => ({
    place_id: visit.place_id,
    date: new Date(visit.date),
    label: visit.label,
    map_type: type,
    userId: id,
    order: visit.order,
  }));

  const addedVisits = await prisma.visit.createMany({
    data: formattedVisits,
  });

  return addedVisits;
}

// mytrips.forEach(trip => {
//   addTripToUser("clx8jlyqh000couavwktxpxr2", trip);
// })
