import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./postsSlice";
import { createCommentReducer } from "./commentSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    comments:createCommentReducer,
    // Add your reducers here
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
