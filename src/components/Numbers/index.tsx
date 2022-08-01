import React, {FC} from "react";

// helpers
import {isPuzzleBlock} from "src/utils/helpers";
import {useAppDispatch, useAppSelector} from "src/utils/hooks";
import {N} from "src/utils/interfaces";

// components
import NumberButton from "./numberButton";

// redux
import {
    getChallengeGrid,
    getSelectedBlock,
    getSelectedBlockValue
} from "src/redux/selectors/gridSelectors";
import {fillBlock} from "src/redux/slices/gridReducer";

// styles
import {Container} from "./styles";

const Numbers: FC = () => {
    const dispatch = useAppDispatch();
    const challengeGrid = useAppSelector((state) => getChallengeGrid(state));
    const selectedBlock = useAppSelector((state) => getSelectedBlock(state));
    const selectedBlockkValue = useAppSelector((state) => getSelectedBlockValue(state));

    const handleSelectNumber = (value: N) => {
        if (
            selectedBlock &&
            (selectedBlockkValue === 0 ||
                !isPuzzleBlock(challengeGrid, selectedBlock[1], selectedBlock[0]))
        ) {
            dispatch(fillBlock({value, coords: selectedBlock}));
        }
    };

    return (
        <Container>
            {([1, 2, 3, 4, 5, 6, 7, 8, 9, 0] as N[]).map((value) => (
                <NumberButton key={value} value={value} onSelectNumber={handleSelectNumber} />
            ))}
        </Container>
    );
};

export default Numbers;
