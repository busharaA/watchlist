import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { IWatchlistItem } from "../../../helpers/interfaces/IWatchlistItem";
import { useAppDispatch } from "../../../app/hooks";
import {
    selectShowToRemove,
    toggleModal,
} from "../../../features/rmModal/modalSlice";

const Show = ({ id, name, summary }: IWatchlistItem): React.JSX.Element => {
    const [isChecked, setIsChecked] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const dispatch = useAppDispatch();

    const handleRemove = (id: number) => {
        dispatch(toggleModal(true));
        dispatch(selectShowToRemove(id));
    };

    return (
        <div className="show form-check d-flex justify-content-between">
            <input
                className="checkbox form-check-input"
                type="checkbox"
                name="checked-show"
                id={id.toString()}
                onChange={() => setIsChecked((current) => !current)}
            />
            <div className="title d-flex flex-column">
                <div>
                    <label
                        className={`form-check-label ${isChecked && "checked"}`}
                        htmlFor={id.toString()}
                    >
                        {name}
                    </label>
                    <button
                        className={`expand-summary ${
                            isChecked && "expand-summary-checked"
                        }`}
                        onClick={() => setIsExpanded((current) => !current)}
                    >
                        {!isExpanded && (
                            <FontAwesomeIcon
                                icon={icon({ name: "chevron-down" })}
                            />
                        )}
                        {isExpanded && (
                            <FontAwesomeIcon
                                icon={icon({ name: "chevron-up" })}
                            />
                        )}
                    </button>
                </div>
                {isExpanded && (
                    <div className="show-summary">{summary.replace(/(<\/?p>)|(<\/?b>)/g, "")}</div>
                )}
            </div>
            <button className="remove" onClick={() => handleRemove(id)}>
                <FontAwesomeIcon icon={icon({ name: "xmark" })} />
            </button>
        </div>
    );
};

export default Show;
