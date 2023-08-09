import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
    addToWatchlist,
    selectDetails,
    selectWatchlist,
} from "../features/shows/showsSlice";
import { Link } from "react-router-dom";
import { selectShowToRemove, toggleModal } from "../features/rmModal/modalSlice";

const Details = (): React.JSX.Element => {
    const details = useAppSelector(selectDetails);
    const watchlist = useAppSelector(selectWatchlist);
    const dispatch = useAppDispatch();

    const isInWatchlist = (): boolean => {
        return watchlist.some((show) => show.id === details.id);
    };

    const handleRemove = (id: number) => {
        dispatch(toggleModal(true));
        dispatch(selectShowToRemove(id));
    }
    return (
        <div className="details-container container">
            <div className="row">
                <div className="poster col-3">
                    {details.image.medium && (
                        <img src={details.image.medium} alt={details.name} />
                    )}
                    {!details.image.medium && (
                        <div className="no-image-lg">
                            <FontAwesomeIcon
                                icon={icon({ name: "image", style: "regular" })}
                            />
                            <h6>No image</h6>
                        </div>
                    )}
                </div>
                <div className="show-details col-7">
                    <h2>{details.name}</h2>
                    <h6>
                        <b>Genres: </b>
                        {details.genres.join(", ")}
                    </h6>
                    {details.summary && (
                        <p>
                            {details.summary.replace(/(<\/?p>)|(<\/?b>)/g, "")}
                        </p>
                    )}
                </div>
                {isInWatchlist() && (
                    <div className="remove-button col-2">
                        <button className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#remove-modal" onClick={() => handleRemove(details.id)}>
                            <FontAwesomeIcon icon={icon({ name: "trash" })}/>
                            <span> Remove</span>
                        </button>
                    </div>
                )}
            </div>
            {!isInWatchlist() && <div className="d-grid col-5 mx-auto">
                <Link to={"/"}>
                    <button
                        className="add-to-watchlist-large btn btn-primary"
                        onClick={() =>
                            dispatch(
                                addToWatchlist({
                                    id: details.id,
                                    name: details.name,
                                })
                            )
                        }
                    >
                        <FontAwesomeIcon icon={icon({ name: "plus" })} /> ADD TO
                        WATCHLIST
                    </button>
                </Link>
            </div>}
        </div>
    );
};

export default Details;
