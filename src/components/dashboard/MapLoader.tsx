"use client";

import styles from "../../styles/maploader.module.scss";
import Counties, { totalCounties } from "@/components/maps/Counties";
import States, { totalStates } from "@/components/maps/States";
import Countries, { totalCountries } from "@/components/maps/Countries";
import NationalParks, {
  totalNationalparks,
} from "@/components/maps/NationalParks";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "../../styles/circularprogressbar.scss";
import { useEffect, useState } from "react";
import { PlaceInput, TripWithVisits, VisitInput } from "@/utils/types";

export const mapNames = ["counties", "states", "countries", "national parks"];

export default function MapLoader({
  trips,
  places,
}: {
  trips: TripWithVisits[];
  places: PlaceInput[];
}) {
  const [count, setCount] = useState([0, 0, 0, 0]);

  const placesMap = new Map(
    places.map((place) => [place.place_id, place.map_type])
  );

  type SortedVisits = {
    counties: VisitInput[];
    states: VisitInput[];
    countries: VisitInput[];
    nationalparks: VisitInput[];
  };

  const [sortedVisits, setSortedVisits] = useState<SortedVisits>({
    counties: [],
    states: [],
    countries: [],
    nationalparks: [],
  });

  const sortVisitsByType = (trips: TripWithVisits[]) => {
    const newSortedVisits: SortedVisits = {
      counties: [],
      states: [],
      countries: [],
      nationalparks: [],
    };

    const uniqueVisits: { [key: string]: Set<string> } = {
      counties: new Set(),
      states: new Set(),
      countries: new Set(),
      nationalparks: new Set(),
    };

    trips.map((trip) => {
      trip.visits.forEach((visit) => {
        const v = {
          place_id: visit.placeId,
          date: visit.date.toISOString().split("T")[0],
          order: visit.order,
        };

        switch (placesMap.get(v.place_id)) {
          case "counties":
            newSortedVisits.counties.push(v);
            uniqueVisits.counties.add(v.place_id);
            break;
          case "states":
            newSortedVisits.states.push(v);
            uniqueVisits.states.add(v.place_id);
            break;
          case "countries":
            newSortedVisits.countries.push(v);
            uniqueVisits.countries.add(v.place_id);
            break;
          case "nationalparks":
            newSortedVisits.nationalparks.push(v);
            uniqueVisits.nationalparks.add(v.place_id);
            break;
        }
      });
    });

    const actualStates = Array.from(uniqueVisits.states).filter(
      (state) => state !== "DC"
    );

    const counts = [
      uniqueVisits.counties.size,
      actualStates.length,
      uniqueVisits.countries.size,
      uniqueVisits.nationalparks.size,
    ];
    setCount(counts);

    setSortedVisits(newSortedVisits);
  };

  useEffect(() => {
    sortVisitsByType(trips);
  }, [trips]);

  // total counts of each map imported from the map components
  const totalCounts = [
    totalCounties,
    totalStates,
    totalCountries,
    totalNationalparks,
  ];

  const [currentMap, setCurrentMap] = useState(0); //defaults to counties map
  const [reload, setReload] = useState(false);
  const statClicked = (btn: number) => {
    setCurrentMap(btn);
    setReload((reload) => !reload);
  };

  /**
   * If a parameter (reset) is passed in, then set count to reset. Else, increment count by one.
   * @param {number} reset the value to set count to if provided
   */
  const updateCount = (reset: number) => {
    setCount((prevCounts) => {
      const newCounts = [...prevCounts];
      if (reset !== undefined) {
        newCounts[currentMap] = reset;
      } else {
        newCounts[currentMap] += 1;
      }
      return newCounts;
    });
  };

  /**
   * Renders the correct map based on the types index
   * @param {number} index the index in the types array that indicates which map should be rendered
   * @returns the map component to be rendered
   */
  const renderMap = (index: number) => {
    switch (index) {
      case 0:
        return (
          <Counties
            animate={true}
            data={sortedVisits.counties}
            updateCount={updateCount}
            total={count[0]}
            reload={reload}
            pause={20}
            places={places}
          />
        );
      case 1:
        return (
          <States
            animate={true}
            data={sortedVisits.states}
            updateCount={updateCount}
            total={count[1]}
            reload={reload}
            places={places}
          />
        );
      case 2:
        return (
          <Countries
            animate={true}
            data={sortedVisits.countries}
            updateCount={updateCount}
            total={count[2]}
            reload={reload}
            places={places}
          />
        );
      case 3:
        return (
          <NationalParks
            animate={true}
            data={sortedVisits.nationalparks}
            updateCount={updateCount}
            total={count[3]}
            reload={reload}
            places={places}
          />
        );
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.mapContainer} ${
          currentMap === 2 && styles.largeMapContainer
        }`}
      >
        {renderMap(currentMap)}
      </div>

      <div className={styles.stats}>
        {mapNames.map((map, index) => (
          <div
            className={`${styles.progressContainer} ${
              currentMap === index && styles.selected
            }`}
            key={index}
          >
            <CircularProgressbarWithChildren
              value={count[index]}
              maxValue={totalCounts[index]}
            >
              <div className={styles.countContainer}>
                <p className={styles.count}>{count[index]}</p>
                <p className={styles.totalCount}>/{totalCounts[index]}</p>
              </div>
              <p className={styles.type}>{map}</p>
            </CircularProgressbarWithChildren>
            <div
              className={`${styles.progressbarBackground} ${
                currentMap === index && styles.selected
              }`}
              onClick={() => statClicked(index)}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
