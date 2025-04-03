import React from "react";
import UserItem from "./UserItem";
import styles from "./UserList.module.css";

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
