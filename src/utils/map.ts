import { sortVisits } from "@/components/log/ManualFillCard";
import { PlaceInput, VisitInput } from "@/utils/types";
import { otherColor } from "./color";

/*
HOW NATIONAL PARKS AND OTHER CUSTOM INKSCAPE MAPS WORK:

When clicking on it:
User will click on the path elements within each group, so check if the parent of the clicked element is a g tag and, if so, get the id from the parent/g-tag.

When coloring it in:
Selecting the document element with the given id will select the g-tag, so loop over its child elements and color those in.
*/

/**
 * Animates the visits in order on the map and updates the progress bar counter.
 *
 * @param data the list of visits to animate
 * @param pause the amount of time to pause between visits when animating
 * @param colors the list of colors to color the places on the map with
 * @param updateCount a function to update or reset the progress bar
 * @returns the timeouts to cancel them upon component offload
 */
export const loadMap = (
  data: VisitInput[],
  pause: number | undefined,
  colors: string[],
  updateCount?: Function
) => {
  let timeCounter = 0;
  let timeouts: NodeJS.Timeout[] = [];
  const uniqueVisits = new Set<string>();
  data.forEach((visit) => uniqueVisits.add(visit.place_id));

  uniqueVisits.forEach((place_id: string) => {
    const color = colors[0];

    const timeoutId = setTimeout(() => {
      const element = document.getElementById(place_id);
      if (element) {
        const childPaths = element.querySelectorAll("path");
        if (childPaths.length) {
          childPaths.forEach((path) => {
            path.style.fill = color;
          });
        } else {
          element.style.fill = color;
        }
        place_id !== "DC" && updateCount && updateCount(); // make sure DC doesn't get counted as a state
      }
    }, 500 + pause! * timeCounter++);
    timeouts.push(timeoutId);
  });

  return () => {
    timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
  };
};

/**
 * Called when the user clicks on the map when it's in edit mode and updates the visited list accordingly.
 *
 * @param placeIDs all the possible places
 * @param visits the user's visits for this trip
 * @param setVisits sets the user's visits for this trip
 * @param currentDate the date the user is currently editing, used to filter out which visits are today
 * @returns a function called when the user clicks on the map
 */
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
    let placeID = "";

    if (
      target.tagName === "path" &&
      target.parentElement &&
      target.parentElement.tagName === "g"
    ) {
      placeID = target.parentElement.id; // Get the id from the parent g tag
    } else {
      placeID = target.id; // Get the id from the current path tag
    }

    if (placeIDs && placeIDs.has(placeID)) {
      const element = document.getElementById(placeID);
      const visitExists = visits.some(
        (visit) => visit.place_id === placeID && visit.date == currentDate
      );
      const childPaths = element?.querySelectorAll("path");
      if (visitExists) {
        // Remove the visit if it exists
        const updatedVisits = visits.filter(
          (visit) => !(visit.place_id === placeID && visit.date === currentDate)
        );
        setVisits(updatedVisits);
        const stillExists = updatedVisits.findIndex(
          (v) => v.place_id === placeID
        );

        const color = stillExists === -1 ? defaultColor : otherColor;

        if (childPaths?.length) {
          childPaths.forEach(() => {
            childPaths.forEach((path) => {
              path.style.fill = color;
            });
          });
        } else {
          element!.style.fill = color;
        }
      } else {
        // Add the visit if it does not exist
        if (childPaths?.length) {
          childPaths.forEach(() => {
            childPaths.forEach((path) => {
              path.style.fill = fillColor;
            });
          });
        } else {
          element!.style.fill = fillColor;
        }

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
  places: PlaceInput[],
  currentDate: string,
  todayColor: string,
  otherColor: string,
  defaultColor: string
) {
  places.forEach((place) => {
    const element = document.getElementById(place.place_id);
    if (element) {
      const visit = visits.find(
        (v) => v.place_id === place.place_id && v.date === currentDate
      );
      if (visit) {
        // There is a visit for the current place on the current date, so color it todayColor
        const childPaths = element.querySelectorAll("path");
        if (childPaths.length) {
          childPaths.forEach((path) => {
            path.style.fill = todayColor;
          });
        } else {
          element.style.fill = todayColor;
        }
      } else {
        const visit = visits.find((v) => v.place_id === place.place_id);
        if (visit) {
          // There is a visit for the current place but on a different date, so color it otherColor
          const childPaths = element.querySelectorAll("path");
          if (childPaths.length) {
            childPaths.forEach((path) => {
              path.style.fill = otherColor;
            });
          } else {
            element.style.fill = otherColor;
          }
        } else {
          // There is no visit associated with the current place on any date, so color it defaultColor
          element.style.fill = defaultColor;
        }
      }
    }
  });
}

/**
 * Add the given designation before the comma in the label.
 *
 * @param label the label to be modified
 * @param designation the designation to add (i.e. County, State, etc)
 * @returns label with the given designation added, i.e. "Polk County, WI"
 */
export const addDesignationToLabel = (label: string, designation: string) => {
  const parts = label.split(", ");
  return `${parts[0]} ${designation}, ${parts[1]}`;
};
