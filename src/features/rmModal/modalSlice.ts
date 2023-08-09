import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface ModalState {
    showModal: boolean;
    showId: number;
}

const initialState = {
    showModal: false,
    showId: 0,
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
        }
    },
});

export const { toggleModal, selectShowToRemove } = modalSlice.actions;

export const selectShowModal = (state: RootState) => state.rmModal.showModal;
export const selectShowId = (state: RootState) => state.rmModal.showId;

export default modalSlice.reducer;