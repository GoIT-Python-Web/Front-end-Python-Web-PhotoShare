import UserItem from "../usersItem/UsersItem";
import styles from "./UsersList.module.css";

const UserList = ({ users, onDelete }) => {
  return (
    <div className={styles.userList}>
      {users.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          profileImage={user.img_link}
          profileAlt={user.name || user.username}
          userName={user.username}
          email={user.email}
          role={user.type}
          dateTime={user.birth}
          onDelete={() => onDelete(user.id)}
        />
      ))}
    </div>
  );
};
export default UserList;
