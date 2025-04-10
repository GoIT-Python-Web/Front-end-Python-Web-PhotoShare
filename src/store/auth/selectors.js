export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;
export const selectIsLoading = (state) => state.auth.isLoading;
export const selectUser = (state) => state.auth.user;
export const selectError = (state) => state.auth.error;
export const selectIsAdmin = (state) => state.auth.user?.type === "admin";
