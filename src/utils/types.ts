import { Notification, Place, Trip, User, Visit } from "@prisma/client";

// Place

export type PlaceInput = {
  place_id: string;
  label: string;
  map_type: string;
};

export type PlaceWithoutId = Omit<Place, "id">;

// User

export type UserWithTrips = User & {
  trips: TripWithVisits[];
};

export type UserWithData = User & {
  notifications: Notification[];
  friends: User[];
};

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

// Map

export type MapProps = {
  data?: VisitInput[];
  updateCount?: Function;
  total?: number;
  reload?: boolean;
  pause?: number;
  animate: boolean;
  places: PlaceInput[];
  visits?: VisitInput[];
  setVisits?: Function;
  currentDate?: string;
  toggleHighways: boolean;
};
