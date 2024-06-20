"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export async function validateUsername(input: string) {
  return await prisma.user.findFirst({
    where: { username: input },
  });
}
