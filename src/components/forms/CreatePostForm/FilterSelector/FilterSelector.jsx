import { useState } from "react";
import css from "../FilterSelector/FilterSelector.module.css";
import { useDispatch } from "react-redux";
import { uploadFilteredImage } from "../../../../store/posts/operations.js";

const FILTERS = [
  { label: "Normal", value: "normal" },
  { label: "Fade", value: "fade" },
  { label: "Fad warm", value: "fade_warm" },
  { label: "Fade cool", value: "fade_cool" },
];

const FilterSelector = ({ image, onApply }) => {
  const [selectedFilter, setSelectedFilter] = useState("normal");
  const dispatch = useDispatch();

  const handleApply = async () => {
    if (!image) return;

    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: blob.type });
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        const width = img.width;
        const height = img.height;

        dispatch(
          uploadFilteredImage({
            file,
            width,
            height,
            crop: "center",
            effect: selectedFilter,
          })
        );

        onApply(selectedFilter);
      };
    } catch (error) {
      console.error("Failed to apply filter:", error);
    }
  };

  return (
    <div className={css.filterWrap}>
      <div className={css.filterHeader}>
        <h3 className={css.filterTitle}>Фільтри</h3>
        <button
          type="button"
          className={css.applyFilterBtn}
          onClick={handleApply}
        >
          Застосувати фільтр
        </button>
      </div>

      <div className={css.filterOptions}>
        {FILTERS.map((filter) => (
          <button
            type="button"
            key={filter.value}
            className={
              selectedFilter === filter.value
                ? `${css.filterBtn} ${css.selected}`
                : css.filterBtn
            }
            onClick={() => setSelectedFilter(filter.value)}
          >
            <img
              src={
                image
                  ? typeof image === "string"
                    ? image
                    : URL.createObjectURL(image)
                  : "/src/assets/images/EditProfilPage/defaultImg.png"
              }
              alt={filter.label}
              className={css.filterImage}
            />
            <span className={css.filterLabel}>{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterSelector;
