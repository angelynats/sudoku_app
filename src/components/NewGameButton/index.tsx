import React, {FC, useCallback, useContext} from "react";

// helpers
import {ModalContext} from "src/utils/contexts";
import {useAppDispatch} from "src/utils/hooks";
import {DIFFICULTY_TYPES} from "src/utils/interfaces";

// components
import {Button} from "../../components";
import {NewGameModal} from "../Modals";

// redux
import {createGrid} from "src/redux/slices/gridReducer";

// styles
import {Container} from "./styles";

const NewGameButton: FC = () => {
    const dispatch = useAppDispatch();
    const {openModal, closeModal} = useContext(ModalContext);

    const handleCreateNewGrid = useCallback(
        (value: DIFFICULTY_TYPES) => {
            dispatch(createGrid(value));
            closeModal();
        },
        [closeModal, dispatch]
    );

    const createNewGrid = () => {
        openModal({
            title: "Choose difficulty",
            children: <NewGameModal onConfirm={handleCreateNewGrid} onCancel={closeModal} />
        });
    };

    return (
        <Container>
            <Button type="button" onClick={createNewGrid}>
                Create new puzzle
            </Button>
        </Container>
    );
};

export default NewGameButton;
