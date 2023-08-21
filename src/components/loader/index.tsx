import React from "react";

const Loader = (): React.JSX.Element => {
    return (
        <div className="loader-container">
            <div className="lds-dual-ring"></div>
        </div>
    );
};

export default Loader;