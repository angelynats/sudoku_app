import styled from "styled-components";

export const StyledModal = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 500;
    background: rgba(34, 36, 35, 0.6);
`;

export const ModalContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
    flex-direction: column;
    position: relative;
    background-color: #fff;
    min-width: 40%;
    min-height: 30vh;
    padding: 30px;
    box-shadow: 0px 3px 6px #00000029;
    overflow-y: auto;
    max-height: calc(100vh - 100px);
    z-index: 700;

    .modal-enter & {
        opacity: 0;
    }
    .modal-enter-active & {
        opacity: 1;
        transition: opacity 500ms;
    }
    .modal-exit & {
        opacity: 1;
    }
    .modal-exit-active & {
        opacity: 0;
        transition: opacity 500ms;
    }
`;

export const CloseButton = styled.button`
    width: 30px;
    height: 30px;
    background-color: #fff;
    border-radius: 50%;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    -webkit-tap-highlight-color: transparent;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-30px, 30px);
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
        transform: translate(-30px, 28px);
    }

    &:active {
        transform: translate(-30px, 30px);
        outline: none;
    }
`;
