// UsersManagement.jsx
import React, { useState, useEffect } from "react";
import { LayoutList, Trash2 } from "lucide-react";
import UserList from "../../components/UserList/UserList";
import Input from "../../components/UI/inputs/Input";
import Button from "../../components/UI/buttons/Button";
import Title from "../../components/UI/title/Title";
import styles from "./UsersManagement.module.css";
import importedUsers from "../../data/users.json";
import Swal from "sweetalert2";

function UsersManagement() {
  const isBackendPagination = false; //true, коли бекенд готовий

  const usersPerPage = 10; // Скільки користувачів показувати на сторінці
  const [currentPage, setCurrentPage] = useState(0); // номер поточної сторінки користувачів для пагінації
  const [backendTotalPages, setBackendTotalPages] = useState(1); // кількість сторінок з бека

  const [users, setUsers] = useState(importedUsers); // Список користувачів з джесона
  const [searchQuery, setSearchQuery] = useState(""); // Текст пошуку

  // 🔍 Фільтрація по імені (frontend only)
  const filteredUsers = users.filter((user) =>
    user.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //Загальна кількість сторінок
  const totalPages = isBackendPagination
    ? backendTotalPages
    : Math.ceil(filteredUsers.length / usersPerPage);

  //Індекс першого користувача (frontend only)
  const startIndex = currentPage * usersPerPage;

  //Користувачі для поточної сторінки
  const currentUsers = isBackendPagination
    ? users //Уже пагіновані з бекенду
    : filteredUsers.slice(startIndex, startIndex + usersPerPage);

  //Запит на бекенд при зміні сторінки
  useEffect(() => {
    if (!isBackendPagination) return;

    const fetchUsers = async () => {
      try {
        const res = await fetch(
          `/api/users?page=${currentPage + 1}&limit=${usersPerPage}`
        );
        const data = await res.json();
        setUsers(data.users);
        setBackendTotalPages(data.totalPages); // або Math.ceil(data.total / limit)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [currentPage, isBackendPagination]);

  // Видалення користувача з підтвердженням через sweetalert2
  const handleDeleteClick = (userId) => {
    Swal.fire({
      title: "Ви впевнені?",
      text: "Цього користувача буде видалено!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Так, видалити",
      cancelButtonText: "Скасувати",
    }).then((result) => {
      if (result.isConfirmed) {
        setUsers((prev) => prev.filter((user) => user.id !== userId));
        Swal.fire("Видалено!", "Користувача видалено.", "success");
      }
    });
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  console.log("USERS 👉", users, Array.isArray(users));
  return (
    <div className={styles.usersPage}>
      <Title location="admin" />

      <div className={styles.searchContainer}>
        <Input
          placeholder="Пошук користувачів / пошук за тегом"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className={styles.iconButtons}>
          <Button size="sm" variant="secondary">
            <Trash2 size={18} />
          </Button>
          <Button size="sm" variant="secondary">
            <LayoutList size={18} />
          </Button>
        </div>
      </div>

      <div className={styles.userListWrapper}>
        <UserList users={currentUsers} onDelete={handleDeleteClick} />
      </div>

      <div className={styles.pagination}>
        <Button
          size="md"
          variant="primary"
          withArrow
          arrowPosition="left"
          onClick={handlePrev}
          disabled={currentPage === 0}
        >
          Назад
        </Button>

        <Button
          size="md"
          variant="primary"
          withArrow
          arrowPosition="right"
          onClick={handleNext}
          disabled={currentPage >= totalPages - 1}
        >
          Далі
        </Button>
      </div>
    </div>
  );
}

export default UsersManagement;
