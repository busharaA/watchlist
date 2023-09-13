import { Outlet } from "react-router-dom";
import Header from "./components/header";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectStatus, selectQuery, fetchBySearchQuery, setSearchQuery } from "./features/shows/showsSlice";
import Loader from "./components/loader";
import { useEffect } from "react";
import SearchBar from "./containers/search";
import RemoveModal from "./components/remove_modal";
import { selectShowModal, selectShowNotification } from "./features/rmModal/modalSlice";
import RemovalNotification from "./components/removal_notification";
import { useLocation } from "react-router-dom";

const App = () => {
    const status = useAppSelector(selectStatus);
    const query = useAppSelector(selectQuery);
    const showRmModal = useAppSelector(selectShowModal);
    const showNotification = useAppSelector(selectShowNotification);
    const dispatch = useAppDispatch();
    const location = useLocation();

    useEffect(() => {
        if (location.search !== "") {
            dispatch(setSearchQuery(location.search.replace("?q=", "")));
        }
        // Handles restoring previous search results by clicking browser back/forward button
    }, [dispatch, location]);

    useEffect(() => {
        if (query !== "") {
            dispatch(fetchBySearchQuery(query));
        }
    }, [query, dispatch]);

    return (
        <div className="App">
            {status === "pending" ? (
                <Loader />
            ) : (
                <>
                    <Header />
                    <SearchBar />
                    <Outlet />
                </>
            )}
            {showRmModal && <RemoveModal />}
            {showNotification && <RemovalNotification />}
        </div>
    );
};

export default App;
