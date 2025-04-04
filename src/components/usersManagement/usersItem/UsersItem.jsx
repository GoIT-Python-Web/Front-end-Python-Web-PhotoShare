import s from "./UsersItem.module.css";
import Icon from "../../UI/icons/Icon";
import getColorFromName from "../../../helpers/getColorFromName";
import { useState } from "react";
import { useScrollLock } from "../../../helpers/useScrollLock";

function UserItem({
  profileImage = null,
  profileAlt = "Profile picture",
  userName = "User Name",
  email = "email@example.com",
  dateTime = "DD.MM.YY HH:MM",
  onDelete,
  role = "user",
}) {
  const [showModal, setShowModal] = useState(false);
  useScrollLock(showModal);

  const handleRoleChange = () => {
    console.log(" change role to username");
    setShowModal(false);
  };

  const handleBan = () => {
    console.log("Забанити користувача:", userName);
    setShowModal(false);
  };

  return (
    <div className={s.userItem}>
      <div className={s.userItemContainer}>
        <div className={s.pickname}>
          <div className={s.profileImageContainer}>
            {typeof profileImage === "string" &&
            profileImage.trim() !== "" &&
            profileImage !== "null" &&
            profileImage !== "undefined" ? (
              <img
                src={profileImage}
                alt={profileAlt}
                className={s.profileImage}
              />
            ) : (
              <div
                className={s.initialAvatar}
                style={{ backgroundColor: getColorFromName(userName) }}
              >
                {userName.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <span className={s.profileName}>
            {userName}
            {/* {role === "admin" && <span className={s.badgeAdmin}>Адмін</span>} */}
          </span>
        </div>
        <div className={s.settingsSection}>
          <button className={s.adminIconButton}>
            <Icon
              name={role === "admin" ? "shield" : "user"}
              // title={role === "admin" ? "Адмін" : "Користувач"}
            />
          </button>
          <div className={s.dateFunction}>
            <div className={s.mobilEmailSection}>
              <div className={s.emailSection}>{email}</div>
              <div className={s.timestampSection}>{dateTime}</div>
            </div>
            <div className={s.actionsSection}>
              <button className={s.iconButton} onClick={handleBan}>
                <Icon name="ban" />
              </button>
              <button className={s.iconButton} onClick={handleRoleChange}>
                <Icon name="user-role" />
              </button>
              <button className={s.iconButton} onClick={onDelete}>
                <Icon name="trash" />
              </button>

              {/* Кнопка три крапки — тільки на мобільній версії */}
              <button
                className={`${s.iconButton} ${s.dotsOnlyMobile}`}
                onClick={() => setShowModal(true)}
              >
                <Icon name="dots" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className={s.modalOverlay}>
          <div className={s.modalContent}>
            <button
              className={s.closeModal}
              onClick={() => setShowModal(false)}
            >
              <Icon name="xclose" />
            </button>
            <button onClick={handleRoleChange} className={s.modalBtn}>
              <Icon name="user-role" /> Змінити Роль
            </button>
            <button onClick={onDelete} className={s.modalBtn}>
              <Icon name="trash" /> Видалити Профіль
            </button>
            <button onClick={handleBan} className={s.modalBtn}>
              <Icon name="ban" /> Забанити Користувача
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserItem;
