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
