"use server";

import { Place, PrismaClient } from "@prisma/client";
import counties from "../assets/Counties.json";

const prisma = new PrismaClient();

function idToLabel(id: string) {
  id = id.split("St__").join("St. ");
  id = id.split("__NP").join("");
  id = id.split("__").join(", ");
  id = id.split("_").join(" ");
  return id;
}

type PlaceWithoutId = Omit<Place, "id">;

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

// export async function getPlaceByID(id: string) {
//   console.log("Start at ", new Date());
//   const place = await prisma.place.findUnique({
//     where: {
//       place_id: id,
//     },
//   });
//   console.log("End at ", new Date());
//   return place;
// }

export async function loadPlaces() {
  const places = await prisma.place.findMany({
    select: {
      place_id: true,
      label: true,
    },
  });
  return places;
}

export type PlaceInput = {
  place_id: string;
  label: string;
};
