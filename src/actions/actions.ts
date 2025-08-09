"use server";

import { PrismaClient } from "@prisma/client";
import { TripInput } from "@/utils/types";
import { revalidatePath } from "next/cache";

const prisma = new PrismaClient();

function idToLabel(id: string) {
  id = id.split("St__").join("St. ");
  id = id.split("__NP").join("");
  id = id.split("__").join(", ");
  id = id.split("_").join(" ");
  return id;
}

/**
 * Add Places to the postgres db from list of Place IDs. OBSOLETE AFTER ADOPTING FIPS CODES.
 *
 * @param type the type of Place (i.e. counties, states, etc)
 * @param places array of string Place IDs
 * @returns new Places
 */
export async function addPlaces(type: string, places: string[]) {
  const formattedPlaces: any[] = places.map((place_id) => ({
    place_id: place_id,
    map_type: type,
    label: idToLabel(place_id),
  }));

  const newPlaces = await prisma.place.createMany({
    data: formattedPlaces,
  });
  return newPlaces;
}

// addPlaces("counties", counties);

/**
 * Loads all Places in the Place table from the db.
 *
 * @returns list of all Places
 */
export async function loadPlaces() {
  const places = await prisma.place.findMany({
    select: {
      fips_code: true,
      label: true,
      map_type: true,
    },
  });
  return places;
}

/**
 * Gets the User with the given email in the database
 *
 * @param email to look up the User in the database
 * @returns the User with that email
 */
export async function getUser(email: string | undefined) {
  if (!email) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return user;
}

/**
 * Finds username by userID.
 *
 * @param userId
 * @returns
 */
export async function getUserById(userId: string | null) {
  if (!userId) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user;
}

/**
 * Gets the User with the given email in the database, including their trips
 *
 * @param email to look up the User in the database
 * @returns the User with that email along with their trips
 */
export async function getUserWithData(email: string | undefined) {
  if (!email) {
    return null;
  }
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
    include: {
      trips: {
        include: {
          visits: true,
        },
      },
    },
  });

  return user;
}

export async function getUserByUsername(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      trips: {
        include: {
          visits: true,
        },
      },
    },
  });
  return user;
}

/**
 * Updates the User's object with new username, location, and bio.
 *
 * @param email to look up the User in the database
 * @param username to replace the current username (if valid)
 * @param location to replace the current location
 * @param bio to replace the current bio
 * @returns
 */
export async function updateUser(
  email: string,
  username: string,
  location: string,
  bio: string
) {
  if (!email) {
    return null;
  }
  const user = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      username: username,
      location: location,
      bio: bio,
    },
  });
  revalidatePath(`/${username}`);
  return user;
}

/**
 * Checks whether the given username is unique or not.
 *
 * @param input potential username from the user's onboarding
 * @returns true if it's a unique username, false otherwise
 */
export async function uniqueUsername(input: string) {
  const user = await prisma.user.findFirst({
    where: { username: input },
  });
  return user === null;
}

/**
 * Gets all Places filtered by User and map type.
 *
 * @param user_id the user ID
 * @param type the type of Place to get
 * @returns list of Places (can be duplicates if multiple Visits) based on the User's Visits
 */
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

/**
 * Adds the given Trip and its associated Visits to the given User.
 *
 * @param user_id the user ID
 * @param trip the Trip with Visits
 * @returns the added Trip
 */
export async function addTripToUser(user_id: string, trip: TripInput) {
  const newTrip = await prisma.trip.create({
    data: {
      name: trip.trip_name,
      description: trip.description,
      userId: user_id,
      visits: {
        create: trip.visits.map((visit) => ({
          placeFipsCode: visit.fips_code,
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

/**
 * Delete the given trip, which will correspondingly delete all associated visits.
 *
 * @param trip_id the trip to delete
 * @returns the deleted trip
 */
export async function deleteTrip(trip_id: number) {
  const deletedTrip = await prisma.trip.delete({
    where: { id: trip_id },
  });

  return deletedTrip;
}

/**
 * Updates a trip upon the User editing it.
 *
 * @param trip_id the trip to be updated
 * @param trip the edited trip to update it with
 * @returns the updated trip
 */
export async function updateTrip(trip_id: number, trip: TripInput) {
  const updatedTrip = await prisma.trip.update({
    where: {
      id: trip_id,
    },
    data: {
      name: trip.trip_name,
      description: trip.description,
      visits: {
        deleteMany: {},
        create: trip.visits.map((visit) => ({
          placeFipsCode: visit.fips_code,
          date: new Date(visit.date),
          order: visit.order,
        })),
      },
    },
    include: {
      visits: true,
    },
  });

  return updatedTrip;
}
