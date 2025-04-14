import css from "./UserCard.module.css";
import { BsThreeDots } from "react-icons/bs";
import { useMediaQuery } from "react-responsive";
import { useRef, useState } from "react";
import { LuPencil } from "react-icons/lu";
import { RxExit } from "react-icons/rx";
import iconClose from "../../../../assets/icons/iconClose.svg";
import { TbUserStar } from "react-icons/tb";
import { IoBan } from "react-icons/io5";
import formatDateTime from "../../../../helpers/formatDateTime.js";
import def from "../../../../assets/images/def.png";
import { Link, useNavigate } from "react-router-dom";
import defineRole from "../../../../helpers/defineRole.jsx";
import { useClickOutside } from "../../../../helpers/hooks/useClickOutside.js";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../store/auth/slice.js";
import { banUser, toggleUserRole } from "../../../../store/users/operations.js";
import { selectIsProfileAdmin } from "../../../../store/auth/selectors.js";

export default function UserCard({ profile, isMyPage, isAdmin }) {
  const isDesktop = useMediaQuery({ minWidth: "1440px" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isProfileAdmin = useSelector(selectIsProfileAdmin);

  const handleLogout = () => {
    navigate("/posts");
    dispatch(logout());
  };

  const toggleBan = () => {
    dispatch(banUser(profile.id));
  };

  const toggleRole = () => {
    dispatch(toggleUserRole(profile.id));
  };

  const [isOpen, setIsOpen] = useState(false);

  const modalRef = useRef(null);
  const buttonRef = useRef(null);
  const onClose = () => setIsOpen(false);

  useClickOutside(modalRef, buttonRef, onClose);

  return (
    <div className={css.cardWrapper}>
      <div>
        <p className={css.tabRegisterDate}>
          Дата реєстрації{" "}
          <span>{formatDateTime(profile?.created_at, "date")}</span>
        </p>
      </div>
      <div
        className={css.flex}
        data-label={isAdmin ? "admin" : isMyPage ? "myPage" : null}
      >
        <img
          src={profile?.img_link ?? def}
          alt={`${profile?.name}'s profile picture`}
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
                  <p className={css.settingsParagraph} onClick={handleLogout}>
                    <RxExit className={css.settingsIcon} />
                    Вийти з акаунту
                  </p>
                </div>
              ) : (
                <div className={css.icons}>
                  <p className={css.settingsParagraph} onClick={toggleRole}>
                    <TbUserStar className={css.settingsIcon} />
                    Змінити Роль
                  </p>
                  <p className={css.settingsParagraph} onClick={toggleBan}>
                    <IoBan className={css.settingsIcon} />
                    {profile.is_active ? "Забанити" : "Розбанити"} Користувача
                  </p>
                </div>
              )}
            </div>
          )}

          <div className={css.column}>
            <p className={css.registerDate}>
              Дата реєстрації{" "}
              <span>{formatDateTime(profile?.created_at, "date")}</span>
            </p>

            <div className={css.nameWrapper}>
              <div className={css.column}>
                <p className={css.name}>{profile?.name}</p>
                <p className={css.userName}>{profile?.username}</p>
              </div>
              <p className={css.role}>
                {defineRole(profile?.type)}
                {profile?.type}
              </p>
              <p className={css.deskRegisterDate}>
                Дата реєстрації{" "}
                <span>{formatDateTime(profile?.created_at, "date")}</span>
              </p>
              {isDesktop && (
                <>
                  {isMyPage ? (
                    <div className={css.deskIcons}>
                      <Link
                        to="/profile-edit"
                        className={css.settingsParagraph}
                      >
                        <LuPencil className={css.settingsIcon} />
                        Редагувати свій профіль
                      </Link>
                      <p
                        className={css.settingsParagraph}
                        onClick={handleLogout}
                      >
                        <RxExit className={css.settingsIcon} />
                        Вийти з акаунту
                      </p>
                    </div>
                  ) : isAdmin && !isProfileAdmin ? (
                    <div className={css.deskIcons} data-label="admin">
                      <p className={css.settingsParagraph} onClick={toggleRole}>
                        <TbUserStar className={css.settingsIcon} />
                        Змінити Роль
                      </p>
                      <p className={css.settingsParagraph} onClick={toggleBan}>
                        <IoBan className={css.settingsIcon} />
                        Забанити Користувача
                      </p>
                    </div>
                  ) : null}
                </>
              )}
            </div>
          </div>
          <p className={css.tabDescription}>{profile?.description}</p>
        </div>
      </div>
      <p className={css.description}>{profile?.description}</p>
    </div>
  );
}
