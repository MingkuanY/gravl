// get rid of any datatype for "data" and "place" when integrating with database

export const loadMap = (
  data: any,
  type: string,
  pause: number,
  colors: string[],
  updateCount?: Function
) => {
  let timeCounter = 0;
  let timeouts: NodeJS.Timeout[] = [];
  let stepCounter = 0;
  let previousYear = -1;

  data[type].forEach((place: any) => {
    const year = new Date(place.visitDate).getFullYear();
    if (year !== previousYear) {
      stepCounter++;
      previousYear = year;
    }

    // colors[0] will always hold a livedIn color even if none was passed into the color.js function
    const color =
      place.label && place.label === "Lived in"
        ? colors[0]
        : colors[stepCounter];

    const timeoutId = setTimeout(() => {
      const element = document.getElementById(place.id);
      if (element) {
        element.style.fill = color;
        (type !== "states" || (type === "states" && place.id !== "DC")) &&
          updateCount &&
          updateCount(); // make sure DC doesn't get counted as a state
      }
    }, 800 + pause * timeCounter++);
    timeouts.push(timeoutId);
  });

  return () => {
    timeouts.forEach((timeoutId) => clearTimeout(timeoutId));
  };
};

export const loadMapWithChildren = (
  data: any,
  type: string,
  pause: number,
  colors: string[],
  updateCount?: Function
) => {
  let timeCounter = 0;
  let timeouts: NodeJS.Timeout[] = [];
  let stepCounter = 0;
  let previousYear = -1;

  data[type].forEach((place: any) => {
    const year = new Date(place.visitDate).getFullYear();
    if (year !== previousYear) {
      stepCounter++;
      previousYear = year;
    }

    const color =
      place.label && place.label === "Lived in"
        ? colors[0]
        : colors[stepCounter];

    const timeoutId = setTimeout(() => {
      const element = document.getElementById(place.id);
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
  updateCount?: Function;
  total?: number;
  reload?: boolean;
};
