import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectIsLoggedIn,
  selectUser,
} from "../../../../../store/auth/selectors";
import close from "../../../../../assets/images/Header/close@2x.png";
import { LuSearch } from "react-icons/lu";
import { GrLogout } from "react-icons/gr";
import { RiArrowRightWideLine } from "react-icons/ri";
import css from "./PopupMenuIsNotLogined.module.css";

const PopupMenuIsNotLogined = ({
  menuIsOpen,
  onClose,
  searchValue,
  setSearchValue,
  handleSearch,
}) => {
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
    <div className={`${css.popup} ${menuIsOpen ? css.popup_open : ""}`}>
      <button type="button" className={css.close_btn} onClick={onClose}>
        <img
          className={css.close_btn_icon}
          src={close}
          width={28}
          height={28}
          alt="Close Icon"
        />
      </button>

      <div className={css.popup_search_wrap}>
        <input
          className={css.popup_search}
          type="text"
          placeholder="Пошук..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
        />
        <LuSearch className={css.popup_search_icon} />
      </div>

      <div className={css.popup_wrap}>
        <ul className={css.popup_list}>
          <li className={css.popup_list_item}>
            <Link
              to="/posts"
              className={css.popup_list_item_link}
              onClick={onClose}
            >
              Світлини
            </Link>
          </li>
          <li className={css.popup_list_item}>
            <Link
              to={`profile/${user?.id}`}
              className={css.popup_list_item_link}
              onClick={onClose}
            >
              Мій профіль
            </Link>
          </li>
          <li className={css.popup_list_item}>
            <Link
              to="/about"
              className={css.popup_list_item_link}
              onClick={onClose}
            >
              Про нас
            </Link>
          </li>
        </ul>
        <div className={css.popup_toggle_container}>
          <Link className={css.toggle_link_login} to="/login">
            <div className={css.wrap_login_link}>
              <GrLogout className={css.login_icon} />
              <span>Вхід</span>
            </div>
          </Link>
          <Link className={css.toggle_link_register} to="/register">
            <div className={css.wrap_register_link}>
              <div className={css.arrows_wrap}>
                <RiArrowRightWideLine className={css.register_icon} />
                {/* <RiArrowRightWideLine className={css.register_icon} /> */}
              </div>
              <span>Зареєструватись</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default PopupMenuIsNotLogined;
