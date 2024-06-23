import { getPlaceByID } from "@/lib/place";
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

export const handleMapClick = async (
  event: React.MouseEvent<SVGSVGElement, MouseEvent>
) => {
  const color = "#319fff";
  const defaultDark = "#012241";
  const target = event.target as SVGPathElement;
  const placeID = target.id;
  const place = await getPlaceByID(placeID);
  if (place) {
    const element = document.getElementById(placeID);
    console.log("Visited ", placeID);
    element!.style.fill = color;
  }
};

export type MapProps = {
  data?: Place[];
  updateCount?: Function;
  total?: number;
  reload?: boolean;
  pause?: number;
  animate: boolean;
  setVisits?: Function;
  onPlaceClick?: Function;
};
