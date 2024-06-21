import { Visit, PrismaClient, Trip } from "@prisma/client";
import trips from "../assets/MyTrips.json";
import welcome from "../assets/Welcome.json";

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
    orderBy: [
      {
        date: "asc",
      },
      {
        order: "asc",
      },
    ],
  });

  return visits.map((visit) => visit.place);
}

// Convert and add places from MyTrips.json

type VisitInput = {
  place_id: string;
  date: string;
  order: number;
};

type TripInput = {
  trip_name: string;
  description: string;
  visits: VisitInput[];
};

export async function addTripToUser(user_id: string, trip: TripInput) {
  const newTrip = await prisma.trip.create({
    data: {
      name: trip.trip_name,
      description: trip.description,
      userId: user_id,
      visits: {
        create: trip.visits.map((visit) => ({
          placeId: visit.place_id,
          date: new Date(visit.date),
          order: visit.order,
        })),
      },
    },
    include: {
      visits: true,
    },
  });

  return newTrip;
}
