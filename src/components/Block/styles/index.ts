import styled, {css} from "styled-components";

interface IProps {
    active?: boolean;
    activeSecondary?: boolean;
    puzzle?: boolean;
    sameValue?: boolean;
    correctValue: boolean;
}

export const Container = styled.div<IProps>`
    ${({active, activeSecondary, puzzle, sameValue, correctValue, theme}) => css`
        align-items: center;
        background-color: ${active
            ? theme.colors.orange
            : activeSecondary
            ? theme.colors.yellow
            : sameValue
            ? theme.colors.blue
            : theme.colors.white};
        border: 1px solid ${theme.colors.blackLight};
        border-radius: ${theme.borderRadius};
        color: ${puzzle
            ? theme.colors.grey
            : correctValue
            ? theme.colors.blackLight
            : theme.colors.red};
        cursor: pointer;
        display: flex;
        flex-grow: 1;
        flex-shrink: 0;
        flex-basis: 0;
        font-size: 32px;
        font-weight: 500;
        height: fit-content;
        justify-content: center;
        transition: ${theme.transition};
        user-select: none;
        width: 52px;
        height: 52px;

        &:before {
            padding-top: 100%;
            content: "";
            float: left;
        }

        &:hover {
            background-color: ${theme.colors.blueLight};
        }
    `}
`;
