import { configureStore } from '@reduxjs/toolkit'
import DocReducer from '../features/docs/docSlice'

export const store = configureStore({
    reducer: {
        docSlice: DocReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // ✅ disable for File support
        }),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch