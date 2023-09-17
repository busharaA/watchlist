import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { useAppDispatch } from "../../app/hooks";
import { setSearchQuery } from "../../features/shows/showsSlice";
import { useLocation, useNavigate } from "react-router-dom";

const SearchBar = (): React.JSX.Element => {
    const [search, setSearch] = useState<string>(localStorage.getItem("search") || "");

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const handleKeySubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (search) {
            dispatch(setSearchQuery(search));
            navigate("/results/?q=" + search.replace(/\s+/g, "+").toLowerCase()); // Redirects to Search Result page
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        localStorage.setItem("search", e.target.value);
    }

    useEffect(() => {
        if (location.search !== "") {
            setSearch(location.search.replace("?q=", ""));
        }
    }, [location]); // Search value follows fetched results if back button is clicked

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
                    onChange={handleChange}
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
