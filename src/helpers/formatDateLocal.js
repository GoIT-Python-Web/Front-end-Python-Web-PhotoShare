export const formatDateLocal = (date) => {
  const offsetDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000
  );
  return offsetDate.toISOString().split("T")[0];
};
