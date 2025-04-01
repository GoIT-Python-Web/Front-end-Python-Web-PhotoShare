import React from "react";
import UserCard from "../UI/user/UserCard";

const UserList = ({ users, onDelete }) => {
  return (
    <div>
      {Array.isArray(users) &&
        users.map((user) => (
          <UserCard
            key={user.id}
            profileImage={user.profileImage}
            userName={user.userName}
            email={user.email}
            dateTime={user.dateTime}
            onDelete={() => onDelete(user.id)}
          />
        ))}
    </div>
  );
};

export default UserList;
