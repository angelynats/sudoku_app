import React, {ChangeEvent, FC, useState} from "react";
import useMousetrap from "react-hook-mousetrap";

// helpers
import {DifficultyLabels, DifficultyNames} from "src/utils/constants";
import {DIFFICULTY_TYPES} from "src/utils/interfaces";

// components
import {Radio, Button} from "src/components";

// styles
import {ConfirmationButtons, ModalWrapper} from "./styles";

interface IProps {
    onConfirm: (value: DIFFICULTY_TYPES) => void;
    onCancel: () => void;
}

const NewGameModal: FC<IProps> = ({onConfirm, onCancel}) => {
    const [difficulty, setDifficulty] = useState<DIFFICULTY_TYPES>(DifficultyNames.MEDIUM);

    const onClickRadioButton = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value as DIFFICULTY_TYPES;
        setDifficulty(value);
    };

    const createGame = () => onConfirm(difficulty);

    useMousetrap("enter", createGame);
    useMousetrap("escape", onCancel);

    return (
        <ModalWrapper>
            <div>
                <Radio
                    value={DifficultyNames.EASY}
                    name="difficulty"
                    labelText={DifficultyLabels.EASY}
                    onChange={onClickRadioButton}
                    checked={difficulty === DifficultyNames.EASY}
                />
                <Radio
                    value={DifficultyNames.MEDIUM}
                    name="difficulty"
                    labelText={DifficultyLabels.MEDIUM}
                    onChange={onClickRadioButton}
                    checked={difficulty === DifficultyNames.MEDIUM}
                />
                <Radio
                    value={DifficultyNames.HARD}
                    name="difficulty"
                    labelText={DifficultyLabels.HARD}
                    onChange={onClickRadioButton}
                    checked={difficulty === DifficultyNames.HARD}
                />
            </div>
            <ConfirmationButtons>
                <Button type="button" onClick={createGame}>
                    Create
                </Button>
            </ConfirmationButtons>
        </ModalWrapper>
    );
};

export default NewGameModal;
