import styled, {css} from "styled-components";

interface IProps {
    color?: string;
    size?: string;
    margin?: string;
    textAlign?: string;
}

export const Text = styled.p<IProps>`
    ${({theme, color, size, margin, textAlign}) => css`
        color: ${theme.colors[color] || theme.colors.black};
        font-size: ${size || "18px"};
        margin: ${margin || 0};
        padding: 0;
        text-align: ${textAlign || "center"};
    `}
`;
