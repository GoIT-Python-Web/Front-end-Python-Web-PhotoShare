import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addRating } from "../store/posts/operations.js";

export default function Stars({ rating, id }) {
  const totalStars = 5;
  const dispatch = useDispatch();

  const handleStarClick = (selectedRating) => {
    console.log(selectedRating);
    dispatch(addRating({ id, rating: Number(selectedRating) }));
  };

  return (
    <div style={{ display: "flex", gap: "5px" }}>
      {[...Array(totalStars)].map((_, index) => {
        const starStyle = {
          color: "#1041aa",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontSize: "24px",
        };

        const halfStarStyle = {
          color: "#1041aa",
          WebkitBackgroundClip: "#132d6264",
          WebkitTextFillColor: "#132d6264",
          fontSize: "24px",
        };

        const isFilled = rating >= index + 1;
        const isHalfFilled = rating > index && rating < index + 1;

        return (
          <div
            key={index}
            onClick={() =>
              handleStarClick(isHalfFilled ? index + 0.5 : index + 1)
            }
            style={{ cursor: "pointer" }}
          >
            {isFilled ? (
              <FaStar style={starStyle} size={16} />
            ) : isHalfFilled ? (
              <FaStarHalfAlt style={halfStarStyle} size={16} />
            ) : (
              <FaRegStar color="#132d6264" size={16} />
            )}
          </div>
        );
      })}
    </div>
  );
}
