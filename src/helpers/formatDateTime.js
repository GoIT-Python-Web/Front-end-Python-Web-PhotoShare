export default function formatDateTime(isoString, option = "datetime") {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedDate = `${day}.${month}.${year}`;
  const formattedTime = `${hours}:${minutes}`;

  switch (option) {
    case "date":
      return formattedDate;
    case "time":
      return formattedTime;
    case "datetime":
    default:
      return `${formattedDate} ${formattedTime}`;
  }
}
