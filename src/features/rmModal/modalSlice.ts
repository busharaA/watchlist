import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ModalState {
    showModal: boolean;
    showId: number;
    notifyRemoval: boolean;
}

const initialState: ModalState = {
    showModal: false,
    showId: 0,
    notifyRemoval: false,
};

export const modalSlice = createSlice({
    name: "rmModal",
    initialState,
    reducers: {
        toggleModal: (state, action: PayloadAction<boolean>) => {
            state.showModal = action.payload;
        },
        selectShowToRemove: (state, action: PayloadAction<number>) => {
            state.showId = action.payload;
        },
        toggleNotification: (state, action: PayloadAction<boolean>) => {
            state.notifyRemoval = action.payload;
        }
    },
});

export const { toggleModal, selectShowToRemove, toggleNotification } = modalSlice.actions;

export const selectShowModal = (state: RootState) => state.rmModal.showModal;
export const selectShowId = (state: RootState) => state.rmModal.showId;
export const selectShowNotification = (state: RootState) => state.rmModal.notifyRemoval;

export default modalSlice.reducer;
