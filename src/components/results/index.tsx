import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IShow } from "../../helpers/interfaces/IShow";
import {
    addToWatchlist,
    selectWatchlist,
    setDetails,
} from "../../features/shows/showsSlice";
import { IWatchlistItem } from "../../helpers/interfaces/IWatchlistItem";

const StyledLink = styled(Link)`
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ResultsCard = ({
    id,
    name,
    genres,
    image,
    summary,
}: IShow): React.JSX.Element => {
    const watchlist = useAppSelector(selectWatchlist);
    const dispatch = useAppDispatch();

    const setDataToDetails = (
        id: number,
        name: string,
        genres: string[],
        image: string,
        summary: string
    ) => {
        dispatch(
            setDetails({
                id: id,
                name: name,
                genres: genres,
                image: {
                    medium: image,
                },
                summary: summary,
            })
        );
    };

    const isInWatchlist = (): boolean => {
        return watchlist.some((show: IWatchlistItem) => show.id === id);
    };

    return (
        <div className="result-card d-flex justify-content-between align-items-center">
            <StyledLink
                to={`/details/${name.replace(/\s+/g, "+").toLowerCase()}`}
                onClick={() =>
                    setDataToDetails(id, name, genres, image.medium, summary)
                }
            >
                {image?.medium && <img src={image.medium} alt={name} />}
                {!image?.medium && (
                    <div className="no-image">
                        <FontAwesomeIcon
                            icon={icon({ name: "image", style: "regular" })}
                        />
                        <h6>No image</h6>
                    </div>
                )}
                <div className="show-desc">
                    <h3>{name}</h3>
                    {genres.length !== 0 && (
                        <p>
                            <b>Genres: </b>
                            {genres.join(", ")}
                        </p>
                    )}
                    {genres.length === 0 && (
                        <p>
                            <b>Genres: </b>n/a
                        </p>
                    )}
                    {summary && (
                        <p className="show-summary">
                            {summary.replace(/(<\/?p>)|(<\/?b>)/g, "")}
                        </p>
                    )}
                </div>
            </StyledLink>
            {!isInWatchlist() && (
                <Link to={"/"}>
                    <button
                        className="add-to-watchlist btn btn-primary"
                        onClick={() =>
                            dispatch(
                                addToWatchlist({
                                    id: id,
                                    name: name,
                                    summary: summary,
                                })
                            )
                        }
                    >
                        <FontAwesomeIcon icon={icon({ name: "plus" })} /> ADD
                    </button>
                </Link>
            )}
            {isInWatchlist() && (
                <button
                    className="add-to-watchlist btn btn-primary"
                    disabled
                >
                    <FontAwesomeIcon icon={icon({ name: "plus" })} /> ADD
                </button>
            )}
        </div>
    );
};

export default ResultsCard;
