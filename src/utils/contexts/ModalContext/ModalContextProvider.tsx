import React, {useState} from "react";

// helpers
import {ModalContext} from "./ModalContext";
import {ModalConfig} from "src/utils/interfaces";

// components
import {Modal} from "src/common";

export const ModalProvider = ({children}) => {
    const [modalOpened, setModalOpened] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const openModal = (modalConfig: ModalConfig) => {
        setModalContent(modalConfig);
        setModalOpened(true);
    };

    const closeModal = () => {
        setModalOpened(false);
    };

    const valueModalProvider = {
        isShown: modalOpened,
        openModal,
        closeModal
    };

    return (
        <ModalContext.Provider value={valueModalProvider}>
            {modalOpened && <Modal {...modalContent} />}
            {children}
        </ModalContext.Provider>
    );
};
