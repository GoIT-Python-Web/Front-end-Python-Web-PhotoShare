import { useRef, useState } from "react";
import css from "./SortPopUp.module.css";
import { PiCheckFatThin } from "react-icons/pi";
import { useClickOutside } from "../../../../../helpers/hooks/useClickOutside.js";

export default function SortPopUp({ buttonRef, onClose, onSortChange }) {
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("");

  const modalRef = useRef(null);
  useClickOutside(modalRef, buttonRef, onClose);

  const handleSort = (sortOption) => {
    if (sortOption === "asc" || sortOption === "desc") {
      setOrder(sortOption);
      onSortChange({ sort_by: sortBy, order: sortOption });
    } else {
      setSortBy(sortOption);
      onSortChange({ sort_by: sortOption, order });
    }
  };

  return (
    <div className={css.wrapper} ref={modalRef}>
      <p
        onClick={() => handleSort("asc")}
        className={order === "asc" ? css.active : ""}
      >
        {order === "asc" && <PiCheckFatThin className={css.icon} />} А-Я
      </p>
      <p
        onClick={() => handleSort("desc")}
        className={order === "desc" ? css.active : ""}
      >
        {order === "desc" && <PiCheckFatThin className={css.icon} />} Я-А
      </p>
      <p
        onClick={() => handleSort("date")}
        className={sortBy === "date" ? css.active : ""}
      >
        {sortBy === "date" && <PiCheckFatThin className={css.icon} />} Дата
        публікації
      </p>
    </div>
  );
}
