import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import { postsReducer } from "./posts/slice";

const postsPersistConfig = {
  key: "posts",
  storage,
};

// const authPersistConfig = {
//   key: "auth",
//   storage,
// };

// const commentsPersistConfig = {
//   key: "comments",
//   storage,
// };

export const store = configureStore({
  reducer: {
    posts: persistReducer(postsPersistConfig, postsReducer),
    // auth: persistReducer(authPersistConfig, authReducer),
    // comments: persistReducer(commentsPersistConfig, commentsReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: import.meta.env.MODE === "development",
});

export const persistor = persistStore(store);
