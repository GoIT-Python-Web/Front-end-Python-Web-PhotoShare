import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Logo from "../logo/Logo.jsx";
import Button from "../../common/buttons/Button.jsx";
import css from "./Header.module.css";
import { useState } from "react";
import PopupHeaderMenu from "./PopupHeaderMenu/PopupHeaderMenu.jsx";
import burger from "../../../assets/images/Header/burger@2x.png";
import plus from "../../../assets/images/Header/plus@2x.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuIsOpen = () => {
    setIsOpen(true);
  };
  const menuIsClose = () => {
    setIsOpen(false);
  };

  const isDesktopAddButton = useMediaQuery({ minWidth: 1440 });

  return (
    <header className={css.header}>
      <div className={`container ${css.header_container}`}>
        <Logo />
        <div className={css.header_wrap}>
          <ul className={css.header_list}>
            <li className={css.header_list_item}>
              <Link to="" className={css.item_link}>
                Світлини
              </Link>
            </li>
            <li className={css.header_list_item}>
              <Link to="/my-profile" className={css.item_link}>
                Мій профіль
              </Link>
            </li>
            <li className={css.header_list_item}>
              <Link to="" className={css.item_link}>
                Про нас
              </Link>
            </li>
          </ul>
          <button className={css.burger_btn} type="button" onClick={menuIsOpen}>
            <img
              className={css.burger_btn_icon}
              src={burger}
              width={32}
              height={32}
              alt="Burger Icon"
            />
          </button>

          {isOpen && (
            <PopupHeaderMenu menuIsOpen={menuIsOpen} onClose={menuIsClose} />
          )}

          <div className={css.header_right_side}>
            <input className={css.header_search} type="text" placeholder=" " />

            <div className={css.header_toggle_container}>
              <input className={css.toggle_input} type="checkbox" id="toggle" />
              <label for="toggle" className={css.toggle_label}>
                <a className={css.toggle_link} href="#">
                  Увійти
                </a>
                <a className={css.toggle_link} href="#">
                  Зареєструватися
                </a>
              </label>
            </div>

            <Button
              size={isDesktopAddButton ? "sml_header" : "sm_header"}
              variant="primary"
              disabled={false}
              withArrow={false}
            >
              <span>Додати світлину</span>
              <img src={plus} width={20} height={20} alt="Plus Icon" />
            </Button>

            <div className={css.header_user}>
              <Link to="/my-profile">
                <div className={css.header_user_icon}>👤</div>
              </Link>
              <p className={css.header_user_name}>Іванка</p>
              <Link to="">
                <div className={css.header_settings_icon}>⚙️</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
