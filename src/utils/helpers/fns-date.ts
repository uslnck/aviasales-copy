import { format, addMinutes, getHours, getMinutes, set } from "date-fns";

export const formattedDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const formattedTime = format(
    new Date().setHours(hours, remainingMinutes),
    "Hч mм"
  );

  return formattedTime;
};

export const formattedStartEnd = (
  dateForth: string,
  durationForth: number
): string => {
  const date = new Date(dateForth);
  const hours = getHours(date);
  const minutes = getMinutes(date);
  const formattedStart = format(new Date().setHours(hours, minutes), "HH:mm");

  const baseTime = set(new Date(), { hours, minutes });
  const newTime = addMinutes(baseTime, durationForth);
  const formattedEnd = format(newTime, "HH:mm");

  return `${formattedStart} – ${formattedEnd}`;
};
