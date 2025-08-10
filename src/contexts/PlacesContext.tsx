"use client";

import { createContext, useContext } from "react";
import { PlaceInput } from "../utils/types";

type PlacesContextType = {
  places: PlaceInput[];
};

const PlacesContext = createContext<PlacesContextType | undefined>(undefined);

export function PlacesProvider({
  places,
  children,
}: {
  places: PlaceInput[];
  children: React.ReactNode;
}) {
  return (
    <PlacesContext.Provider value={{ places }}>
      {children}
    </PlacesContext.Provider>
  );
}

export function usePlacesContext() {
  const ctx = useContext(PlacesContext);
  if (!ctx)
    throw new Error("usePlacesContext must be used inside PlacesProvider");
  return ctx.places;
}
