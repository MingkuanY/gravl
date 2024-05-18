import prisma from "@/lib/prisma";

export async function getPlaces(id: string | undefined) {
  const places = await prisma.place.findMany({
    where: {
      userId: id,
    },
  });
  return places;
}

export async function filterPlacesByType(id: string, type: string) {
  const filteredPlaces = await prisma.place.findMany({
    where: {
      userId: id,
      map_type: type,
    },
  });
  return filteredPlaces;
}
