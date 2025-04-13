import { useState } from "react";
import AsyncSelect from "react-select/async";
import { fetchCities } from "./api";
import debounce from "lodash.debounce";
import css from "./LocationSelect.module.css";
import { useFormikContext } from "formik";
import { useMediaQuery } from "react-responsive";

export const CitySearchSelect = () => {
  const { setFieldValue } = useFormikContext();
  const isTablet = useMediaQuery({ minWidth: "768px" });
  const isDesktop = useMediaQuery({ minWidth: "1440px" });

  const debouncedFetch = debounce((input, callback) => {
    fetchCities(input).then(callback);
  }, 1500);

  const loadOptions = (inputValue) => {
    return new Promise((resolve) => {
      debouncedFetch(inputValue, resolve);
    });
  };

  const handleChange = (selectedCity) => {
    console.log(selectedCity.label);
    setFieldValue("location", selectedCity ? selectedCity.label : "");
  };

  return (
    <div>
      <AsyncSelect
        loadOptions={loadOptions}
        defaultOptions
        onChange={handleChange}
        placeholder="Введіть місто..."
        styles={{
          control: (base, state) => ({
            ...base,
            fontSize: "16px",
            borderRadius: "13px",
            borderColor: "var(--text)",
            backgroundColor: "var(--input-backgroung)",
            padding: "4px 10px",
            boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.25)",
            outline: "none",
            width: isDesktop ? "536px" : isTablet ? "696px" : "326px",
            height: "48px",
            "&:hover": {
              borderColor: "#007bff",
            },
          }),
          menu: (base) => ({
            ...base,
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            zIndex: 10,
          }),
          option: (base, state) => ({
            ...base,
            backgroundColor: state.isSelected
              ? "#007bff"
              : state.isFocused
              ? "#f0f8ff"
              : "white",
            color: state.isSelected ? "white" : "black",
          }),
          placeholder: (base) => ({
            ...base,
            color: "#888",
            fontSize: "",
          }),
        }}
      />
    </div>
  );
};
