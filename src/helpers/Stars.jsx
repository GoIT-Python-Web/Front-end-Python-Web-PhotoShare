import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addRating } from "../store/posts/operations.js";

export default function Stars({ rating, id, post = false }) {
  const totalStars = 5;
  const dispatch = useDispatch();
  const [hoverRating, setHoverRating] = useState(null);

  const handleStarClick = (selectedRating) => {
    if (!post) return;
    dispatch(addRating({ id, rating: Number(selectedRating) }));
  };

  const getCurrentRating = () => (hoverRating !== null ? hoverRating : rating);

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      {[...Array(totalStars)].map((_, index) => {
        const currentRating = getCurrentRating();
        const isFilled = currentRating >= index + 1;
        const isHalfFilled = currentRating > index && currentRating < index + 1;

        const baseStyle = {
          color: "#1041aa",
          fontSize: "24px",
        };

        return (
          <div
            key={index}
            onClick={() =>
              post && handleStarClick(isHalfFilled ? index + 0.5 : index + 1)
            }
            onMouseEnter={() => post && setHoverRating(index + 1)}
            onMouseLeave={() => post && setHoverRating(null)}
            style={{ cursor: post ? "pointer" : "default" }}
          >
            {isFilled ? (
              <FaStar style={baseStyle} size={16} />
            ) : isHalfFilled ? (
              <FaStarHalfAlt style={baseStyle} size={16} />
            ) : (
              <FaRegStar color="#132d6264" size={16} />
            )}
          </div>
        );
      })}
    </div>
  );
}
