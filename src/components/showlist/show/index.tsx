import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { IWatchlistItem } from "../../../helpers/interfaces/IWatchlistItem";
import { useAppDispatch } from "../../../app/hooks";
import { selectShowToRemove, toggleModal } from "../../../features/rmModal/modalSlice";

const Show = ({ id, name }: IWatchlistItem): React.JSX.Element => {
    const dispatch = useAppDispatch();

    const handleRemove = (id: number) => {
        dispatch(toggleModal(true));
        dispatch(selectShowToRemove(id));
    }
    
    return (
        <div className="show form-check d-flex justify-content-between align-items-center">
            <input className="checkbox form-check-input" type="checkbox" name="checked-show" id={id.toString()} />
            <label className="title form-check-label" htmlFor={id.toString()}>{name}</label>
            <button className="remove" onClick={() => handleRemove(id)}>
                <FontAwesomeIcon icon={icon({ name: "xmark" })} />
            </button>
        </div>
    );
};

export default Show;