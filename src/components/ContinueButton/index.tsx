import React, {FC} from "react";

// helpers
import {useAppDispatch} from "src/utils/hooks";
import {DIFFICULTY_TYPES} from "src/utils/interfaces";

// components
import {Button} from "../../components";

// redux
import {toggleIsActiveGame} from "src/redux/slices/gridReducer";

// styles
import {Container} from "./styles";

interface IProps {
    difficulty: DIFFICULTY_TYPES;
}

const ContinueButton: FC<IProps> = ({difficulty}) => {
    const dispatch = useAppDispatch();

    const continueGame = () => {
        dispatch(toggleIsActiveGame());
    };

    return (
        <Container>
            <Button type="button" margin="0 0 10px 0" onClick={continueGame}>
                Continue game ({difficulty})
            </Button>
        </Container>
    );
};

export default ContinueButton;
