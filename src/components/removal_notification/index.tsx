import { Modal } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    selectShowNotification,
    toggleNotification,
} from "../../features/rmModal/modalSlice";
import "./index.scss";

const RemovalNotification = (): React.JSX.Element => {
    const showNotification = useAppSelector(selectShowNotification);
    const dispatch = useAppDispatch();

    return (
        <Modal
            size="sm"
            show={showNotification}
            onHide={() => dispatch(toggleNotification(false))}
            dialogClassName="notification-modal"
            backdropClassName="notification-backdrop"
        >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>The TV Show is removed from your watchlist.</Modal.Body>
        </Modal>
    );
};

export default RemovalNotification;
