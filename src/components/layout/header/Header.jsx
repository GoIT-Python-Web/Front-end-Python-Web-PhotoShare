import { Link } from "react-router-dom";
import css from "./Header.module.css";
import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import Button from "../../common/buttons/Button.jsx";
import Logo from "../logo/Logo.jsx";
import close from "../../../assets/images/Header/close@2x.png";
import burger from "../../../assets/images/Header/burger@2x.png";
import plus from "../../../assets/images/Header/plus@2x.png";
const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const toggleMenu = () => setMenuIsOpen(!menuIsOpen);

  const isDesktopAddButton = useMediaQuery({ minWidth: 1440 });

  return (
    <header className={css.header}>
      <div className={`container ${css.headerСontainer}`}>
        <Logo />
        <div className={css.headerWrap}>
          <button className={css.burgerBtn} onClick={toggleMenu}>
            {menuIsOpen ? (
              <img
                className={css.closeIcon}
                src={close}
                width={32}
                height={32}
                alt="Close Icon"
              />
            ) : (
              <img
                className={css.burgerIcon}
                src={burger}
                width={32}
                height={32}
                alt="Burger Icon"
              />
            )}
          </button>
          <div className={css.userSettings}>
            <Link to="/my-profile">
              <div className={css.userIcon}>👤</div>
            </Link>
            <p className={css.userName}>Ім'я</p>
            <div className={css.settingsIcon}>⚙️</div>
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

          <input className={css.searchInput} type="text" placeholder=" " />
          {menuIsOpen ? (
            <nav className={css.sidebarOpen}>
              <div className={css.sidebarHeader}>
                <Link to="/my-profile" onClick={() => setMenuIsOpen(false)}>
                  <div className={css.userIcon}>👤</div>
                </Link>
                <p className={css.userName}>Ім'я</p>
                <div className={css.settingsIcon}>⚙️</div>
              </div>
              <ul className={css.sidebarList}>
                <li className={css.sidebarItem}>
                  <a href="#" className={css.sidebarLink}>
                    Світлини
                  </a>
                </li>
                <li className={css.sidebarItem}>
                  <a href="#" className={css.sidebarLink}>
                    Мій профіль
                  </a>
                </li>
                <li className={css.sidebarItem}>
                  <a href="#" className={css.sidebarLink}>
                    Про нас
                  </a>
                </li>
                {/* <li className={css.sidebarItem}>
                <a href="#" className={css.sidebarLink}>
                  Користувачі
                </a>
              </li> */}
              </ul>
            </nav>
          ) : (
            <nav className={css.sidebar} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
