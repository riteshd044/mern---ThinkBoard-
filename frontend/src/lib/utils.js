export const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
