"use client";

import { PlaceInput, UserWithTrips } from "@/utils/types";
import styles from "../../../styles/gravlwrapped.module.scss";
import WrappedLoader from "../../../components/maps/WrappedLoader";
import { findStartAndEndDates, sortTrips } from "@/utils/date";

export default function GravlWrapped({
  user,
  places,
}: {
  user: UserWithTrips;
  places: PlaceInput[];
}) {
  const year = new Date().getFullYear();

  // Sets to track all previously visited counties and states
  const allVisitedCounties = new Set<string>();
  const allVisitedStates = new Set<string>();

  // Sets to track new counties and states visited this year
  const newVisitedCounties = new Set<string>();
  const newVisitedStates = new Set<string>();

  // Helper function to extract state FIPS code
  const getStateFips = (placeFipsCode: string) => placeFipsCode.slice(0, 2);

  // Loop through all trips
  sortTrips(user.trips, true).forEach((trip) => {
    const { startDate, endDate } = findStartAndEndDates(trip.visits);
    const tripStartYear = new Date(startDate).getFullYear();
    const tripEndYear = new Date(endDate).getFullYear();

    trip.visits.forEach((visit) => {
      const placeFipsCode = visit.placeFipsCode;
      const stateFips = getStateFips(placeFipsCode);

      // County logic
      if (tripStartYear < year || tripEndYear < year) {
        // For previous years, add to the allVisitedCounties set
        allVisitedCounties.add(placeFipsCode);
      } else if (!allVisitedCounties.has(placeFipsCode)) {
        // For current year, add to newVisitedCounties if not in allVisitedCounties
        newVisitedCounties.add(placeFipsCode);
      }

      // State logic
      if (tripStartYear < year || tripEndYear < year) {
        // For previous years, add to the allVisitedStates set
        allVisitedStates.add(stateFips);
      } else if (!allVisitedStates.has(stateFips) && stateFips != "11") {
        // For current year, add to newVisitedStates if not in allVisitedStates
        newVisitedStates.add(stateFips);
      }
    });
  });

  // Get current year's trips
  const currentYearTrips = user.trips.filter((trip) => {
    const { startDate, endDate } = findStartAndEndDates(trip.visits);
    const startYear = new Date(startDate).getFullYear();
    const endYear = new Date(endDate).getFullYear();

    return startYear === year || endYear === year;
  });

  // New counties and states visited this year
  const newCounties = newVisitedCounties.size;
  const newStates = newVisitedStates.size;

  return (
    <div className={styles.viewport}>
      <h1>{year}</h1>
      <p className={styles.stat}>{newCounties} new counties</p>
      <p className={styles.stat}>{newStates} new states</p>
      <WrappedLoader
        trips={sortTrips(currentYearTrips, true)}
        places={places}
      />
      <p className={styles.link}>gravl.org/wrapped</p>
    </div>
  );
}
