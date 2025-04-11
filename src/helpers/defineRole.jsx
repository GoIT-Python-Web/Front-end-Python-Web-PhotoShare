import { MdAdminPanelSettings, MdOutlineStars } from "react-icons/md";

export default function defineRole(role = "user") {
  return (
    <>
      {role === "user" ? (
        <MdOutlineStars style={{ fontSize: "20px", marginTop: "4px" }} />
      ) : (
        <MdAdminPanelSettings />
      )}
    </>
  );
}
