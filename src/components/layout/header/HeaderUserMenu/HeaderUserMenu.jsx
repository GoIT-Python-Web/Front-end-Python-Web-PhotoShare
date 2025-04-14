/* import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Logo from "../logo/Logo.jsx";
import Button from "../../common/buttons/Button.jsx";
import css from "./Header.module.css";
import { useRef, useState } from "react";
import PopupMenuIsLogined from "./PopupHeaderMenu/PopupMenuIsLogined/PopupMenuIsLogined.jsx";
import PopupMenuIsNotLogined from "./PopupHeaderMenu/PopupMenuIsNotLogined/PopupMenuIsNotLogined.jsx";
import burger from "../../../assets/images/Header/burger@2x.png";
import plus from "../../../assets/images/Header/plus@2x.png";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../../store/auth/selectors.js";
import def from "../../../assets/images/def.png";
import { IoIosArrowDown } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import { LuPencil } from "react-icons/lu";
import { RxExit } from "react-icons/rx";
import star_settings from "../../../assets/icons/star_settings.svg";
import { fetchPostsByFilters } from "../../../store/posts/operations.js";
import { logout } from "../../../store/auth/slice.js";
import { useClickOutside } from "../../../helpers/hooks/useClickOutside.js";

import css from "./HeaderUserMenu.module.css";

const HeaderUserMenu = ({
  user,
  popupIsOpen,
  togglePopup,
  closePopup,
  handleLogout,
}) => {
  return (
    <div className={css.header_user}>
      <Link to={`profile/${user?.id}`}>
        <div className={css.header_user_icon}>
          <img
            src={user?.img_link ?? def}
            alt={`${user?.name}'s profile picture`}
            className={css.userImg}
          />
        </div>
      </Link>

      <p className={css.header_user_name}>
        {user?.username || "Default User"}
        <button
          className={css.user_name_btn}
          type="button"
          onClick={() => {
            togglePopup();
          }}
        >
          <IoIosArrowDown
            className={`${css.user_name_btn_icon} ${
              popupIsOpen ? css.user_name_btn_icon_open : ""
            }`}
            ref={buttonRef}
          />
        </button>
      </p>

      {popupIsOpen && (
        <div className={css.header_user_popup} ref={modalRef}>
          {isLoggedIn && (
            <div className={css.icons_wrap}>
              <Link
                to="/profile-edit"
                className={css.edit_icon_wrap}
                onClick={closePopup}
              >
                <LuPencil className={css.edit_icon} />
                Редагувати профіль
              </Link>
              <p className={css.logout_icon_wrap} onClick={handleLogout}>
                <RxExit className={css.logout_icon} />
                Вийти з акаунту
              </p>
            </div>
          )}
        </div>
      )}

      <Link to={`profile/${user?.id}`}>
        <div className={css.header_settings_icon}>
          <img
            className={css.star_settings_icon}
            src={star_settings}
            alt="Settings Icon"
            width={24}
            height={24}
          />
        </div>
      </Link>
    </div>
  );
};

export default HeaderUserMenu;
 */
