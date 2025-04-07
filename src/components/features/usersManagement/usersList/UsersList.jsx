import UserItem from "../usersItem/UsersItem";
import styles from "./UsersList.module.css";

const UserList = ({ users, onDelete }) => {
  return (
    <div className={styles.userList}>
      {users.map((user) => (
        <UserItem key={user.id} {...user} onDelete={() => onDelete(user.id)} />
      ))}
    </div>
  );
};

export default UserList;
