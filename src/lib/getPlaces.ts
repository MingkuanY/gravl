import { Place, PrismaClient } from "@prisma/client";
import counties from "../assets/MyTravels.json";

const prisma = new PrismaClient();

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

// convert and add places from MyTravels.json

type PlaceInput = {
  place_id: string;
  date: string;
  label: string;
};

type PlaceWithoutId = Omit<Place, "id">;

export async function addPlacesToUser(
  id: string,
  type: string,
  places: PlaceInput[]
) {
  const formattedPlaces: PlaceWithoutId[] = places.map((place) => ({
    place_id: place.place_id,
    date: new Date(place.date),
    label: place.label,
    map_type: type,
    userId: id,
  }));

  const addedPlaces = await prisma.place.createMany({
    data: formattedPlaces,
  });

  return addedPlaces;
}

// addPlacesToUser("clwb8928k000021imn2y9s6vi", "counties", counties);
