import "../assets/styles/errorPage.scss";

import { useRouteError } from "react-router-dom";

const ErrorPage = (): React.JSX.Element => {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="error-page">
            <img src={require("../assets/images/pexels-cottonbro-studio-6110250.jpg")} alt="Broken TV" />
            <h1>Oops!</h1>
            <p>An error has occured.</p>
            <p>
                <i>{error instanceof Error && error.message}</i>
            </p>
        </div>
    );
};

export default ErrorPage;