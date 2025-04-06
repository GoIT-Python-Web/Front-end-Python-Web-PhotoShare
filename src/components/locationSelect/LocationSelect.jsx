// import React, { useState } from "react";
// import AsyncSelect from "react-select/async";
// import { fetchCities } from "./api";
// import debounce from "lodash.debounce";
// import css from "./LocationSelect.module.css";

// export const CitySearchSelect = () => {
//   const [selectedCity, setSelectedCity] = useState(null);

//   const debouncedFetch = debounce((input, callback) => {
//     fetchCities(input).then(callback);
//   }, 1500);

//   const loadOptions = (inputValue) => {
//     return new Promise((resolve) => {
//       debouncedFetch(inputValue, resolve);
//     });
//   };

//   return (
//     <div className={css.input}>
//       <AsyncSelect
//         loadOptions={loadOptions}
//         defaultOptions
//         onChange={setSelectedCity}
//         placeholder="Введіть місто..."
//         styles={{
//           control: (base, state) => ({
//             ...base,
//             borderRadius: "8px",
//             borderColor: state.isFocused ? "#007bff" : "#ccc",
//             boxShadow: state.isFocused
//               ? "0 0 0 2px rgba(0, 123, 255, 0.2)"
//               : "none",
//           }),
//           menu: (base) => ({
//             ...base,
//             borderRadius: "8px",
//             boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
//             zIndex: 10,
//           }),
//           option: (base, state) => ({
//             ...base,
//             backgroundColor: state.isSelected
//               ? "#007bff"
//               : state.isFocused
//               ? "#f0f8ff"
//               : "white",
//             color: state.isSelected ? "white" : "black",
//           }),
//         }}
//       />
//       {selectedCity && (
//         <a
//           href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
//             selectedCity.label
//           )}`}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-[#262626] hover:text-blue-500 transition-colors"
//         >
//           Переглянути на карті
//         </a>
//       )}
//     </div>
//   );
// };
