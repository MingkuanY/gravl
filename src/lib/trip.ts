import { PrismaClient, Visit } from "@prisma/client";
import { TripInput } from "./visit";

const prisma = new PrismaClient();

export type Trip = {
  id: number;
  name: string;
  description: string;
  visits: Visit[];
};

export function getTripDates(trip: Trip) {
  const dates = trip.visits.map((visit) => new Date(visit.date));
  const startDate = new Date(Math.min(...dates.map((date) => date.getTime())))
    .toISOString()
    .split("T")[0];
  const endDate = new Date(Math.max(...dates.map((date) => date.getTime())))
    .toISOString()
    .split("T")[0];
  return { startDate, endDate };
}

export function tripsThisYear(trips: Trip[]) {
  const currentYear = new Date().getFullYear();
  let tripCount = 0;

  trips.forEach((trip) => {
    const { startDate, endDate } = getTripDates(trip);
    if (
      new Date(startDate).getFullYear() === currentYear ||
      new Date(endDate).getFullYear() === currentYear ||
      (new Date(startDate).getFullYear() < currentYear &&
        new Date(endDate).getFullYear() > currentYear)
    ) {
      tripCount++;
    }
  });

  return tripCount;
}

export type TripWithVisits = Trip & { visits: Visit[] };

// trips.forEach((trip) => {
//   addTripToUser("clxo3r3600000t76epyeb8ksw", trip);
// });

type TripWithDates = TripWithVisits & { startDate: string; endDate: string };

export async function loadTripsRecentFirst(userID: string) {
  const trips: TripWithVisits[] = await prisma.trip.findMany({
    where: { userId: userID },
    include: { visits: true },
  });

  const tripsWithDates: TripWithDates[] = trips.map((trip) => ({
    ...trip,
    ...getTripDates(trip),
  }));

  tripsWithDates.sort((a, b) => {
    return b.startDate!.localeCompare(a.startDate!);
  });

  return tripsWithDates;
}
