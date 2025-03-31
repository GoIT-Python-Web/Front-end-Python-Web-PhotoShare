import { Settings, BellOff, User, Trash2 } from "lucide-react";
import s from "./UserList.module.css";

function UserList({
  profileImage = "/placeholder.svg?height=48&width=48",
  profileAlt = "Profile picture",
  userName = "User Name",
  email = "email@example.com",
  dateTime = "DD.MM.YY HH:MM",
}) {
  return (
    <div className={s.userList}>
      <div className={s.userListContainer}>
        <div className={s.profileSection}>
          <div className={s.profileImageContainer}>
            <img
              src={profileImage || "/placeholder.svg"}
              alt={profileAlt}
              className={s.profileImage}
            />
          </div>
          <span className={s.profileName}>{userName}</span>
        </div>

        <div className={s.settingsSection}>
          <button className={s.iconButton}>
            <Settings size={20} />
          </button>
        </div>

        <div className={s.emailSection}>{email}</div>

        <div className={s.timestampSection}>{dateTime}</div>

        <div className={s.actionsSection}>
          <button className={s.iconButton}>
            <BellOff size={20} />
          </button>
          <button className={s.iconButton}>
            <User size={20} />
          </button>
          <button className={s.iconButton}>
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserList;
