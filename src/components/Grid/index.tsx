import React, {FC, useContext, useEffect} from "react";
import useMousetrap from "react-hook-mousetrap";

// helpers
import {compareArrays} from "src/utils/helpers";
import {useAppDispatch, useAppSelector} from "src/utils/hooks";
import {INDEX, NUMBERS} from "src/utils/interfaces";
import {ModalContext} from "src/utils/contexts";

// components
import {Block} from "src/components";
import {ConfirmationModal} from "../Modals";

// redux
import {
    getChallengeGrid,
    getSelectedBlock,
    getSolvedGrid,
    getWorkingGrid
} from "src/redux/selectors/gridSelectors";
import {fillBlock, selectBlock, clearBlock} from "src/redux/slices/gridReducer";

// styles
import {Container, Row} from "./styles";

const Grid: FC = () => {
    const dispatch = useAppDispatch();
    const selectedBlock = useAppSelector((state) => getSelectedBlock(state));
    const solvedGrid = useAppSelector((state) => getSolvedGrid(state));
    const workingGrid = useAppSelector((state) => getWorkingGrid(state));
    const challengeGrid = useAppSelector((state) => getChallengeGrid(state));

    const {openModal, closeModal} = useContext(ModalContext);

    useEffect(() => {
        if (compareArrays(workingGrid, solvedGrid)) {
            openModal({
                title: "Congratulations!",
                children: (
                    <ConfirmationModal
                        showButtons={false}
                        message="You win a game"
                        onCancel={closeModal}
                    />
                )
            });
            dispatch(selectBlock(null));
        }
        // eslint-disable-next-line
    }, [workingGrid, solvedGrid]);

    const fill = (n: NUMBERS) => dispatch(fillBlock(n));

    const clear = () => dispatch(clearBlock());

    const moveDown = () => {
        if (selectedBlock && selectedBlock[0] < 8)
            dispatch(selectBlock([(selectedBlock[0] + 1) as INDEX, selectedBlock[1]]));
    };

    const moveLeft = () => {
        if (selectedBlock && selectedBlock[1] > 0)
            dispatch(selectBlock([selectedBlock[0], (selectedBlock[1] - 1) as INDEX]));
    };

    const moveRight = () => {
        if (selectedBlock && selectedBlock[1] < 8)
            dispatch(selectBlock([selectedBlock[0], (selectedBlock[1] + 1) as INDEX]));
    };

    const moveUp = () => {
        if (selectedBlock && selectedBlock[0] > 0)
            dispatch(selectBlock([(selectedBlock[0] - 1) as INDEX, selectedBlock[1]]));
    };

    useMousetrap("1", () => fill(1));
    useMousetrap("2", () => fill(2));
    useMousetrap("3", () => fill(3));
    useMousetrap("4", () => fill(4));
    useMousetrap("5", () => fill(5));
    useMousetrap("6", () => fill(6));
    useMousetrap("7", () => fill(7));
    useMousetrap("8", () => fill(8));
    useMousetrap("9", () => fill(9));
    useMousetrap("0", clear);
    useMousetrap("del", clear);
    useMousetrap("backspace", clear);
    useMousetrap("down", moveDown);
    useMousetrap("left", moveLeft);
    useMousetrap("right", moveRight);
    useMousetrap("up", moveUp);

    return (
        <Container>
            {challengeGrid.map((row, rowIndex) => {
                return (
                    <Row key={`row-${rowIndex}`}>
                        {row.map((item, colIndex) => (
                            <Block
                                key={`block-${colIndex}`}
                                rowIndex={rowIndex as INDEX}
                                colIndex={colIndex as INDEX}
                            />
                        ))}
                    </Row>
                );
            })}
        </Container>
    );
};

export default Grid;
