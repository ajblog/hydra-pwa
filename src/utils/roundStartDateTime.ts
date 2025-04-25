export const roundToPreviousHour = (dateTime: string) => {
  const date = new Date(dateTime); // Create a Date object from the string
  const minutes = date.getMinutes();

  if (minutes >= 30) {
    // If minutes are 30 or more, round down to the previous hour
    date.setHours(date.getHours()); // Decrease the hour by 1
    date.setMinutes(0); // Set minutes to 0
  }

  // Return the rounded date in the same format (ISO string)
  return date.toISOString();
};
