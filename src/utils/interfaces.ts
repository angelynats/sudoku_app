export type BLOCK_COORDS = [INDEX, INDEX];

export type GRID = [ROW, ROW, ROW, ROW, ROW, ROW, ROW, ROW, ROW];

export type INDEX = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type N = 0 | NUMBERS;

export type NUMBERS = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

export type DIFFICULTY_NUMBERS = 3 | 5 | 8;

export type ROW = [N, N, N, N, N, N, N, N, N];

export type SQUARE = [SQUARE_ROW, SQUARE_ROW, SQUARE_ROW];

export type SQUARE_ROW = [N, N, N];

export interface IGridReducer {
    challengeGrid?: GRID;
    selectedBlock?: BLOCK_COORDS;
    solvedGrid?: GRID;
    workingGrid?: GRID;
    isActiveGame?: boolean;
}

export interface BlockData {
    isActive: boolean;
    isActiveSecondary: boolean;
    isPuzzle: boolean;
    value: N;
    isSameValue: boolean;
    isCorrectValue: boolean;
}

export interface ColInput {
    col: number;
    grid: GRID;
    value: NUMBERS;
}

export interface RowInput {
    row: number;
    grid: GRID;
    value: NUMBERS;
}

export interface RowColInput {
    row: number;
    col: number;
}

export interface RowColGridInput {
    grid: GRID;
    row: number;
    col: number;
}

export interface SquareInput {
    square: SQUARE;
    value: NUMBERS;
}

export interface ModalConfig {
    title: string;
    children?: JSX.Element | JSX.Element[];
}
