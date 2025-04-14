import { useRef, useState } from "react";
import css from "./SortPopUp.module.css";
import { PiCheckFatThin } from "react-icons/pi";
import { useClickOutside } from "../../../../../helpers/hooks/useClickOutside.js";

const sortOptions = [
  {
    label: "Найновіші",
    order: "desc",
    sort_by: "date",
  },
  {
    label: "Найстаріші",
    order: "asc",
    sort_by: "date",
  },
  {
    label: "Високий рейтинг",
    order: "desc",
    sort_by: "rating",
  },
  {
    label: "Низький рейтинг",
    order: "asc",
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
    onSortChange({ order: option.order, sort_by: option.sort_by });
  };

  return (
    <div className={`${css.wrapper} ${css.userWrapper}`} ref={modalRef}>
      {sortOptions.map((option) => {
        const isActive =
          selected.order === option.order &&
          selected.sort_by === option.sort_by;

        return (
          <p
            key={`${option.sort_by}-${option.order}`}
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
