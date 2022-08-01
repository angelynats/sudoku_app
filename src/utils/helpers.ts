// helpers
import {
    BLOCK_COORDS,
    ColInput,
    GRID,
    INDEX,
    NUMBERS,
    N,
    RowColGridInput,
    RowColInput,
    RowInput,
    SQUARE,
    SquareInput
} from "./interfaces";

/**
 * A function to create a full valid sudoku grid
 */
export const createFullGrid = (): GRID => {
    const grid: GRID = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    fillGrid(grid);
    return grid;
};

/**
 * A function to copy grid
 */
export const copyGrid = (grid: GRID): GRID => {
    const gridCopy: GRID = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    for (let r: INDEX = 0; r < 9; r++)
        for (let c: INDEX = 0; c < 9; c++) gridCopy[r][c] = grid[r][c];

    return gridCopy;
};

/**
 * Removes numbers from a full grid to create a sudoku puzzle
 * @param grid : 9x9 sudoku grid
 * @param attempts : number of attempts to solve (higher means more difficult) - default is 5
 */
export const removeGridNumbers = (grid: GRID, attempts = 5): GRID => {
    while (attempts > 0) {
        let row = getRandomIndex();
        let col = getRandomIndex();

        while (grid[row][col] === 0) {
            row = getRandomIndex();
            col = getRandomIndex();
        }

        const backup = grid[row][col];
        grid[row][col] = 0;

        // copy grid
        const gridCopy = copyGrid(grid);
        // set a global counter
        global.counter = 0;

        // attempt to solve the grid
        solveGrid(gridCopy);

        // if global counter is not 1
        // grid[row][col] = backup
        // decrement attempts
        if (global.counter !== 1) {
            grid[row][col] = backup;
            attempts--;
        }
    }
    return grid;
};

export const fillGrid = (grid: GRID) => {
    let row = 0;
    let col = 0;
    const numbers: NUMBERS[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 81; i++) {
        row = Math.floor(i / 9);
        col = i % 9;

        if (grid[row][col] === 0) {
            shuffle(numbers);
            for (const value of numbers) {
                // is it not in the grid row?
                if (!isInRow({grid, row, value}))
                    if (!isInCol({col, grid, value})) {
                        // is it not in the grid column?
                        // is it not in the grid square?
                        // if so...
                        const square = identifySquare({col, grid, row});
                        if (!isInSquare({square, value})) {
                            grid[row][col] = value;
                            // check grid if it is full, if so, stop and return true
                            if (checkGrid(grid)) return true;
                            else if (fillGrid(grid)) return true;
                            // otherwise we run fullGrid(grid) again
                        }
                    }
            }

            break;
        }
    }

    grid[row][col] = 0;
};

/**
 * A backtracking / recursive function to check all possible combinations of numbers until a solution is found
 * @param grid A 9x9 array consisting of values from 0-9
 */
export const solveGrid = (grid: GRID) => {
    let row = 0;
    let col = 0;
    const numbers: NUMBERS[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 81; i++) {
        row = Math.floor(i / 9);
        col = i % 9;

        if (grid[row][col] === 0) {
            for (const value of numbers)
                if (!isInRow({grid, row, value}))
                    if (!isInCol({col, grid, value})) {
                        const square = identifySquare({col, grid, row});
                        if (!isInSquare({square, value})) {
                            grid[row][col] = value;
                            if (checkGrid(grid)) {
                                global.counter++;
                                break;
                            } else if (solveGrid(grid)) return true;
                        }
                    }
            break;
        }
    }
    grid[row][col] = 0;
};

/**
 * An array shuffling function using the Fisher-Yates shuffle algorithm.
 * @param array An array that I want shuffled
 */
export const shuffle = (array: number[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

/**
 * a function that returns true if the value is already being used in the current grid row
 * @param input Object with 9x9 sudoku grid, row index, and value
 */
export const isInRow = ({grid, row, value}: RowInput): boolean => {
    return grid[row].includes(value);
};

/**
 *  A function that returns true if the value is already being used in the current grid column
 * @param param0 Object with 9x9 sudoku Grid, column index and value
 */
export const isInCol = ({col, grid, value}: ColInput): boolean => {
    for (let i = 0; i < 9; i++) {
        if (value === grid[i][col]) return true;
    }
    return false;
};

/**
 * function that identifies and returns the current square of a given sudoku grid at a row and index
 * @param input Object with 9x9 sudoku grid, row index and column index
 */

export const identifySquare = ({col, grid, row}: RowColGridInput): SQUARE => {
    const square = [];
    if (row < 3) {
        if (col < 3)
            for (let x = 0; x < 3; x++) {
                square.push([grid[x][0], grid[x][1], grid[x][2]]);
            }
        else if (col < 6)
            for (let x = 0; x < 3; x++) {
                square.push([grid[x][3], grid[x][4], grid[x][5]]);
            }
        else
            for (let x = 0; x < 3; x++) {
                square.push([grid[x][6], grid[x][7], grid[x][8]]);
            }
    } else if (row < 6) {
        if (col < 3)
            for (let x = 3; x < 6; x++) {
                square.push([grid[x][0], grid[x][1], grid[x][2]]);
            }
        else if (col < 6)
            for (let x = 3; x < 6; x++) {
                square.push([grid[x][3], grid[x][4], grid[x][5]]);
            }
        else
            for (let x = 3; x < 6; x++) {
                square.push([grid[x][6], grid[x][7], grid[x][8]]);
            }
    } else {
        if (col < 3)
            for (let x = 6; x < 9; x++) {
                square.push([grid[x][0], grid[x][1], grid[x][2]]);
            }
        else if (col < 6)
            for (let x = 6; x < 9; x++) {
                square.push([grid[x][3], grid[x][4], grid[x][5]]);
            }
        else
            for (let x = 6; x < 9; x++) {
                square.push([grid[x][6], grid[x][7], grid[x][8]]);
            }
    }

    return square as SQUARE;
};

/**
 * function that identifies and returns the current square of a given sudoku grid at a row and index
 * @param input Object with 9x9 sudoku grid, row index and column index
 */

export const identifySquareCoords = ({col, row}: RowColInput): BLOCK_COORDS[] => {
    const square = [];
    if (row < 3) {
        if (col < 3)
            for (let x = 0; x < 3; x++) {
                square.push([x, 0], [x, 1], [x, 2]);
            }
        else if (col < 6)
            for (let x = 0; x < 3; x++) {
                square.push([x, 3], [x, 4], [x, 5]);
            }
        else
            for (let x = 0; x < 3; x++) {
                square.push([x, 6], [x, 7], [x, 8]);
            }
    } else if (row < 6) {
        if (col < 3)
            for (let x = 3; x < 6; x++) {
                square.push([x, 0], [x, 1], [x, 2]);
            }
        else if (col < 6)
            for (let x = 3; x < 6; x++) {
                square.push([x, 3], [x, 4], [x, 5]);
            }
        else
            for (let x = 3; x < 6; x++) {
                square.push([x, 6], [x, 7], [x, 8]);
            }
    } else {
        if (col < 3)
            for (let x = 6; x < 9; x++) {
                square.push([x, 0], [x, 1], [x, 2]);
            }
        else if (col < 6)
            for (let x = 6; x < 9; x++) {
                square.push([x, 3], [x, 4], [x, 5]);
            }
        else
            for (let x = 6; x < 9; x++) {
                square.push([x, 6], [x, 7], [x, 8]);
            }
    }

    return square as BLOCK_COORDS[];
};

/**
 * A function that returns true if the value is already being used in the current grid square
 * @param param0 Object with 3x3 square and value
 */
export const isInSquare = ({square, value}: SquareInput): boolean => {
    return [...square[0], ...square[1], ...square[2]].includes(value);
};

/**
 * A function to check if the grid is full
 * @param grid A 9x9 array consisting of values from 0-9
 */
export const checkGrid = (grid: GRID): boolean => {
    for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) if (grid[i][j] === 0) return false;
    return true;
};

/**
 * Return a random sudoku grid index in the 0-8 range
 */
export const getRandomIndex = () => Math.floor(Math.random() * Math.floor(9));

/**
 * Check if block was puzzled initially
 */
export const isPuzzleBlock = (grid: GRID, colIndex: INDEX, rowIndex: INDEX): boolean =>
    grid[rowIndex][colIndex] !== 0 ? true : false;

/**
 * Check if block was puzzled initially
 */
export const isNumberAvailable = (grid: GRID, number: N): boolean => {
    let count = 0;
    for (let i = 0; i < 9; i++) for (let j = 0; j < 9; j++) if (grid[i][j] === number) count += 1;
    return count !== 9;
};

/**
 * compares two arrays of any dimensions and returns true if they are equal, otherwise returns false
 * @param arr1 : first array to be compared
 * @param arr2 : second array to be compared
 */
// eslint-disable-next-line
export const compareArrays = (arr1: any[], arr2: any[]): boolean => {
    if (!Array.isArray(arr1) && !Array.isArray(arr2)) return arr1 === arr2;

    if (arr1.length !== arr2.length) return false;
    for (let i = 0, len = arr1.length; i < len; i++)
        if (!compareArrays(arr1[i], arr2[i])) return false;

    return true;
};
