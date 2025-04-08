import { useEffect } from "react";
import css from "./PopupHeaderMenu.module.css";
import { Link } from "react-router-dom";
import close from "../../../../assets/images/Header/close@2x.png";

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
          <Link to="/my-profile">
            <div className={css.popup_top_user}>👤</div>
          </Link>
          <span className={css.popup_top_name}>Іванка</span>
          <Link to="#">
            <div className={css.popup_top_settings}>⚙️</div>
          </Link>
        </div>
        <ul className={css.header_popup_list}>
          <li className={css.popup_list_item}>
            <Link to="#" className={css.popup_list_item_link}>
              Світлини
            </Link>
          </li>
          <li className={css.popup_list_item}>
            <Link to="/my-profile" className={css.popup_list_item_link}>
              Мій профіль
            </Link>
          </li>
          <li className={css.popup_list_item}>
            <Link to="#" className={css.popup_list_item_link}>
              Про нас
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default PopupHeaderMenu;
