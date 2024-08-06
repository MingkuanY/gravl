import { TripWithIdAndVisits, TripWithVisits } from "./types";

export const monthAbbreviations = [
  "Jan",
  "Feb",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const shortMonthAbbreviations = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const fullMonthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const dayOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

/**
 * Formats date from YYYY-MM-DD to long abbreviation format.
 *
 * @param dateString date in YYYY-MM-DD format
 * @returns date in "June 21" (aka long abbreviation) format for timeline
 */
export const formatDate = (dateString: string) => {
  const dateObj = new Date(dateString.replace(/-/g, "/"));

  const month = monthAbbreviations[dateObj.getMonth()];
  const day = dateObj.getDate();

  const formattedDate = `${month} ${day}`;
  return formattedDate;
};

/**
 * Returns duration given the start date and end date, where it abstracts away month if same month, and adds year if different year.
 *
 * @param date1 in YYYY-MM-DD format
 * @param date2 in YYYY-MM-DD format
 * @returns duration in "May 29 - June 4" format
 */
export const formatDates = (date1: string, date2: string) => {
  const sameYear =
    new Date(date1).getFullYear() === new Date(date2).getFullYear();
  const sameMonth =
    new Date(date1).getMonth() === new Date(date2).getMonth() && sameYear;

  const startDate = formatDate(date1);
  const endDate = formatDate(date2);

  if (startDate === endDate) {
    return startDate;
  }

  const day2 = new Date(date2).getDate() + 1;
  const year2 = new Date(date2).getFullYear();

  return `${startDate} - ${sameMonth ? day2 : endDate}${
    !sameYear ? ", " + year2 : ""
  }`;
};

/**
 * Formats a date into "Jun 21, 2024" format.
 *
 * @param dateString a date in YYYY-MM-DD format
 * @returns string in "Jun 21, 2024" (aka short abbreviation) format
 */
export const formatMDYDate = (dateString: string, fullMonth?: boolean) => {
  const dateObj = new Date(dateString.replace(/-/g, "/"));

  const year = dateObj.getFullYear();
  const month = fullMonth
    ? fullMonthNames[dateObj.getMonth()]
    : shortMonthAbbreviations[dateObj.getMonth()];
  const day = dateObj.getDate();

  const formattedDate = `${month} ${day}, ${year}`;
  return formattedDate;
};

/**
 * Adds days to a given date.
 *
 * @param input date in YYYY-MM-DD format to add days to
 * @param days to add to the input date
 * @returns new date in YYYY-MM-DD format
 */
export const addDays = (input: string, days: number) => {
  const date = new Date(input);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
};

export function tripsThisYear(trips: TripWithIdAndVisits[]) {
  const currentYear = new Date().getFullYear();
  let tripCount = 0;

  trips.forEach((trip) => {
    const { startDate, endDate } = findStartAndEndDates(trip.visits);
    if (
      new Date(startDate).getFullYear() === currentYear ||
      new Date(endDate).getFullYear() === currentYear ||
      (new Date(startDate).getFullYear() < currentYear &&
        new Date(endDate).getFullYear() > currentYear)
    ) {
      tripCount++;
    }
  });

  return tripCount;
}

/**
 * Sorts the given trips in chronological or reverse chronological order by trip. Visits within each trip remain in same order.
 *
 * @param trips the trips to sort
 * @param chronological whether to sort in chronological or reverse chronological by trip (for the timeline)
 * @returns sorted trips
 */
export const sortTrips = (trips: TripWithVisits[], chronological?: boolean) => {
  const tripsWithStartDate = trips.map((trip) => ({
    ...trip,
    startDate: findStartAndEndDates(trip.visits).startDate,
  }));

  tripsWithStartDate.sort((a, b) => {
    if (chronological) {
      return a.startDate!.localeCompare(b.startDate!);
    } else {
      return b.startDate!.localeCompare(a.startDate!);
    }
  });
  return tripsWithStartDate;
};

/**
 * Finds the date range of the given visits.
 *
 * @param visits the visits of the trip
 * @returns the date of the earliest visit and the date of the latest visit, in "YYYY-MM-DD" format
 */
export const findStartAndEndDates = (visits: { date: Date }[]) => {
  const dates = visits.map((visit) => new Date(visit.date).getTime());
  const startDate = new Date(Math.min(...dates));
  const endDate = new Date(Math.max(...dates));

  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  return { startDate: formatDate(startDate), endDate: formatDate(endDate) };
};

export const formatNotificationTime = (date: Date) => {
  const now = new Date();

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const inputDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  );

  const diffTime = today.getTime() - inputDate.getTime();
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
};
