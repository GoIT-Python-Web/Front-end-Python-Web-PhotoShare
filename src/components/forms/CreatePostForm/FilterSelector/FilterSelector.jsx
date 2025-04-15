import { useEffect, useState } from "react";
import css from "../FilterSelector/FilterSelector.module.css";
import { useDispatch } from "react-redux";
import { uploadFilteredImage } from "../../../../store/posts/operations.js";
import def from "../../../../assets/images/circle-user.png";
import { clearLink } from "../../../../store/posts/slice.js";

const FILTERS = [
  { label: "Normal", value: null },
  { label: "Fade", value: "art:zorro" },
  { label: "Warm", value: "art:sizzle" },
  { label: "Cool", value: "art:frost" },
];

const mapRangeToFactor = (value) => {
  return 1 + value / 200;
};

const FilterSelector = ({ image, size, scale, buttonRef }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const dispatch = useDispatch();

  const handleApply = async () => {
    if (!image) return;

    try {
      let file;

      if (typeof image === "string") {
        const response = await fetch(image);
        const blob = await response.blob();
        file = new File([blob], "image.jpg", { type: blob.type });
      } else {
        file = image;
      }

      const bitmap = await createImageBitmap(file);

      const sizeFactor = mapRangeToFactor(size);
      const scaleFactor = mapRangeToFactor(scale);

      const finalFactor = sizeFactor * scaleFactor;

      const width = Math.round(bitmap.width * finalFactor);
      const height = Math.round(bitmap.height * finalFactor);
      const filters = {
        file,
        width,
        height,
        crop: "scale",
        effect: selectedFilter,
      };
      dispatch(uploadFilteredImage(filters));
    } catch (error) {
      console.error("Failed to apply filter:", error);
    }
  };

  return (
    <div className={css.filterWrap}>
      <div className={css.filterHeader}>
        <h3 className={css.filterTitle}>Фільтри</h3>
        <p
          className={`${css.applyFilterBtn} ${!image ? css.disabled : ""}`}
          onClick={handleApply}
          ref={buttonRef}
          disabled={!image}
        >
          Застосувати фільтр
        </p>
      </div>

      <div className={css.filterOptions}>
        {FILTERS.map((filter) => (
          <button
            type="button"
            key={filter.value}
            className={
              selectedFilter === filter?.value
                ? `${css.filterBtn} ${css.selected}`
                : css.filterBtn
            }
            onClick={() => setSelectedFilter(filter?.value)}
            disabled={!image}
          >
            <img
              src={
                image
                  ? typeof image === "string"
                    ? image
                    : URL.createObjectURL(image)
                  : def
              }
              alt={filter.label}
              className={`${css.filterImage} ${
                image
                  ? filter.value === "art:zorro"
                    ? css.fadePreview
                    : filter.value === "art:sizzle"
                    ? css.warmPreview
                    : filter.value === "art:frost"
                    ? css.coolPreview
                    : css.normalPreview
                  : ""
              }`}
            />
            <span className={css.filterLabel}>{filter.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterSelector;
