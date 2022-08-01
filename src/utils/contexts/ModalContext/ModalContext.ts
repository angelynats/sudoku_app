import {createContext} from "react";

// helpers
import {ModalConfig} from "src/utils/interfaces";

interface IModalContext {
    isShown: boolean;
    openModal: (modalConfig: ModalConfig) => void;
    closeModal: () => void;
}

const initialValue = {
    isShown: false,
    openModal: () => null,
    closeModal: () => null
};

export const ModalContext = createContext<IModalContext>(initialValue);

export type ModalContextType = typeof initialValue;
