import {createSelector} from "@reduxjs/toolkit";
import {identifySquareCoords} from "src/utils/helpers";
import {BlockData, INDEX, N} from "src/utils/interfaces";
import {RootState} from "../store/store";

export const getChallengeGrid = (state: RootState) => state.gridReducer.challengeGrid;

export const getWorkingGrid = (state: RootState) => state.gridReducer.workingGrid;

export const getSelectedBlock = (state: RootState) => state.gridReducer.selectedBlock;

export const getSolvedGrid = (state: RootState) => state.gridReducer.solvedGrid;

export const getIsActiveGame = (state: RootState) => state.gridReducer.isActiveGame;

export const getSelectedBlockValue = createSelector(
    [getSelectedBlock, getWorkingGrid],
    (selectedBlock, workingGrid): N =>
        selectedBlock && workingGrid ? workingGrid[selectedBlock[0]][selectedBlock[1]] : 0
);

export const getIsActiveBlock = createSelector(
    [
        getSelectedBlock,
        (state: RootState, colIndex: INDEX, rowIndex: INDEX) => colIndex,
        (state: RootState, colIndex: INDEX, rowIndex: INDEX) => rowIndex
    ],
    (selectedBlock, colIndex, rowIndex): boolean =>
        selectedBlock ? selectedBlock[0] === rowIndex && selectedBlock[1] === colIndex : false
);

export const getIsActiveBlockSecondary = createSelector(
    [
        getIsActiveBlock,
        getSelectedBlock,
        (state: RootState, colIndex: INDEX, rowIndex: INDEX) => colIndex,
        (state: RootState, colIndex: INDEX, rowIndex: INDEX) => rowIndex
    ],
    (isActiveBlock, selectedBlock, colIndex, rowIndex): boolean => {
        if (isActiveBlock || !selectedBlock) return false;
        const squareCoords = identifySquareCoords({
            col: selectedBlock[1],
            row: selectedBlock[0]
        });
        const isInSquare = squareCoords.find(
            (coords) => coords[0] === rowIndex && coords[1] === colIndex
        );

        if (selectedBlock[0] === rowIndex || selectedBlock[1] === colIndex || isInSquare)
            return true;

        return false;
    }
);

export const getIsPuzzle = createSelector(
    [
        getChallengeGrid,
        (state: RootState, colIndex: INDEX, rowIndex: INDEX) => colIndex,
        (state: RootState, colIndex: INDEX, rowIndex: INDEX) => rowIndex
    ],
    (challengeGrid, colIndex, rowIndex): boolean =>
        challengeGrid && challengeGrid[rowIndex][colIndex] !== 0 ? true : false
);

export const getBlockValue = createSelector(
    [
        getWorkingGrid,
        (state: RootState, colIndex: INDEX, rowIndex: INDEX) => colIndex,
        (state: RootState, colIndex: INDEX, rowIndex: INDEX) => rowIndex
    ],
    (workingGrid, colIndex, rowIndex): N => (workingGrid ? workingGrid[rowIndex][colIndex] : 0)
);

export const getIsSameValue = createSelector(
    [getBlockValue, getSelectedBlockValue],
    (blockValue, selectedBlockValue): boolean =>
        selectedBlockValue && selectedBlockValue === blockValue
);

export const getIsCorrectValue = createSelector(
    [
        getBlockValue,
        getSolvedGrid,
        (state: RootState, colIndex: INDEX, rowIndex: INDEX) => colIndex,
        (state: RootState, colIndex: INDEX, rowIndex: INDEX) => rowIndex
    ],
    (blockValue, solvedGrid, colIndex, rowIndex): boolean =>
        !blockValue || (blockValue && solvedGrid[rowIndex][colIndex] === blockValue)
);

export const getBlockData = createSelector(
    [
        getIsActiveBlock,
        getIsActiveBlockSecondary,
        getIsPuzzle,
        getBlockValue,
        getIsSameValue,
        getIsCorrectValue
    ],
    (isActive, isActiveSecondary, isPuzzle, value, isSameValue, isCorrectValue): BlockData => ({
        isActive,
        isActiveSecondary,
        isPuzzle,
        isSameValue,
        isCorrectValue,
        value
    })
);
