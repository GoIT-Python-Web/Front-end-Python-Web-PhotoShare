import { MdAdminPanelSettings, MdOutlineStars } from "react-icons/md";

export default function defineRole(role = "user") {
  return (
    <div>{role === "user" ? <MdOutlineStars /> : <MdAdminPanelSettings />}</div>
  );
}
