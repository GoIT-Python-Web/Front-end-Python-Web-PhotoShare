import { useState } from "react";
import css from "../FilterSelector/FilterSelector.module.css";
import { useDispatch } from "react-redux";
import { uploadFilteredImage } from "../../../../store/posts/operations.js";

const FILTERS = [
  { label: "Normal", value: null },
  { label: "Fade", value: "art:zorro" },
  { label: "Warm", value: "art:sizzle" },
  { label: "Cool", value: "art:frost" },
];

const mapRangeToFactor = (value) => {
  return 1 + value / 200;
};

const FilterSelector = ({ image, size, scale, onApply }) => {
  const [selectedFilter, setSelectedFilter] = useState(null);
  const dispatch = useDispatch();
  console.log(size, scale);

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

      dispatch(
        uploadFilteredImage({
          file,
          width,
          height,
          crop: "scale",
          effect: selectedFilter,
        })
      );

      onApply?.(selectedFilter);
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
          disabled={!image}
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
