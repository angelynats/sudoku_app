import React, {FC} from "react";
import useMousetrap from "react-hook-mousetrap";

// components
import {Text, Button} from "src/components";

// styles
import {ConfirmationButtons, ModalWrapper} from "./styles";

interface IProps {
    message?: string;
    onCancel: () => void;
    onConfirm?: () => void;
}

const ConfirmationModal: FC<IProps> = ({message, onCancel, onConfirm}) => {
    useMousetrap("enter", onConfirm);
    useMousetrap("escape", onCancel);
    return (
        <ModalWrapper>
            {message && (
                <Text
                    color="blackLight"
                    size="20px"
                    margin={onConfirm ? "0 0 50px 0" : "10px 0 0 0"}
                >
                    {message}
                </Text>
            )}
            <ConfirmationButtons>
                {onConfirm && (
                    <Button type="button" margin="0 20px 0 0" onClick={onConfirm}>
                        Yes
                    </Button>
                )}
                {onCancel && (
                    <Button type="button" variant="light" onClick={onCancel}>
                        No
                    </Button>
                )}
            </ConfirmationButtons>
        </ModalWrapper>
    );
};

export default ConfirmationModal;
