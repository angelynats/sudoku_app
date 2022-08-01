import React, {FC, useContext} from "react";

// helpers
import {ModalContext} from "src/utils/contexts";
import {useAppDispatch} from "src/utils/hooks";

// components
import {Button} from "../../components";
import {ConfirmationModal} from "../Modals";

// redux
import {clearSolutions} from "src/redux/slices/gridReducer";

// styles
import {Container} from "./styles";

const RestartButton: FC = () => {
    const dispatch = useAppDispatch();
    const {openModal, closeModal} = useContext(ModalContext);

    const handleClearSolutions = () => {
        dispatch(clearSolutions());
        closeModal();
    };

    const restartGrid = () => {
        openModal({
            title: "Restart a game",
            children: (
                <ConfirmationModal
                    message={"Are you sure you want to restart this game?"}
                    onCancel={closeModal}
                    onConfirm={handleClearSolutions}
                />
            )
        });
    };

    return (
        <Container>
            <Button type="button" onClick={restartGrid} margin="0 0 10px 0">
                Restart
            </Button>
        </Container>
    );
};

export default RestartButton;
