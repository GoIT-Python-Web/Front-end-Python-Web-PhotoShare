import formatDateTime from "../../../../helpers/formatDateTime";
import UserItem from "../usersItem/UsersItem";
import styles from "./UsersList.module.css";

const UserList = ({ users, onDelete }) => {
  // Якщо немає користувачів, відображаємо повідомлення
  if (!users || users.length === 0) {
    return <div>Немає користувачів для відображення</div>;
  }

  return (
    <div className={styles.userList}>
      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          id={user.id}
          is_active={user.is_active}
          profileImage={user.img_link}
          profileAlt={user.name || user.username}
          userName={user.name || user.username} // Якщо ім'я відсутнє, показуємо username
          email={user.email}
          role={user.type}
          dateTime={formatDateTime(user.created_at)}
        />
      ))}
    </div>
  );
};

export default UserList;
