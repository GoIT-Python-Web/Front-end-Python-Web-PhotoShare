// import { useNavigate } from "react-router-dom";
import tabarrow from "../../../assets/icons/tabarrowback.svg";
import mobarrow from "../../../assets/icons/arrowback.svg";
import css from "./BackButton.module.css";
import { useMediaQuery } from "react-responsive";

export default function BackButton({ loc }) {
  const isTablet = useMediaQuery({ minWidth: "768px" });
  //   const navigate = useNavigate();
  return (
    <div className={css.wrapper} aria-label={loc}>
      <img src={isTablet ? tabarrow : mobarrow} alt="Arrow image" />
      <p>Назад</p>
    </div>
  );
}
//  onClick={() => navigate(-1)}
