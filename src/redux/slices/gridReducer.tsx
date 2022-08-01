import {createSlice, PayloadAction} from "@reduxjs/toolkit";

// helpers
import {BLOCK_COORDS, DIFFICULTY_NUMBERS, IGridReducer, N} from "src/utils/interfaces";
import {copyGrid, createFullGrid, removeGridNumbers} from "src/utils/helpers";

type IPayload = {value: N; coords: BLOCK_COORDS};

const initialState: IGridReducer = {
    challengeGrid: null,
    solvedGrid: null,
    workingGrid: null,
    selectedBlock: null,
    isActiveGame: false
};

const gridSlice = createSlice({
    name: "grid",
    initialState: initialState,
    reducers: {
        createGrid: (state, {payload}: PayloadAction<DIFFICULTY_NUMBERS>) => {
            const solvedGrid = createFullGrid();
            const gridCopy = copyGrid(solvedGrid);
            const challengeGrid = removeGridNumbers(gridCopy, payload);
            const workingGrid = copyGrid(challengeGrid);

            state.challengeGrid = challengeGrid;
            state.solvedGrid = solvedGrid;
            state.workingGrid = workingGrid;
            state.isActiveGame = true;
        },
        fillBlock: (state, {payload}: PayloadAction<IPayload>) => {
            if (state.workingGrid) {
                state.workingGrid[payload.coords[0]][payload.coords[1]] = payload.value;
            }
        },
        clearBlock: (state, {payload}: PayloadAction<BLOCK_COORDS>) => {
            state.workingGrid[payload[0]][payload[1]] = 0;
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
