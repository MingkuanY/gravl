"use server";

import { PrismaClient } from "@prisma/client";
import { PlaceWithoutId, TripInput } from "@/utils/types";

const prisma = new PrismaClient();

function idToLabel(id: string) {
  id = id.split("St__").join("St. ");
  id = id.split("__NP").join("");
  id = id.split("__").join(", ");
  id = id.split("_").join(" ");
  return id;
}

/**
 * Add Places to the postgres db from list of Place IDs.
 *
 * @param type the type of Place (i.e. counties, states, etc)
 * @param places array of string Place IDs
 * @returns new Places
 */
export async function addPlaces(type: string, places: string[]) {
  const formattedPlaces: PlaceWithoutId[] = places.map((place_id) => ({
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
      place_id: true,
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
export async function getUsernameById(userId: string | null) {
  if (!userId) {
    return "";
  }
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  return user?.username;
}

/**
 * Gets the User with the given email in the database, including their trips, friends, and notifications
 *
 * @param email to look up the User in the database
 * @returns the User with that email along with their trips, friends, and notifications
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
      friends: true,
      notifications: true,
    },
  });
  return user;
}

export async function getFriendByUsername(username: string) {
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

  return updatedTrip;
}

/**
 * Sends a friend request, checking that the receiverId is valid and no request is already between them
 *
 * @param senderId the user who is sending the request
 * @param receiverId the user who is receiving the request
 * @returns whether the request has been sent successfully or not
 */
export async function sendFriendRequest(
  senderId: string,
  receiverUsername: string
) {
  console.log("sendFriendRequest called");

  // Check if the receiver exists
  const receiverExists = await prisma.user.findUnique({
    where: { username: receiverUsername },
  });

  if (!receiverExists) {
    return false;
  }

  console.log("receiver exists");

  const receiverId = receiverExists.id;

  // Check for existing friend request
  const existingRequest = await prisma.friendRequest.findFirst({
    where: {
      OR: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    },
  });

  if (existingRequest) {
    return true;
  }

  console.log("no existing friend request");

  // Create friend request
  const request = await prisma.friendRequest.create({
    data: {
      senderId: senderId,
      receiverId: receiverId,
      status: "PENDING",
    },
  });

  console.log("friend request created");

  // Send notification to receiver
  await prisma.notification.create({
    data: {
      userId: receiverId,
      type: "FRIEND_REQUEST",
      userIdInConcern: senderId,
      requestId: request.id,
    },
  });

  console.log("notification created");

  return true;
}

/**
 * Accept a friend request.
 *
 * @param requestId
 */
export async function acceptFriendRequest(requestId: number) {
  // Accept friend request and deletes it
  const request = await prisma.friendRequest.delete({
    where: {
      id: requestId,
    },
  });

  // Delete original notification
  await prisma.notification.deleteMany({
    where: {
      userId: request.receiverId,
      type: "FRIEND_REQUEST",
      requestId: requestId,
    },
  });

  // Add friends/friendOf relationships for both users
  await prisma.user.update({
    where: {
      id: request.senderId,
    },
    data: {
      friends: {
        connect: { id: request.receiverId },
      },
      friendOf: {
        connect: { id: request.receiverId },
      },
    },
  });

  await prisma.user.update({
    where: { id: request.receiverId },
    data: {
      friends: {
        connect: { id: request.senderId },
      },
      friendOf: {
        connect: { id: request.senderId },
      },
    },
  });

  // Create notification for sender
  await prisma.notification.create({
    data: {
      userId: request.senderId,
      type: "FRIEND_REQUEST_ACCEPTED",
      userIdInConcern: request.receiverId,
    },
  });
}

/**
 * Declines a friend request by deleting it.
 *
 * @param requestId
 */
export async function declineFriendRequest(requestId: number) {
  // Deletes the friend request
  await prisma.friendRequest.delete({
    where: { id: requestId },
  });
}
