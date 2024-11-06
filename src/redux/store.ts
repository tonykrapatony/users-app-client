import { configureStore } from '@reduxjs/toolkit'
import { authApi } from './authApi'
import authReducer from './authSlice'
import { usersApi } from './usersApi'
import { postsApi } from './postsApi'
import { commentsApi } from './commentsApi'
import { friendsApi } from './friendsApi'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [friendsApi.reducerPath]: friendsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(
      authApi.middleware,
      usersApi.middleware,
      postsApi.middleware,
      commentsApi.middleware,
      friendsApi.middleware,
    )
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch