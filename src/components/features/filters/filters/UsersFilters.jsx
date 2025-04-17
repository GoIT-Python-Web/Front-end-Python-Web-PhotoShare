import css from "./Filters.module.css";
import { useState, useRef, useEffect } from "react";
import Icon from "../../../common/icons/Icon";
import UserSortPopUp from "../popups/sortPopUp/UserSortPopUp";
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
    setIsDatePickerOpen(false);
    setIsSortingOpen(!isSortingOpen);
  };

  const handleDatePickerClick = () => {
    setIsSortingOpen(false);
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  const handleSortChange = ({ sort_by, order }) => {
    const newFilters = {
      ...filters,
      sort_by: sort_by === "date" ? "registration_date" : sort_by,
      sort_order: order,
    };
    dispatch(setFilters(newFilters));
    setIsSortingOpen(false);
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
    setIsDatePickerOpen(false);
  };

  return (
    <div className={css.userFillWrap}>
      <button
        ref={datePickerButtonRef}
        className={css.filterItems}
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
        <UserSortPopUp
          onClose={() => setIsSortingOpen(false)}
          buttonRef={sortButtonRef}
          onSortChange={handleSortChange}
          selected={filters}
        />
      )}
    </div>
  );
}
