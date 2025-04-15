import React, { useRef } from "react";
import css from "./SortPopUp.module.css";
import { PiCheckFatThin } from "react-icons/pi";
import { useClickOutside } from "../../../../../helpers/hooks/useClickOutside.js";

export default function UserSortPopUp({
  buttonRef,
  onClose,
  onSortChange,
  selected,
  options,
}) {
  const modalRef = useRef(null);
  useClickOutside(modalRef, buttonRef, onClose);

  // Якщо не передають опції сортування, використовуємо наступний набір за замовчуванням:
  const sortOptions = options || [
    {
      label: "Ім’я (A-Z)",
      value: { sort_by: "name", order: "asc" },
    },
    {
      label: "Ім’я (Z-A)",
      value: { sort_by: "name", order: "desc" },
    },
    {
      label: "Дата реєстрації (нові)",
      value: { sort_by: "date", order: "desc" },
    },
    {
      label: "Дата реєстрації (старі)",
      value: { sort_by: "date", order: "asc" },
    },
  ];

  // Обробка кліку по опції
  const handleSort = (option) => {
    const { sort_by, order } = option.value || option; // Якщо опції мають поле value, використовуємо його
    onSortChange({ sort_by, order });
  };

  // Отримуємо поточні значення сортування з filters (selected)
  // Зверніть увагу, що у фільтрах може бути ключ sort_order або order
  const currentSortBy = selected?.sort_by || "";
  const currentOrder = selected?.sort_order || selected?.order || "";

  return (
    <div className={css.wrapper} ref={modalRef}>
      {sortOptions.map((option) => {
        const optionSortBy = option.value
          ? option.value.sort_by
          : option.sort_by;
        const optionOrder = option.value ? option.value.order : option.order;
        const isActive =
          currentSortBy === optionSortBy && currentOrder === optionOrder;
        return (
          <p
            key={`${optionSortBy}-${optionOrder}`}
            onClick={() => handleSort(option)}
            className={isActive ? css.active : ""}
          >
            {isActive && <PiCheckFatThin className={css.activeIcon} />}{" "}
            {option.label}
          </p>
        );
      })}
    </div>
  );
}
