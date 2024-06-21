import { Place, PrismaClient } from "@prisma/client";
import counties from "../assets/Counties.json";

const prisma = new PrismaClient();

export async function addPlaces(id: string | undefined, type: string) {
  const visits = await prisma.visit.findMany({
    where: {
      userId: id,
    },
  });
  return visits;
}
