import { useEffect } from "react";
import css from "./PopupMenuIsLogined.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "react-responsive";
import { selectUser } from "../../../../../store/auth/selectors";
import { logout } from "../../../../../store/auth/slice.js";
import Button from "../../../../common/buttons/Button";
import close from "../../../../../assets/images/Header/close@2x.png";
import def from "../../../../../assets/images/def.png";
import plus from "../../../../../assets/images/Header/plus@2x.png";
import star_settings from "../../../../../assets/icons/star_settings.svg";
import { LuSearch } from "react-icons/lu";
import { GrLogout } from "react-icons/gr";
import { LuPencil } from "react-icons/lu";

const PopupMenuIsLogined = ({
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/posts");
    dispatch(logout());
  };

  const user = useSelector(selectUser);
  const isMobilAddButton = useMediaQuery({ maxWidth: 767 });

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

      <div className={css.popup_user_wrap}>
        <div className={css.popup_user}>
          <Link to={`profile/${user?.id}`} onClick={onClose}>
            <div className={css.popup_user_icon}>
              <img
                src={user?.img_link ?? def}
                alt={`${user?.name}'s profile picture`}
                className={css.rounded}
              />
            </div>
          </Link>
          <p className={css.popup_user_name}>{user?.username}</p>
          <Link to={`profile/${user?.id}`}>
            <div className={css.popup_settings_icon} onClick={onClose}>
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
        <div className={css.popup_user_buttons}>
          <Link to="/profile-edit" onClick={onClose}>
            <LuPencil className={css.edit_icon} />
          </Link>
          <p className={css.logout_wrap} onClick={handleLogout}>
            <GrLogout className={css.logout_icon} />
          </p>
        </div>
      </div>

      <div className={css.popup_addbtn_wrap}>
        <Link to="/posts/create" onClick={onClose}>
          <Button
            size={isMobilAddButton ? "lg" : "sm_header"}
            variant="primary"
            disabled={false}
            withArrow={false}
            onClick={() => {}}
          >
            <span>Додати світлину</span>
            <img src={plus} width={20} height={20} alt="Plus Icon" />
          </Button>
        </Link>
      </div>

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
      </div>
    </div>
  );
};
export default PopupMenuIsLogined;
