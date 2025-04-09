export const selectPosts = (state) => state.posts.posts;
export const selectPost = (state) => state.posts.post;
export const selectComments = (state) => state.posts.comments ?? [];
export const selectIsLoading = (state) => state.posts.isLoading;
export const selectError = (state) => state.posts.error;
