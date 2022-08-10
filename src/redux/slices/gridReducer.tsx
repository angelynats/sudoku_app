import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// helpers
import {BLOCK_COORDS, DIFFICULTY_TYPES, IGridReducer, N} from "src/utils/interfaces";
import {
    copyGrid,
    createFullGrid,
    removeGridNumbers,
    isPuzzleBlock,
    isNumberAvailable
} from "src/utils/helpers";
import {DifficultyNames, difficultyValues} from "src/utils/constants";

const initialState: IGridReducer = {
    challengeGrid: null,
    solvedGrid: null,
    workingGrid: null,
    selectedBlock: null,
    isActiveGame: false,
    gridDifficulty: DifficultyNames.MEDIUM
};

const gridSlice = createSlice({
    name: "grid",
    initialState: initialState,
    reducers: {
        createGrid: (state, {payload}: PayloadAction<DIFFICULTY_TYPES>) => {
            const solvedGrid = createFullGrid();
            const gridCopy = copyGrid(solvedGrid);
            const challengeGrid = removeGridNumbers(gridCopy, difficultyValues[payload]);
            const workingGrid = copyGrid(challengeGrid);

            state.challengeGrid = challengeGrid;
            state.solvedGrid = solvedGrid;
            state.workingGrid = workingGrid;
            state.isActiveGame = true;
            state.gridDifficulty = payload;
        },
        fillBlock: (state, {payload}: PayloadAction<N>) => {
            const selectedBlock = state.selectedBlock;
            const isEditableBlock =
                selectedBlock &&
                isNumberAvailable(state.workingGrid, payload) &&
                !isPuzzleBlock(state.challengeGrid, selectedBlock[1], selectedBlock[0]);
            if (isEditableBlock) {
                state.workingGrid[selectedBlock[0]][selectedBlock[1]] = payload;
            }
        },
        clearBlock: (state) => {
            const selectedBlock = state.selectedBlock;
            const isEditableBlock =
                selectedBlock &&
                !isPuzzleBlock(state.challengeGrid, selectedBlock[1], selectedBlock[0]);
            if (isEditableBlock) {
                state.workingGrid[selectedBlock[0]][selectedBlock[1]] = 0;
            }
        },
        clearSolutions: (state) => {
            state.workingGrid = state.challengeGrid;
            state.selectedBlock = null;
        },
        clearGrid: (state) => {
            state.challengeGrid = null;
            state.solvedGrid = null;
            state.workingGrid = null;
            state.selectedBlock = null;
        },
        selectBlock: (state, {payload}: PayloadAction<BLOCK_COORDS | null>) => {
            state.selectedBlock = payload;
        },
        toggleIsActiveGame: (state) => {
            state.isActiveGame = !state.isActiveGame;
        }
    }
});

export const gridReducer = gridSlice.reducer;
export const {
    createGrid,
    fillBlock,
    clearSolutions,
    clearGrid,
    selectBlock,
    clearBlock,
    toggleIsActiveGame
} = gridSlice.actions;
