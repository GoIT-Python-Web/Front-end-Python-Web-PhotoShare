import Container from "../container/Container.jsx";
import Logo from "../Logo/Logo.jsx";
import css from "./Header.module.css";
import { useState } from "react";
// import sprite from "/public/sprite.svg";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const toggleMenu = () => setMenuIsOpen(!menuIsOpen);

  return (
    <header className={css.header}>
      <Container className={css.headerСontainer}>
        <Logo className={css.logo} />
        <div className={css.headerWrap}>
          <button className={css.burgerBtn} onClick={toggleMenu}>
            {menuIsOpen ? "✖" : "☰"}
          </button>
          <div className={css.userSettings}>
            <div className={css.userIcon}>👤</div>
            <p className={css.userName}>Ім'я</p>
            <div className={css.settingsIcon}>⚙️</div>
          </div>
          <button className={css.addBtn}>Додати світлину</button>
          <nav className={`sidebar ${menuIsOpen ? "open" : ""}`}>
            <div className={css.sidebarHeader}>
              <div className={css.userIcon}></div>
              <p className={css.userName}>Ім'я</p>
              <div className={css.settingsIcon}></div>
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
        </div>
      </Container>
    </header>
  );
};

export default Header;
