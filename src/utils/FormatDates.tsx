export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
  });
};

export const formatDateShort = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const isFutureDate = (dateString: Date): boolean => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const inputDate = new Date(dateString);
  inputDate.setHours(0, 0, 0, 0);

  return inputDate.getTime() > currentDate.getTime();
};

export const formatDuration = (durationMs: number) => {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};
