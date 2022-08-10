import React, {FC, useCallback} from "react";

// helpers
import {isNumberAvailable} from "src/utils/helpers";
import {useAppDispatch, useAppSelector} from "src/utils/hooks";
import {N} from "src/utils/interfaces";
import {numberValues} from "src/utils/constants";

// components
import NumberButton from "./numberButton";

// redux
import {getWorkingGrid} from "src/redux/selectors/gridSelectors";
import {clearBlock, fillBlock} from "src/redux/slices/gridReducer";

// styles
import {Container} from "./styles";

const Numbers: FC = () => {
    const dispatch = useAppDispatch();
    const workingGrid = useAppSelector((state) => getWorkingGrid(state));

    const isVisible = (value: N) => isNumberAvailable(workingGrid, value);

    const handleClickNumber = useCallback(
        (value: N) => (value === 0 ? dispatch(clearBlock()) : dispatch(fillBlock(value))),
        // eslint-disable-next-line
        []
    );

    return (
        <Container>
            {numberValues.map((value) => (
                <NumberButton
                    key={`number-${value}`}
                    value={value}
                    isVisible={isVisible(value)}
                    onClickNumber={handleClickNumber}
                />
            ))}
        </Container>
    );
};

export default Numbers;
