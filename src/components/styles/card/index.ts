import styled, {css} from "styled-components";

export const Card = styled.div`
    ${({theme}) => css`
        background-color: ${theme.colors.white};
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 0 1 auto;
        flex-direction: row;
        max-height: max-content;
        min-height: 30%;
        padding: 20px;
    `}
`;
