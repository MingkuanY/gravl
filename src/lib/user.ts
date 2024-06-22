"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
 * Gets the User with the given email in the database, including their trips and visits
 *
 * @param email to look up the User in the database
 * @returns the User with that email along with their trips and visits
 */
export async function getUserWithTripsAndVisits(email: string | undefined) {
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
