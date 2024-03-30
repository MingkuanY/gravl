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

export const formatDate = (dateString) => {
  const dateObj = new Date(dateString);

  const month = monthAbbreviations[dateObj.getMonth()];
  const day = dateObj.getDate() + 1;

  const formattedDate = `${month} ${day}`;
  return formattedDate;
};
export const formatDates = (date1, date2) => {
  const sameMonth = new Date(date1).getMonth() === new Date(date2).getMonth();

  const startDate = formatDate(date1);
  const endDate = formatDate(date2);

  const day2 = new Date(date2).getDate() + 1;

  return `${startDate} - ${sameMonth ? day2 : endDate}`;
};
