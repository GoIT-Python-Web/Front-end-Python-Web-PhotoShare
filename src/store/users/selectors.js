export const selectUsers = (state) => state.users.items;
export const selectUsersLoading = (state) => state.users.isLoading;
export const selectUsersError = (state) => state.users.error;
export const selectTotalPages = (state) => state.users.totalPages;
export const selectCurrentPage = (state) => state.users.currentPage;
export const selectUsersPerPage = (state) => state.users.usersPerPage;
export const selectFilters = (state) => state.users.filters;
