import { Link, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import Logo from "../logo/Logo.jsx";
import Button from "../../common/buttons/Button.jsx";
import css from "./Header.module.css";
import { useState } from "react";
import PopupMenuIsLogined from "./PopupHeaderMenu/PopupMenuIsLogined/PopupMenuIsLogined.jsx";
import PopupMenuIsNotLogined from "./PopupHeaderMenu/PopupMenuIsNotLogined/PopupMenuIsNotLogined.jsx";
import burger from "../../../assets/images/Header/burger@2x.png";
import plus from "../../../assets/images/Header/plus@2x.png";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn, selectUser } from "../../../store/auth/selectors.js";
import def from "../../../assets/images/def.png";
import { IoIosArrowDown } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import star_settings from "../../../assets/icons/star_settings.svg";
import { fetchPostsByFilters } from "../../../store/posts/operations.js";

const Header = () => {
  const [searchValue, setSearchValue] = useState("");

  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isMainPage = location.pathname === "/posts";

  const handleSearch = () => {
    if (!isMainPage) navigate("/posts");
    dispatch(fetchPostsByFilters({ keyword: searchValue, order: "asc" }));
    setSearchValue("");
  };

  const menuIsOpen = () => {
    setIsOpen(true);
  };
  const menuIsClose = () => {
    setIsOpen(false);
  };

  const isDesktopAddButton = useMediaQuery({ minWidth: 1440 });
  const isMobilAddButton = useMediaQuery({ maxWidth: 767 });

  return (
    <header className={css.header}>
      <div className={`container ${css.header_container}`}>
        <Logo />
        {isOpen && (
          <PopupMenuIsLogined
            menuIsOpen={menuIsOpen}
            onClose={menuIsClose}
            isLoggedIn={true}
          />
        )}
        {isOpen && (
          <PopupMenuIsNotLogined
            menuIsOpen={menuIsOpen}
            onClose={menuIsClose}
            isLoggedIn={false}
          />
        )}
        <div className={css.header_wrap}>
          <ul className={css.header_list}>
            <li className={css.header_list_item}>
              <Link to="/posts" className={css.item_link}>
                Світлини
              </Link>
            </li>
            <li className={css.header_list_item}>
              <Link to={`profile/${user?.id}`} className={css.item_link}>
                Мій профіль
              </Link>
            </li>
            <li className={css.header_list_item}>
              <Link to="about" className={css.item_link}>
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

          <div className={css.header_right_side}>
            <input
              className={css.header_search}
              type="text"
              placeholder="Пошук..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <LuSearch className={css.search_icon} />
            {!isLoggedIn && !isOpen ? (
              <div className={css.header_toggle_container}>
                <Link className={css.toggle_link} to="/login">
                  Увійти
                </Link>
                <Link className={css.toggle_link} to="/register">
                  Зареєструватися
                </Link>
              </div>
            ) : (
              <>
                {!isMobilAddButton && (
                  <Button
                    size={isDesktopAddButton ? "sml_header" : "sm_header"}
                    variant="primary"
                    disabled={false}
                    withArrow={false}
                  >
                    <span>Додати світлину</span>
                    <img src={plus} width={20} height={20} alt="Plus Icon" />
                  </Button>
                )}

                <div className={css.header_user}>
                  <Link to={`profile/${user?.id}`}>
                    <div className={css.header_user_icon}>
                      <img
                        src={user?.img_link ?? def}
                        alt={`${user?.name}'s profile picture`}
                        className={css.rounded}
                      />
                    </div>
                  </Link>
                  <p className={css.header_user_name}>
                    {user?.username}
                    <button className={css.user_name_btn} type="button">
                      <IoIosArrowDown className={css.user_name_btn_icon} />
                    </button>
                  </p>
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
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
