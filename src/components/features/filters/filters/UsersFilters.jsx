import css from "./Filters.module.css";
import { useState, useRef, useEffect } from "react";
import Icon from "../../../common/icons/Icon";
import SortPopUp from "../popups/sortPopUp/SortPopUp";
import UserDatePickerPopUp from "../popups/datePickerPopUp/UserDatePickerPopUp";
import { LuCalendarDays } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { resetFilters, setFilters } from "../../../../store/users/slice";
import { selectFilters } from "../../../../store/users/selectors";
import { formatDateLocal } from "../../../../helpers/formatDateLocal";

export default function UsersFilters() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  useEffect(() => {
    dispatch(resetFilters());
  }, [dispatch]);
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const sortButtonRef = useRef(null);
  const datePickerButtonRef = useRef(null);

  const handleSortingClick = () => {
    setIsDatePickerOpen(false); // Закриваємо календар, якщо він відкритий
    setIsSortingOpen(!isSortingOpen); // Переключаємо стан сортування
  };

  const handleDatePickerClick = () => {
    setIsSortingOpen(false); // Закриваємо сортування, якщо воно відкрите
    setIsDatePickerOpen(!isDatePickerOpen); // Переключаємо стан календаря
  };

  const handleSortChange = ({ sort_by, order }) => {
    const newFilters = {
      ...filters,
      sort_by: sort_by === "date" ? "registration_date" : sort_by,
      sort_order: order,
    };
    dispatch(setFilters(newFilters));
    setIsSortingOpen(false); // Закриваємо попап сортування після зміни
  };

  const handleDateChange = ({ from, to }) => {
    const formattedFrom = formatDateLocal(from);
    const formattedTo = formatDateLocal(to);
    const newFilters = {
      ...filters,
      reg_date_from: formattedFrom,
      reg_date_to: formattedTo,
    };
    dispatch(setFilters(newFilters));
    setIsDatePickerOpen(false); // Закриваємо календар після зміни
  };

  return (
    <div className={css.wrapper}>
      <button
        ref={datePickerButtonRef}
        className={css.filterItem}
        onClick={handleDatePickerClick}
      >
        <LuCalendarDays className={css.dateIcon} />
      </button>

      <button
        className={css.filterItem}
        ref={sortButtonRef}
        onClick={handleSortingClick}
      >
        <Icon name="collapse-categories" className={css.listIcon} />
      </button>

      {isDatePickerOpen && (
        <UserDatePickerPopUp
          onClose={() => setIsDatePickerOpen(false)}
          buttonRef={datePickerButtonRef}
          onDateSelect={handleDateChange}
        />
      )}

      {isSortingOpen && (
        <SortPopUp
          onClose={() => setIsSortingOpen(false)}
          buttonRef={sortButtonRef}
          onSortChange={handleSortChange}
          options={[
            {
              label: "Ім’я (A-Z)",
              value: { sort_by: "username", order: "asc" },
            },
            {
              label: "Ім’я (Z-A)",
              value: { sort_by: "username", order: "desc" },
            },
            {
              label: "Дата реєстрації (нові)",
              value: { sort_by: "created_at", order: "desc" },
            },
            {
              label: "Дата реєстрації (старі)",
              value: { sort_by: "created_at", order: "asc" },
            },
          ]}
        />
      )}
    </div>
  );
}
