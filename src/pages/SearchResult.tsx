import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppSelector } from "../app/hooks";
import ResultsCard from "../components/results";
import { selectResults } from "../features/shows/showsSlice";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { IShow } from "../helpers/interfaces/IShow";

const SearchResult = (): React.JSX.Element => {
    const results = useAppSelector(selectResults);

    return (
        <div className="results-list">
            {results.length === 0 &&
                <div className="no-results">
                    <FontAwesomeIcon icon={icon({ name: "face-meh", style: "regular" })} />
                    <p>No results</p>
                </div>
            }
            {results && results.map((result: IShow) => (
                <ResultsCard
                    key={result.id}
                    id={result.id}
                    name={result.name}
                    genres={result.genres}
                    image={result.image}
                    summary={result.summary}
                />
            ))}
        </div>
    );
};

export default SearchResult;
