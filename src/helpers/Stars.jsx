import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { addRating } from "../store/posts/operations.js";
import { toast } from "sonner";
import { selectError } from "../store/posts/selectors.js";
import { selectIsLoggedIn } from "../store/auth/selectors.js";
import { useNavigate } from "react-router-dom";

export default function Stars({ rating, id, post = false, onRated, isMyPost }) {
  const totalStars = 5;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [hoverRating, setHoverRating] = useState(null);
  const [currentRating, setCurrentRating] = useState(rating);
  const [isRated, setIsRated] = useState(false);

  useEffect(() => {
    setCurrentRating(rating);
  }, [rating]);

  const handleStarClick = async (selectedRating) => {
    if (!isLoggedIn) {
      toast("Щоб поставити оцінку, вам потрібно увійти.", {
        action: {
          label: "Увійти",
          onClick: () => navigate("/login"),
        },
      });
      return;
    }
    if (!post || isRated) return;

    if (isMyPost) {
      toast.warning("Ви не можете оцінити власний пост");
      return;
    }

    const newRating = Number(selectedRating);

    try {
      await dispatch(addRating({ id, rating: newRating })).unwrap();
      setCurrentRating(newRating);
      setIsRated(true);
      if (onRated) onRated(newRating);
    } catch (error) {
      toast.error("Ви не можете оцінити пост двічі");
    }
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
