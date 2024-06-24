import { VisitInput } from "@/lib/visit";
import { Place } from "@prisma/client";

export const loadMap = (
  data: Place[],
  pause: number | undefined,
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
        element.style.fill = color;
        place.place_id !== "DC" && updateCount && updateCount(); // make sure DC doesn't get counted as a state
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

    if (placeIDs.has(placeID)) {
      const element = document.getElementById(placeID);
      const visitExists = visits.some(
        (visit) => visit.place_id === placeID && visit.date == currentDate
      );
      if (visitExists) {
        // Remove the visit if it exists
        element!.style.fill = defaultColor;
        const updatedVisits = visits.filter(
          (visit) => !(visit.place_id === placeID && visit.date === currentDate)
        );
        setVisits(updatedVisits);
      } else {
        // Add the visit if it does not exist
        element!.style.fill = fillColor;
        const newVisit = {
          place_id: placeID,
          date: currentDate,
          order: visits.filter((visit) => visit.date === currentDate).length,
        };
        setVisits([...visits, newVisit]);
      }
    }
  };
};

export type MapProps = {
  data?: Place[];
  updateCount?: Function;
  total?: number;
  reload?: boolean;
  pause?: number;
  animate: boolean;
  placeIDs?: Set<string>;
  visits: VisitInput[];
  setVisits: Function;
  currentDate: string;
};
