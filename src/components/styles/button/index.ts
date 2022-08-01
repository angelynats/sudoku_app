import styled, {css} from "styled-components";

interface IProps {
    margin?: string;
    variant?: string;
    fontSize?: string;
    color?: string;
    disabled?: boolean;
}

export const ButtonCommon = styled.button<IProps>`
    ${({theme, margin, fontSize, color, disabled}) => css`
        display: flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        background: none;
        border: none;
        outline: none;
        color: ${theme.colors[color] || theme.colors.blackLight};
        font-size: ${fontSize || "18px"};
        height: 30px;
        width: 30px;
        padding: 5px;
        margin: ${margin || 0};
        transition: all ${theme.transition};
        ${!disabled &&
        css`
            cursor: pointer;
            &:hover {
                transform: translateY(-2px);
            }
            &:active {
                transform: translateY(0px);
            }
        `}
    `}
`;

export const Button = styled(ButtonCommon)<IProps>`
    ${({theme, variant}) => css`
        background-color: ${variant === "light" ? theme.colors.white : theme.colors.blueDark};
        border: ${variant === "light" ? `1px solid ${theme.colors.blueDark}` : "none"};
        border-radius: 40px;
        padding: 0 15px 0 15px;
        color: ${variant === "light" ? theme.colors.blueDark : theme.colors.white};
        height: 40px;
        width: auto;
        max-width: 275px;

        &:hover {
            box-shadow: 0 5px 5px rgba(0, 0, 0, 0.2);
        }
    `}
`;
