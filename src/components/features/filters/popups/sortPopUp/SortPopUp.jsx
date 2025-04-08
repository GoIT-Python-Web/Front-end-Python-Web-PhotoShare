import { useRef, useState } from "react";
import css from "./SortPopUp.module.css";
import { PiCheckFatThin } from "react-icons/pi";
import { useClickOutside } from "../../../../../helpers/hooks/useClickOutside.js";

export default function SortPopUp({ buttonRef, onClose, onSortChange }) {
  const [sortBy, setSortBy] = useState("");

  const modalRef = useRef(null);
  useClickOutside(modalRef, buttonRef, onClose);

  const handleSort = (sortOption) => {
    setSortBy(sortOption);
    onSortChange(sortOption);
  };

  return (
    <div className={css.wrapper} ref={modalRef}>
      <p
        onClick={() => handleSort("asc")}
        className={sortBy === "asc" ? css.active : ""}
      >
        {sortBy === "asc" && <PiCheckFatThin className={css.icon} />} А-Я
      </p>
      <p
        onClick={() => handleSort("desc")}
        className={sortBy === "desc" ? css.active : ""}
      >
        {sortBy === "desc" && <PiCheckFatThin className={css.icon} />} Я-А
      </p>
      <p
        onClick={() => handleSort("date")}
        className={sortBy === "date" ? css.active : ""}
      >
        {sortBy === "date" && <PiCheckFatThin className={css.icon} />} Дата
        реєстрації
      </p>
    </div>
  );
}
