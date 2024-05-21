// get rid of any datatype for "data" and "place" when integrating with database

import { Place } from "@prisma/client";

export const loadMap = (
  data: Place[],
  pause: number | undefined,
  colors: string[],
  updateCount?: Function
) => {
  let timeCounter = 0;
  let timeouts: NodeJS.Timeout[] = [];
  let stepCounter = 0;
  let previousYear = -1;

  data.forEach((place: Place) => {
    const year = new Date(place.date).getFullYear();
    if (year !== previousYear) {
      stepCounter++;
      previousYear = year;
    }

    // colors[0] will always hold a livedIn color even if none was passed into the color.js function
    const color = colors[1];

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
  let stepCounter = 0;
  let previousYear = -1;

  data.forEach((place: Place) => {
    const year = new Date(place.date).getFullYear();
    if (year !== previousYear) {
      stepCounter++;
      previousYear = year;
    }

    const color = colors[1];

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

export type MapProps = {
  data: Place[];
  updateCount?: Function;
  total?: number;
  reload?: boolean;
  pause?: number;
};
