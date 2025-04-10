import React, { useEffect, useState } from "react";
import Input from "../../../common/inputs/Input";
import Button from "../../../common/buttons/Button";
import UserList from "../usersList/UsersList";
import s from "./UsersContainer.module.css";
import Swal from "sweetalert2";
import Filters from "../../filters/filters/Filters";
import Icon from "../../../common/icons/Icon";
import useWindowWidth from "../../../../helpers/hooks/useWindowWidth";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUsers,
  selectUsersError,
  selectUsersLoading,
} from "../../../../store/users/selectors";
import { fetchUsers } from "../../../../store/users/operations";

const UsersContainer = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  // console.log(users);

  const isLoading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);
  const usersPerPage = 8;
  const isBackendPagination = false;

  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  // const [usersList, setUsers] = useState(users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.username.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  const totalPages = isBackendPagination
    ? 1
    : Math.ceil(filteredUsers.length / usersPerPage);

  const startIndex = currentPage * usersPerPage;

  const currentUsers = isBackendPagination
    ? users
    : filteredUsers.slice(startIndex, startIndex + usersPerPage);

  // const handleDeleteClick = (id) => {
  //   Swal.fire({
  //     title: "Ви впевнені?",
  //     text: "Цього користувача буде видалено!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Так, видалити",
  //     cancelButtonText: "Скасувати",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       // TODO: додати dispatch до backend-видалення
  //       Swal.fire("Видалено!", "Користувача видалено.", "success");
  //     }
  //   });
  // };

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

  const width = useWindowWidth();

  const buttonSize = width < 768 ? "xs" : width < 1440 ? "xl" : "md";

  return (
    <div className={s.wrapper}>
      <div className={s.searchContainer}>
        <div className={s.label}>
          <Input
            className={s.searchInput}
            placeholder="Пошук користувачів за ім’ям, поштою "
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            name="search"
          />
          <Icon name="magnifier" className={s.magnifier} />
          <div className={s.statusFilter}>
            <Icon name="user" className={s.statusIcon} />
            <Icon name="shield" className={s.statusIcon} />
          </div>
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
          size={buttonSize}
          variant="primary"
          withArrow
          arrowPosition="left"
          onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
          disabled={currentPage === 0}
        >
          Назад
        </Button>
        <Button
          size={buttonSize}
          variant="primary"
          withArrow
          arrowPosition="right"
          onClick={() => setCurrentPage((p) => Math.min(totalPages - 1, p + 1))}
          disabled={currentPage >= totalPages - 1}
        >
          Далі
        </Button>
      </div>
    </div>
  );
};

export default UsersContainer;
