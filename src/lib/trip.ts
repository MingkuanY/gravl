import { PrismaClient, Visit } from "@prisma/client";

const prisma = new PrismaClient();

type Trip = {
  id: number;
  name: string;
  description: string;
  visits: Visit[];
};

function getTripDates(trip: Trip) {
  const dates = trip.visits.map((visit) => new Date(visit.date));
  const startDate = new Date(Math.min(...dates.map((date) => date.getTime())));
  const endDate = new Date(Math.max(...dates.map((date) => date.getTime())));
  return { startDate, endDate };
}

export function tripsThisYear(trips: Trip[]) {
  const currentYear = new Date().getFullYear();
  let tripCount = 0;

  trips.forEach((trip) => {
    const { startDate, endDate } = getTripDates(trip);
    if (
      startDate.getFullYear() === currentYear ||
      endDate.getFullYear() === currentYear ||
      (startDate.getFullYear() < currentYear &&
        endDate.getFullYear() > currentYear)
    ) {
      tripCount++;
    }
  });

  return tripCount;
}

// trips.forEach((trip) => {
//   addTripToUser("clxo3r3600000t76epyeb8ksw", trip);
// });
