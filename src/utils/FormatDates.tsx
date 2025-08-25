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
