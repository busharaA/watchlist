import { Modal, Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectShowId, selectShowModal, toggleModal } from "../../features/rmModal/modalSlice";
import { removeShowFromWatchlist } from "../../features/shows/showsSlice";

const RemoveModal = (): React.JSX.Element => {
    const dispatch = useAppDispatch();
    const showId = useAppSelector(selectShowId);
    const showModal = useAppSelector(selectShowModal);

    const confirmRmShow = () => {
        dispatch(removeShowFromWatchlist(showId));
        dispatch(toggleModal(false));
    }

    return (
        <Modal show={showModal} onHide={() => dispatch(toggleModal(false))} centered>
            <Modal.Header closeButton>
                <Modal.Title>Remove the show from the watchlist</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to remove this show from your watchlist?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => dispatch(toggleModal(false))}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={confirmRmShow}>
                    Remove
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default RemoveModal;