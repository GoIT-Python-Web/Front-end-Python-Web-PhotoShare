import { useRef, useState } from "react";
import css from "./SortPopUp.module.css";
import { PiCheckFatThin } from "react-icons/pi";
import { useClickOutside } from "../../../../../helpers/hooks/useClickOutside.js";

const sortOptions = [
  {
    label: "Найновіші",
    sort_order: "desc",
    sort_by: "date",
  },
  {
    label: "Найстаріші",
    sort_order: "asc",
    sort_by: "date",
  },
  {
    label: "Високий рейтинг",
    sort_order: "desc",
    sort_by: "rating",
  },
  {
    label: "Низький рейтинг",
    sort_order: "asc",
    sort_by: "rating",
  },
];

export default function SortPopUp({
  buttonRef,
  onClose,
  onSortChange,
  selected,
}) {
  const modalRef = useRef(null);
  useClickOutside(modalRef, buttonRef, onClose);

  const handleSort = (option) => {
    onSortChange({ sort_order: option.sort_order, sort_by: option.sort_by });
  };

  return (
    <div className={`${css.wrapper} ${css.userWrapper}`} ref={modalRef}>
      {sortOptions.map((option) => {
        const isActive =
          // selected.sort_order === option.sort_order &&
          selected.sort_by === option.sort_by;

        return (
          <p
            key={`${option.sort_by}-${option.sort_order}`}
            onClick={() => handleSort(option)}
            className={isActive ? css.active : ""}
          >
            {isActive && (
              <PiCheckFatThin
                className={isActive ? css.activeIcon : css.icon}
              />
            )}{" "}
            {option.label}
          </p>
        );
      })}
    </div>
  );
}
