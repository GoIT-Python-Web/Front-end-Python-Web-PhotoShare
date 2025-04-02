import React from "react";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";

export default function Stars({ rating }) {
  const totalStars = 5;

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

        if (rating >= index + 1) {
          return <FaStar key={index} style={starStyle} size={16} />;
        } else if (rating > index && rating < index + 1) {
          return <FaStarHalfAlt key={index} style={halfStarStyle} size={16} />;
        } else {
          return <FaRegStar key={index} color="#132d6264" size={16} />;
        }
      })}
    </div>
  );
}
