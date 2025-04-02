import user from "./user.json";
import css from "./UserCard.module.css";
import { MdOutlineStars } from "react-icons/md";

export default function UserCard() {
  return (
    <div className={css.cardWrapper}>
      <div>
        <p className={css.tabRegisterDate}>
          Дата реєстрації <span>{user.createdAt}</span>
        </p>
      </div>
      <div className={css.flex}>
        <img
          src={user.profilePic}
          alt={`${user.name}'s profile picture`}
          width={70}
          height={74}
        />
        <div className={css.textWrapper}>
          <div className={css.column}>
            <p className={css.registerDate}>
              Дата реєстрації <span>{user.createdAt}</span>
            </p>
            <div className={css.nameWrapper}>
              <div className={css.column}>
                <p className={css.name}>{user.name}</p>
                <p className={css.userName}>{user.username}</p>
              </div>
              <p className={css.role}>
                <MdOutlineStars />
                {user.role}
              </p>
              <p className={css.deskRegisterDate}>
                Дата реєстрації <span>{user.createdAt}</span>
              </p>
            </div>
          </div>
          <p className={css.tabDescription}>{user.description}</p>
        </div>
      </div>
      <p className={css.description}>{user.description}</p>
    </div>
  );
}
