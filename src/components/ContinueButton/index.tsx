import React, {FC} from "react";

// helpers
import {useAppDispatch} from "src/utils/hooks";

// components
import {Button} from "../../components";

// redux
import {toggleIsActiveGame} from "src/redux/slices/gridReducer";

// styles
import {Container} from "./styles";

const ContinueButton: FC = () => {
    const dispatch = useAppDispatch();

    const continueGame = () => {
        dispatch(toggleIsActiveGame());
    };

    return (
        <Container>
            <Button type="button" margin="0 0 10px 0" onClick={continueGame}>
                Continue game
            </Button>
        </Container>
    );
};

export default ContinueButton;
