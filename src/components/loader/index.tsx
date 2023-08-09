import React from "react";
import "./index.scss";

const Loader = (): React.JSX.Element => {
    return (
        <div className="loader-container">
            <div className="lds-dual-ring"></div>
        </div>
    );
};

export default Loader;