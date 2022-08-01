import React, {FC} from "react";

// helpers
import {useAppDispatch, useAppSelector} from "src/utils/hooks";
import {INDEX} from "src/utils/interfaces";

// redux
import {getBlockData} from "src/redux/selectors/gridSelectors";
import {selectBlock} from "src/redux/slices/gridReducer";

// styles
import {Container} from "./styles";

interface IProps {
    colIndex: INDEX;
    rowIndex: INDEX;
}

const Block: FC<IProps> = ({colIndex, rowIndex}) => {
    const dispatch = useAppDispatch();
    const {isActive, isActiveSecondary, isPuzzle, isSameValue, isCorrectValue, value} =
        useAppSelector((state) => getBlockData(state, colIndex, rowIndex));

    const handleClick = () => {
        if (!isActive) dispatch(selectBlock([rowIndex, colIndex]));
    };

    return (
        <Container
            active={isActive}
            activeSecondary={isActiveSecondary}
            data-cy={`block-${rowIndex}-${colIndex}`}
            onClick={handleClick}
            puzzle={isPuzzle}
            sameValue={isSameValue}
            correctValue={isCorrectValue}
        >
            {value === 0 ? "" : value}
        </Container>
    );
};

export default Block;
