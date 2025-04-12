import React, { useEffect, useState } from "react";
import Input from "../../../common/inputs/Input";
import Button from "../../../common/buttons/Button";
import UserList from "../usersList/UsersList";
import s from "./UsersContainer.module.css";
import Swal from "sweetalert2";
import UsersFilters from "../../filters/filters/UsersFilters"; // замість Filters
import Icon from "../../../common/icons/Icon";
import useWindowWidth from "../../../../helpers/hooks/useWindowWidth";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUsers,
  selectUsersError,
  selectUsersLoading,
  selectCurrentPage,
  selectUsersPerPage,
  selectTotalPages,
  selectFilters,
} from "../../../../store/users/selectors";
import { searchUsers } from "../../../../store/users/operations";
import { setCurrentPage, setFilters } from "../../../../store/users/slice";

const usersPerPage = 8;

const UsersContainer = () => {
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const isLoading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);
  const currentPage = useSelector(selectCurrentPage);
  const usersPerPage = useSelector(selectUsersPerPage);
  const totalPages = useSelector(selectTotalPages);
  const filters = useSelector(selectFilters);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      dispatch(searchUsers(filters));
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [dispatch, filters, currentPage]);

  const handleRoleFilterClick = (role) => {
    dispatch(setCurrentPage(0));
    dispatch(setFilters({ ...filters, role: role || "" }));
  };

  const handlePageChange = (direction) => {
    const newPage =
      direction === "next"
        ? Math.min(currentPage + 1, totalPages - 1)
        : Math.max(currentPage - 1, 0);
    dispatch(setCurrentPage(newPage)); // Оновлюємо поточну сторінку в Redux
  };

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
        dispatch(deleteUser(id));
        Swal.fire("Видалено!", "Користувача видалено.", "success");
      }
    });
  };

  const width = useWindowWidth();
  const buttonSize = width < 768 ? "xs" : width < 1440 ? "xl" : "md";

  return (
    <div className={s.wrapper}>
      {isLoading && <div>Завантаження...</div>}
      {error && <div>Сталася помилка: {error}</div>}

      <div className={s.searchContainer}>
        <div className={s.label}>
          <Input
            className={s.searchInput}
            placeholder="Пошук користувачів за ім’ям, поштою "
            value={filters.search}
            onChange={(e) => {
              dispatch(setFilters({ ...filters, search: e.target.value })); // Оновлюємо фільтр пошуку
              dispatch(setCurrentPage(0)); // Скидаємо на першу сторінку при зміні пошуку
            }}
            type="text"
            name="search"
          />
          <Icon name="magnifier1" color=" #697a9e" className={s.magnifier} />
        </div>
        <div className={s.iconButtons}>
          <div className={s.statusFilter}>
            <button
              className={`${s.statusButton} ${
                filters.role === "user" ? s.active : ""
              }`}
              onClick={() => handleRoleFilterClick("user")}
            >
              <Icon
                name="user"
                width="18"
                height="18"
                stroke=" #697a9e"
                color=" #697a9e"
                className={s.statusIcon}
              />
            </button>
            <button
              className={`${s.statusButton} ${
                filters.role === "admin" ? s.active : ""
              }`}
              onClick={() => handleRoleFilterClick("admin")}
            >
              <Icon
                name="shield"
                width="18"
                height="18"
                stroke=" #697a9e"
                className={s.statusIcons}
              />
            </button>
          </div>
          <UsersFilters
            sortBy={filters.sort_by}
            sortOrder={filters.sort_order}
            regDateFrom={filters.reg_date_from}
            regDateTo={filters.reg_date_to}
            setSortBy={(sortBy) =>
              dispatch(setFilters({ ...filters, sort_by: sortBy }))
            }
            setSortOrder={(sortOrder) =>
              dispatch(setFilters({ ...filters, sort_order: sortOrder }))
            }
            setRegDateFrom={(regDateFrom) =>
              dispatch(setFilters({ ...filters, reg_date_from: regDateFrom }))
            }
            setRegDateTo={(regDateTo) =>
              dispatch(setFilters({ ...filters, reg_date_to: regDateTo }))
            }
            resetPage={() => dispatch(setCurrentPage(0))}
          />
        </div>
      </div>

      <div className={s.userListWrapper}>
        <UserList users={users} onDelete={handleDeleteClick} />
      </div>

      <div className={s.pagination}>
        <Button
          size={buttonSize}
          variant="primary"
          withArrow
          arrowPosition="left"
          onClick={() => handlePageChange("prev")}
          disabled={currentPage === 0}
        >
          Назад
        </Button>
        <Button
          size={buttonSize}
          variant="primary"
          withArrow
          arrowPosition="right"
          onClick={() => handlePageChange("next")}
          disabled={currentPage >= totalPages - 1}
        >
          Далі
        </Button>
      </div>
    </div>
  );
};

export default UsersContainer;
