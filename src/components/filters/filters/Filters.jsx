import css from "./Filters.module.css";
import { useRef, useState } from "react";
import FilterPopUp from "../filterPopUp/FilterPopUp.jsx";
import Icon from "../../UI/icons/Icon.jsx";
import SortPopUp from "../sortPopUp/SortPopUp.jsx";
import { LuCalendarDays } from "react-icons/lu";
import DatePickerPopUp from "../datePickerPopUp/DatePickerPopUp.jsx";

export default function Filters({ location }) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const filterButtonRef = useRef(null);
  const sortButtonRef = useRef(null);
  const datePickerButtonRef = useRef(null);

  const currentRef =
    location === "main" ? filterButtonRef : datePickerButtonRef;

  const handleFilterClick = () => {
    setIsSortingOpen(false);
    setIsFiltersOpen(!isFiltersOpen);
  };

  const handleSortingClick = () => {
    setIsFiltersOpen(false);
    setIsSortingOpen(!isSortingOpen);
  };

  const handleDatePickerClick = () => {
    setIsSortingOpen(false);
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  return (
    <div className={css.wrapper} aria-label={location}>
      <button
        ref={currentRef}
        className={css.filterItem}
        onClick={
          location === "main" ? handleFilterClick : handleDatePickerClick
        }
      >
        {location === "main" ? (
          <Icon name="filter-remove" className={css.filterIcon} />
        ) : (
          <LuCalendarDays className={css.dateIcon} />
        )}
      </button>
      <button className={css.filterItem} ref={sortButtonRef}>
        <Icon
          name="collapse-categories"
          onClick={handleSortingClick}
          className={css.listIcon}
        />
      </button>
      {isFiltersOpen && (
        <FilterPopUp
          buttonRef={filterButtonRef}
          location={location}
          onClose={() => setIsFiltersOpen(false)}
        />
      )}
      {isSortingOpen && (
        <SortPopUp
          onClose={() => setIsSortingOpen(false)}
          buttonRef={sortButtonRef}
        />
      )}
      {isDatePickerOpen && (
        <DatePickerPopUp
          onClose={() => setIsDatePickerOpen(false)}
          buttonRef={datePickerButtonRef}
        />
      )}
    </div>
  );
}
