export const selectUsers = (state) => state.users.items; // Селектор для отримання списку користувачів
export const selectUsersLoading = (state) => state.users.isLoading; // Селектор для отримання статусу завантаження
export const selectUsersError = (state) => state.users.error; // Селектор для отримання помилки
export const selectTotalPages = (state) => state.users.totalPages; // Селектор для отримання загальної кількості сторінок
export const selectCurrentPage = (state) => state.users.currentPage; // Отримуємо поточну сторінку

// Селектор для кількості користувачів на сторінці
export const selectUsersPerPage = (state) => state.users.usersPerPage;

// Селектор для фільтрів
export const selectFilters = (state) => state.users.filters;
