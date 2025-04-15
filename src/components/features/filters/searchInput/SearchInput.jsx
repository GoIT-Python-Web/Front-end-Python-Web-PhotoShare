import { useEffect, useState } from "react";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import css from "../popups/filterPopUp/FilterPopUp.module.css";

export default function SearchInput({ keyword, onKeywordChange }) {
  const [inputValue, setInputValue] = useState(keyword || "");

  useEffect(() => {
    setInputValue(keyword || "");
  }, [keyword]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const triggerSearch = () => {
    onKeywordChange(inputValue.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      triggerSearch();
    }
  };

  return (
    <div className={css.inputSuperWrapper}>
      <input
        type="text"
        name="keyword"
        className={css.searchInput}
        placeholder="Пошук"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <HiOutlineMagnifyingGlass
        className={css.glassIcon}
        onClick={triggerSearch}
      />
    </div>
  );
}
