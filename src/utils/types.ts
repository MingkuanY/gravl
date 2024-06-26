import { Place, Trip, Visit } from "@prisma/client";

// Place

export type PlaceInput = {
  place_id: string;
  label: string;
};

export type PlaceWithoutId = Omit<Place, "id">;

// Trip

export type TripInput = {
  trip_name: string;
  description: string;
  visits: VisitInput[];
};

export type TripWithIdAndVisits = {
  id: number;
  name: string;
  description: string;
  visits: Visit[];
};

export type TripWithVisits = Trip & { visits: Visit[] };

export type TripWithDates = TripWithVisits & {
  startDate: string;
  endDate: string;
};

// Visit

export type VisitInput = {
  place_id: string;
  date: string;
  order: number;
};
