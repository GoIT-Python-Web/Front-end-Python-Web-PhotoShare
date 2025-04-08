import css from "./UserCard.module.css";
import { MdOutlineStars } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
import { useEffect, useRef, useState } from "react";
import { LuPencil } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import iconClose from "../../../../assets/icons/iconClose.svg";
import { TbUserStar } from "react-icons/tb";
import { FiTrash2 } from "react-icons/fi";
import { MdAdminPanelSettings } from "react-icons/md";
import { IoBan } from "react-icons/io5";
import { selectUser } from "../../../../store/auth/selectors.js";
import { useSelector } from "react-redux";
import formatDateTime from "../../../../helpers/formatDateTime.js";
import def from "../../../../assets/images/def.png";
import { Link } from "react-router-dom";

export default function UserCard({ isMyPage, isAdmin }) {
  const isDesktop = useMediaQuery({ minWidth: "1440px" });

  const user = useSelector(selectUser);
  console.log(user);

  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [buttonRef]);

  return (
    <div className={css.cardWrapper}>
      <div>
        <p className={css.tabRegisterDate}>
          Дата реєстрації <span>{formatDateTime(user.created_at, "date")}</span>
        </p>
      </div>
      <div
        className={css.flex}
        data-label={isAdmin ? "admin" : isMyPage ? "myPage" : null}
      >
        <img
          src={user.img_link ?? def}
          alt={`${user.name}'s profile picture`}
          width={70}
          height={74}
          className={css.userPic}
        />
        <div className={css.textWrapper}>
          {(isAdmin || isMyPage) && !isDesktop && (
            <BsThreeDots
              className={css.dotsIcon}
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
          {isOpen && (
            <div className={css.settings} ref={modalRef}>
              <div className={css.closeIconWrapper}>
                <img
                  src={iconClose}
                  alt="Close"
                  className={css.closeIcon}
                  onClick={() => setIsOpen(false)}
                />
              </div>
              {!isAdmin ? (
                <div className={css.icons}>
                  <Link to="/profile-edit" className={css.settingsParagraph}>
                    <LuPencil className={css.settingsIcon} />
                    Редагувати свій профіль
                  </Link>
                  <p className={css.settingsParagraph}>
                    <RiLockPasswordLine className={css.settingsIcon} />
                    Змінити пароль
                  </p>
                </div>
              ) : (
                <div className={css.icons}>
                  <p className={css.settingsParagraph}>
                    <TbUserStar className={css.settingsIcon} />
                    Змінити Роль
                  </p>
                  <p className={css.settingsParagraph}>
                    <FiTrash2 className={css.settingsIcon} />
                    Видалити Профіль
                  </p>
                  <p className={css.settingsParagraph}>
                    <IoBan className={css.settingsIcon} />
                    Забанити Користувача
                  </p>
                </div>
              )}
            </div>
          )}

          <div className={css.column}>
            <p className={css.registerDate}>
              Дата реєстрації{" "}
              <span>{formatDateTime(user.created_at, "date")}</span>
            </p>

            <div className={css.nameWrapper}>
              <div className={css.column}>
                <p className={css.name}>{user.name}</p>
                <p className={css.userName}>{user.username}</p>
              </div>
              <p className={css.role}>
                {user.type === "user" ? (
                  <MdOutlineStars />
                ) : (
                  <MdAdminPanelSettings />
                )}
                {user.role}
              </p>
              <p className={css.deskRegisterDate}>
                Дата реєстрації{" "}
                <span>{formatDateTime(user.created_at, "date")}</span>
              </p>
              {!isAdmin && isDesktop && isMyPage ? (
                <div className={css.deskIcons}>
                  <Link to="/profile-edit" className={css.settingsParagraph}>
                    <LuPencil className={css.settingsIcon} />
                    Редагувати свій профіль
                  </Link>
                  <p className={css.settingsParagraph}>
                    <RiLockPasswordLine className={css.settingsIcon} />
                    Змінити пароль
                  </p>
                </div>
              ) : isAdmin && isDesktop ? (
                <div className={css.deskIcons} data-label="admin">
                  <p className={css.settingsParagraph}>
                    <TbUserStar className={css.settingsIcon} />
                    Змінити Роль
                  </p>
                  <p className={css.settingsParagraph}>
                    <FiTrash2 className={css.settingsIcon} />
                    Видалити Профіль
                  </p>
                  <p className={css.settingsParagraph}>
                    <IoBan className={css.settingsIcon} />
                    Забанити Користувача
                  </p>
                </div>
              ) : null}
            </div>
          </div>
          <p className={css.tabDescription}>{user.description}</p>
        </div>
      </div>
      <p className={css.description}>{user.description}</p>
    </div>
  );
}
