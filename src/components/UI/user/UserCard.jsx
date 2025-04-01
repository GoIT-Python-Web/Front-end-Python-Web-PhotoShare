import { Settings, BellOff, User, Trash2 } from "lucide-react";
import s from "./UserCard.module.css";

function UserCard({
  profileImage = "/placeholder.svg?height=48&width=48",
  profileAlt = "Profile picture",
  userName = "User Name",
  email = "email@example.com",
  dateTime = "DD.MM.YY HH:MM",
  onDelete,
}) {
  return (
    <div className={s.userCard}>
      <div className={s.userCardContainer}>
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
          <button className={s.iconButton} onClick={onDelete}>
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCard;
