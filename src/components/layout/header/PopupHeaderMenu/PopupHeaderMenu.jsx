import { useEffect } from "react";
import css from "./PopupHeaderMenu.module.css";
import { Link } from "react-router-dom";
import close from "../../../../assets/images/Header/close@2x.png";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUser,
} from "../../../../store/auth/selectors.js";
import def from "../../../../assets/images/def.png";

const PopupHeaderMenu = ({ menuIsOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (menuIsOpen) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [menuIsOpen, onClose]);
  if (!menuIsOpen) {
    return null;
  }

  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div
      className={`${css.header_popup} ${
        menuIsOpen ? css.header_popup_open : ""
      }`}
      onClick={onClose}
    >
      <button type="button" className={css.close_btn} onClick={onClose}>
        <img
          className={css.close_btn_icon}
          src={close}
          width={28}
          height={28}
          alt="Close Icon"
        />
      </button>
      <div className={css.header_popup_wrap}>
        <div className={css.header_popup_top}>
          <Link to={`profile/${user?.id}`}>
            <div className={css.popup_top_user}>
              <img
                src={user?.img_link ?? def}
                alt={`${user?.name}'s profile picture`}
                className={css.rounded}
              />
            </div>
          </Link>
          <span className={css.popup_top_name}>{user?.name ?? "User"}</span>
          <Link to={`profile/${user?.id}`}>
            <div className={css.popup_top_settings}>⚙️</div>
          </Link>
        </div>
        <ul className={css.header_popup_list}>
          <li className={css.popup_list_item}>
            <Link to="/posts" className={css.popup_list_item_link}>
              Світлини
            </Link>
          </li>
          <li className={css.popup_list_item}>
            <Link
              to={`profile/${user?.id}`}
              className={css.popup_list_item_link}
            >
              Мій профіль
            </Link>
          </li>
          <li className={css.popup_list_item}>
            <Link to="/about" className={css.popup_list_item_link}>
              Про нас
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default PopupHeaderMenu;
