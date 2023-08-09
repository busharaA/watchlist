import { Outlet } from "react-router-dom";
import Header from "./components/header";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { selectStatus, selectQuery, fetchBySearchQuery } from "./features/shows/showsSlice";
import Loader from "./components/loader";
import { useEffect, /*useState*/ } from "react";
import SearchBar from "./containers/search";
import RemoveModal from "./components/remove_modal";
import { selectShowModal } from "./features/rmModal/modalSlice";
// import { useLocation } from "react-router-dom";

// const useBackButton = () => {
//     const [isBack, setIsBack] = useState(false);
//     const handleGoBack = () => {
//         setIsBack(true);
//     };

//     useEffect(() => {
//         window.addEventListener("popstate", handleGoBack);
//         return () => window.removeEventListener("popstate", handleGoBack);
//     });

//     return isBack;
// }

const App = () => {
    const status = useAppSelector(selectStatus);
    const query = useAppSelector(selectQuery);
    const showRmModal = useAppSelector(selectShowModal)
    const dispatch = useAppDispatch();
    // const isBack = useBackButton();
    // const location = useLocation();

    useEffect(() => {
        if (query !== "") {
            dispatch(fetchBySearchQuery(query));
        }
    }, [query, dispatch]);

    //TODO: AFTER COMMIT: Handle returning to base url (or one query back) when a user clicks "back" 
    // if returning one query back, fetch previous data from API using query part of url

    // console.log(isBack);
    // console.log(location.search);
    // useEffect(() => {
    //     if (isBack) {
    //         // dispatch(fetchBySearchQuery());
    //         console.log(location.search);
    //     }
    // });

    return (
        <div className="App">
            {status === "pending" ? (
                <Loader />
            ) : (
                <div>
                    <Header />
                    <SearchBar />
                    <Outlet />
                </div>
            )}
            {showRmModal && <RemoveModal />}
        </div>
    );
};

export default App;
