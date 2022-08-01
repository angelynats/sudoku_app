import styled, {css} from "styled-components";

export const Fill = styled.span`
    ${({theme}) => css`
        border: 2px solid ${theme.colors.violet};
        background: none;
        width: 20px;
        height: 20px;
        border-radius: 100%;
        position: absolute;
        top: 50%;
        left: 0;
        transform: translate(0, -50%);
        transition: width 0.2s ease-in, height 0.2s ease-in;
        cursor: pointer;
        z-index: 2;

        &::before {
            content: "";
            opacity: 0;
            width: 14px;
            height: 14px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: ${theme.colors.violet};
            border-radius: 100%;
        }

        &::after {
            content: "";
            opacity: 0;
            width: 14px;
            height: 14px;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: ${theme.colors.violetLight};
            border-radius: 100%;
        }

        &:hover {
            &::before {
                opacity: 1;
                transition: opacity 1s ease;
            }
            &::after {
                opacity: 1;
                width: 38px;
                height: 38px;
                transition: width 0.2s ease-out, height 0.2s ease-out, opacity 0.2s ease;
            }
        }
    `}
`;

export const Root = styled.div`
    margin-bottom: 30px;
    cursor: pointer;
    position: relative;
    label {
        padding-left: 50px;
        cursor: pointer;
        z-index: 2;
        &:hover {
            ${Fill} {
                &::before {
                    opacity: 1;
                    transition: opacity 1s ease;
                }
                &::after {
                    opacity: 1;
                    width: 38px;
                    height: 38px;
                    transition: width 0.2s ease-out, height 0.2s ease-out, opacity 0.2s ease;
                }
            }
        }
    }
    &:last-child {
        margin-bottom: 50px;
    }
`;

export const Input = styled.input`
    display: none;
    &:checked {
        & ~ ${Fill} {
            transition: width 0.2s ease-out, height 0.2s ease-out;

            &::before {
                opacity: 1;
                transition: opacity 1s ease;
            }
            &::after {
                animation-name: radioAnimation;
                animation-duration: 1s;
            }
        }
    }
`;
