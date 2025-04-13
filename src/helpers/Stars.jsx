import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { addRating } from "../store/posts/operations.js";

export default function Stars({ rating, id, post = false, onRated }) {
  const totalStars = 5;
  const dispatch = useDispatch();
  const [hoverRating, setHoverRating] = useState(null);
  const [currentRating, setCurrentRating] = useState(rating);
  const [isRated, setIsRated] = useState(false);

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  const handleStarClick = (selectedRating) => {
    if (!post || isRated) return;
    const newRating = Number(selectedRating);
    setCurrentRating(newRating);
    setIsRated(true);
    dispatch(addRating({ id, rating: newRating }));
    if (onRated) onRated(newRating);
  };

  const displayedRating = hoverRating !== null ? hoverRating : currentRating;

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      {[...Array(totalStars)].map((_, index) => {
        const isFilled = displayedRating >= index + 1;
        const isHalfFilled =
          displayedRating > index && displayedRating < index + 1;

        const baseStyle = {
          color: "#1041aa",
          fontSize: "24px",
        };

        return (
          <div
            key={index}
            onClick={() =>
              !isRated &&
              post &&
              handleStarClick(isHalfFilled ? index + 0.5 : index + 1)
            }
            onMouseEnter={() => !isRated && post && setHoverRating(index + 1)}
            onMouseLeave={() => !isRated && post && setHoverRating(null)}
            style={{ cursor: !isRated && post ? "pointer" : "default" }}
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
