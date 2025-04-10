import css from "./Filters.module.css";
import { useRef, useState } from "react";
import FilterPopUp from "../popups/filterPopUp/FilterPopUp.jsx";
import Icon from "../../../common/icons/Icon.jsx";
import SortPopUp from "../popups/sortPopUp/SortPopUp.jsx";
import { LuCalendarDays } from "react-icons/lu";
import DatePickerPopUp from "../popups/datePickerPopUp/DatePickerPopUp.jsx";
import { useDispatch } from "react-redux";
import { fetchPostsByFilters } from "../../../../store/posts/operations.js";

export default function Filters({ location }) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [isSortingOpen, setIsSortingOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const [filters, setFilters] = useState({
    keyword: "",
    tags: [],
    from_date: null,
    to_date: null,
    rating_to: null,
    sort_by: "",
    order: "",
  });

  const filterButtonRef = useRef(null);
  const sortButtonRef = useRef(null);
  const datePickerButtonRef = useRef(null);

  const currentRef =
    location === "main" ? filterButtonRef : datePickerButtonRef;

  const dispatch = useDispatch();

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

  const handleSortChange = ({ sort_by, order }) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      sort_by,
      order,
    }));

    dispatch(
      fetchPostsByFilters({
        ...filters,
        sort_by,
        order,
      })
    );

    setIsSortingOpen(false);
  };

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
    dispatch(fetchPostsByFilters({ ...filters, ...newFilters }));
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
          onFilterChange={handleFilterChange}
        />
      )}

      {isSortingOpen && (
        <SortPopUp
          onClose={() => setIsSortingOpen(false)}
          buttonRef={sortButtonRef}
          onSortChange={handleSortChange}
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
