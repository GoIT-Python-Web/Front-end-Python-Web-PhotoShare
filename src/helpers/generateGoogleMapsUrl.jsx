import { IoLocationOutline } from "react-icons/io5";

export default function GoogleMapsLink({ location }) {
  return (
    <a
      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        location
      )}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <IoLocationOutline style={{ marginRight: 4 }} />
      {location}
    </a>
  );
}
