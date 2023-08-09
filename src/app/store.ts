import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import showsReducer from "../features/shows/showsSlice";
import modalReducer from "../features/rmModal/modalSlice";


export const store = configureStore({
    reducer: {
        shows: showsReducer,
        rmModal: modalReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
