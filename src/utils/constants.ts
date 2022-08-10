import {IDifficultyLabels, IDifficultyNames, IDifficultyValues, N} from "./interfaces";

export const numberValues: Readonly<N[]> = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

export const difficultyValues: Readonly<IDifficultyValues> = {
    easy: 2,
    medium: 6,
    hard: 12
};

export const DifficultyNames: Readonly<IDifficultyNames> = {
    EASY: "easy",
    MEDIUM: "medium",
    HARD: "hard"
};

export const DifficultyLabels: Readonly<IDifficultyLabels> = {
    EASY: "Easy, 3-5 prefilled numbers",
    MEDIUM: "Medium, 3-4 prefilled numbers",
    HARD: "Hard, 1-3 prefilled numbers"
};
