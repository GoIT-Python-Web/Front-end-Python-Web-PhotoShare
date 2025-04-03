// import { TbFilterX } from "react-icons/tb";
// import { LuListCollapse } from "react-icons/lu";
import css from "./Filters.module.css";
import { useRef, useState } from "react";
import FilterPopUp from "../filterPopUp/FilterPopUp.jsx";
import Icon from "../../UI/icons/Icon.jsx";

export default function Filters({ location }) {
  const [isOpen, setIsOpen] = useState(false);

  const buttonRef = useRef(null);

  const handleFilterClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={css.wrapper} aria-label={location}>
      <button
        ref={buttonRef}
        className={css.filterItem}
        onClick={handleFilterClick}
      >
        <Icon name="filter-remove" className={css.filterIcon} />
      </button>
      <button className={css.filterItem}>
        <Icon name="collapse-categories" className={css.listIcon} />
        {/* <LuListCollapse className={css.listIcon} /> */}
      </button>
      {isOpen && (
        <FilterPopUp
          buttonRef={buttonRef}
          location={location}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
