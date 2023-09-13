import { icon } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useNavigate } from "react-router";

const Header = (): React.JSX.Element => {
    const navigate = useNavigate();

    return (
        <div className="header d-flex justify-content-center">
            <button className="back-button" onClick={() => navigate(-1)}>
                <FontAwesomeIcon icon={icon({ name: "arrow-left" })} />
            </button>
            <h1>Your Watchlist</h1>
        </div>
    );
};

export default Header;