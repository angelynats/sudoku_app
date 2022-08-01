import React, {FC, useContext} from "react";
import {Portal} from "react-portal";

// helpers
import {ModalContext} from "src/utils/contexts";
import {ModalConfig} from "src/utils/interfaces";

// components
import {Text, CloseIcon} from "src/components";

// styles
import {StyledModal, ModalContent, CloseButton} from "./styles";

const Modal: FC<ModalConfig> = ({children, title}) => {
    const {closeModal} = useContext(ModalContext);

    return (
        <Portal>
            <StyledModal onClick={closeModal}>
                <ModalContent onClick={(e) => e.stopPropagation()}>
                    <Text color="black" size="28px" margin="0 0 50px 0">
                        {title}
                    </Text>
                    <CloseButton type="button" onClick={closeModal}>
                        <CloseIcon />
                    </CloseButton>
                    {children}
                </ModalContent>
            </StyledModal>
        </Portal>
    );
};

export default Modal;
