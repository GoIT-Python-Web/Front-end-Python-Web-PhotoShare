import s from "./UserItem.module.css";
import Icon from "../UI/icons/Icon";
import getColorFromName from "../../helpers/getColorFromName";

function UserItem({
  profileImage = null,
  profileAlt = "Profile picture",
  userName = "User Name",
  email = "email@example.com",
  dateTime = "DD.MM.YY HH:MM",
  onDelete,
  role = "user",
}) {
  return (
    <div className={s.userItem}>
      <div className={s.userItemContainer}>
        <div className={s.profileSection}>
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
          <button className={s.iconButton}>
            <Icon
              name={role === "admin" ? "shield" : "user"}
              stroke="black"
              title={role === "admin" ? "Адмін" : "Користувач"}
            />
          </button>
        </div>

        <div className={s.emailSection}>{email}</div>

        <div className={s.timestampSection}>{dateTime}</div>

        <div className={s.actionsSection}>
          <button className={s.iconButton}>
            <Icon name="ban" fill="black" stroke="black" />
          </button>
          <button className={s.iconButton}>
            <Icon name="user-role" stroke="black" />
          </button>
          <button className={s.iconButton} onClick={onDelete}>
            <Icon name="trash" stroke="black" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserItem;
