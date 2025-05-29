export const roundToPreviousHour = (dateTime: string): string => {
  const date = new Date(dateTime);

  // Round down to the previous full hour
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
};
