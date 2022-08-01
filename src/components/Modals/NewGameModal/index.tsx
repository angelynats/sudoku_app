import React, {ChangeEvent, FC, useState} from "react";
import useMousetrap from "react-hook-mousetrap";

// helpers
import {DifficultyLabels, DifficultyNames, DifficultyValues} from "src/utils/constants";
import {DIFFICULTY_NUMBERS} from "src/utils/interfaces";

// components
import {Radio, Button} from "src/components";

// styles
import {ConfirmationButtons, ModalWrapper} from "./styles";

interface IProps {
    onConfirm: (value: DIFFICULTY_NUMBERS) => void;
    onCancel: () => void;
}

const NewGameModal: FC<IProps> = ({onConfirm, onCancel}) => {
    const [value, setValue] = useState(DifficultyNames.MEDIUM);

    const onClickRadioButton = (event: ChangeEvent<HTMLInputElement>) =>
        setValue(event.target.value);

    const createGame = () => onConfirm(DifficultyValues[value]);

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
                    checked={value === DifficultyNames.EASY}
                />
                <Radio
                    value={DifficultyNames.MEDIUM}
                    name="difficulty"
                    labelText={DifficultyLabels.MEDIUM}
                    onChange={onClickRadioButton}
                    checked={value === DifficultyNames.MEDIUM}
                />
                <Radio
                    value={DifficultyNames.HARD}
                    name="difficulty"
                    labelText={DifficultyLabels.HARD}
                    onChange={onClickRadioButton}
                    checked={value === DifficultyNames.HARD}
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
