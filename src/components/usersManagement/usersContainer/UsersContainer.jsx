import React, { useEffect, useState } from "react";
import Input from "../../UI/inputs/Input";
import Button from "../../UI/buttons/Button";
import Icon from "../../UI/icons/Icon";
import UserList from "../usersList/UsersList";
import s from "./UsersContainer.module.css";
import Swal from "sweetalert2";
import usersData from "../../../data/users.json";
import Filters from "../../filters/filters/Filters";

const UsersContainer = () => {
  const usersPerPage = 10;
  const isBackendPagination = false;

  const [users, setUsers] = useState(usersData);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [backendTotalPages, setBackendTotalPages] = useState(1);

  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = isBackendPagination
    ? backendTotalPages
    : Math.ceil(filteredUsers.length / usersPerPage);

  const startIndex = currentPage * usersPerPage;

  const currentUsers = isBackendPagination
    ? users
    : filteredUsers.slice(startIndex, startIndex + usersPerPage);

  useEffect(() => {
    if (!isBackendPagination) return;
    // future backend fetch
  }, [currentPage, isBackendPagination]);

  const handleDeleteClick = (id) => {
    Swal.fire({
      title: "Ви впевнені?",
      text: "Цього користувача буде видалено!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Так, видалити",
      cancelButtonText: "Скасувати",
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers((prev) => prev.filter((user) => user.id !== id));
        Swal.fire("Видалено!", "Користувача видалено.", "success");
      }
    });
  };

  return (
    <>
      <div className={s.searchContainer}>
        <div className={s.label}>
          <Input
            className={s.searchInput}
            placeholder="Пошук користувачів / пошук за тегом"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
            icon="magnifier"
          />
          <Icon name="user-role" className={s.magnifier} />
        </div>
        <div className={s.iconButtons}>
          <Filters location="admin" />
        </div>
      </div>

      <div className={s.userListWrapper}>
        <UserList users={currentUsers} onDelete={handleDeleteClick} />
      </div>

      <div className={s.pagination}>
        <Button
          size="md"
          variant="primary"
          withArrow
          arrowPosition="left"
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={currentPage === 0}
        >
          Назад
        </Button>
        <Button
          size="md"
          variant="primary"
          withArrow
          arrowPosition="right"
          onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={currentPage >= totalPages - 1}
        >
          Далі
        </Button>
      </div>
    </>
  );
};

export default UsersContainer;
