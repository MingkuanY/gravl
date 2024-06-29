import { sortVisits } from "@/components/log/ManualFillCard";
import { VisitInput } from "@/utils/types";
import { Place } from "@prisma/client";
import { otherColor } from "./color";

export const loadMap = (
  data: VisitInput[],
  pause: number | undefined,
  colors: string[],
  updateCount?: Function
) => {
  let timeCounter = 0;
  let timeouts: NodeJS.Timeout[] = [];

  data.forEach((visit: VisitInput) => {
    const color = colors[0];

    const timeoutId = setTimeout(() => {
      const element = document.getElementById(visit.place_id);
      if (element) {
        element.style.fill = color;
        visit.place_id !== "DC" && updateCount && updateCount(); // make sure DC doesn't get counted as a state
      }
    }, 800 + pause! * timeCounter++);
    timeouts.push(timeoutId);
  });

  return () => {
    timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
  };
};

export const loadMapWithChildren = (
  data: Place[],
  pause: number,
  colors: string[],
  updateCount?: Function
) => {
  let timeCounter = 0;
  let timeouts: NodeJS.Timeout[] = [];

  data.forEach((place: Place) => {
    const color = colors[0];

    const timeoutId = setTimeout(() => {
      const element = document.getElementById(place.place_id);
      if (element) {
        const childPaths = element.querySelectorAll("path");
        childPaths.forEach((path) => {
          path.style.fill = color;
        });
        updateCount && updateCount();
      }
    }, 800 + pause * timeCounter++);
    timeouts.push(timeoutId);
  });

  return () => {
    timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
  };
};

export const handleMapClick = (
  placeIDs: Set<string>,
  visits: VisitInput[],
  setVisits: Function,
  currentDate: string
) => {
  return (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    const fillColor = "#319fff";
    const defaultColor = "#012241";
    const target = event.target as SVGPathElement;
    const placeID = target.id;

    if (placeIDs && placeIDs.has(placeID)) {
      const element = document.getElementById(placeID);
      const visitExists = visits.some(
        (visit) => visit.place_id === placeID && visit.date == currentDate
      );
      if (visitExists) {
        // Remove the visit if it exists
        const updatedVisits = visits.filter(
          (visit) => !(visit.place_id === placeID && visit.date === currentDate)
        );
        setVisits(updatedVisits);
        const stillExists = updatedVisits.findIndex(
          (v) => v.place_id === placeID
        );
        element!.style.fill = stillExists === -1 ? defaultColor : otherColor;
      } else {
        // Add the visit if it does not exist
        element!.style.fill = fillColor;
        const newVisit = {
          place_id: placeID,
          date: currentDate,
          order: visits.filter((visit) => visit.date === currentDate).length,
        };
        setVisits(sortVisits([...visits, newVisit]));
      }
    }
  };
};

/**
 * Colors the places on the map visited on the current date with todayColor and colors places visited on other days with otherColor only if the place is not already visited on the current date.
 *
 * @param visits the visits for this trip
 * @param currentDate the current date the user is on
 * @param todayColor the color to fill places visited on the current date with
 * @param otherColor the color to fill places visited on other dates with (if not already colored for today)
 */
export function refreshMap(
  visits: VisitInput[],
  currentDate: string,
  todayColor: string,
  otherColor: string
) {
  const todayPlaces = new Set<string>();

  visits.forEach((visit) => {
    const element = document.getElementById(visit.place_id);
    if (element) {
      if (visit.date === currentDate) {
        element.style.fill = todayColor;
        todayPlaces.add(visit.place_id);
      } else if (!todayPlaces.has(visit.place_id)) {
        element.style.fill = otherColor;
      }
    }
  });
}
