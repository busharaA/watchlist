import React, { useState } from "react";
import "./index.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useAppDispatch } from "../../app/hooks";
import { setSearchQuery } from "../../features/shows/showsSlice";
import { useNavigate } from "react-router-dom";


const SearchBar = (): React.JSX.Element => {
    const [search, setSearch] = useState<string>("");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleKeySubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(setSearchQuery(search));
        navigate("/results/?q=" + search.replace(/\s+/g, "+").toLowerCase()); // Redirects to Search Result page
    };

    return (
        <div className="search-bar">
            <form className="input-group" onSubmit={handleKeySubmit}>
                <input
                    className="form-control"
                    type="text"
                    id="q"
                    name="q"
                    value={search}
                    placeholder="Search..."
                    onChange={(e) => setSearch(e.target.value)}
                    autoComplete="off"
                />
                <button className="btn btn-outline-primary" type="submit">
                    <FontAwesomeIcon icon={icon({ name: "magnifying-glass" })} />
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
