export const selectPosts = (state) => state.posts.posts;
export const selectPersonalPosts = (state) => state.posts.personalPosts;
export const selectPost = (state) => state.posts.post;
export const selectComments = (state) => state.posts.comments ?? [];
export const selectIsLoading = (state) => state.posts.isLoading;
export const selectError = (state) => state.posts.error;
export const selectLink = (state) => state.posts.temporaryLink;
export const selectQR = (state) => state.posts.qr;
export const selectURL = (state) => state.posts.url;
