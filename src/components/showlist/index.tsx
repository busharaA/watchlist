import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../../app/hooks";
import { selectWatchlist } from "../../features/shows/showsSlice";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import Show from "./show";

const Showlist = (): React.JSX.Element => {
    const watchlist = useAppSelector(selectWatchlist);

    return (
        <div className="showlist">
            {watchlist.length === 0 && (
                <div className="no-watchlist-item">
                    <FontAwesomeIcon icon={icon({ name: "tv" })} />
                    <p>Begin by searching for a show you want to watch</p>
                </div>
            )}
            {watchlist.length !== 0 &&
                watchlist.map((item) => (
                    <Show key={item.id} id={item.id} name={item.name} summary={item.summary} />
                ))}
        </div>
    );
};

export default Showlist;
