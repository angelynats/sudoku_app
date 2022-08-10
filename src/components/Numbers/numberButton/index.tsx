import React, {FC} from "react";

// helpers
import {N} from "src/utils/interfaces";

// styles
import {ContainerNumber} from "../styles";
import {ButtonCommon} from "src/components/styles";

interface IProps {
    value: N;
    isVisible: boolean;
    onClickNumber: (value: N) => void;
}

const NumberButton: FC<IProps> = ({value, isVisible, onClickNumber}) => {
    return (
        <ContainerNumber>
            <ButtonCommon
                disabled={!isVisible}
                onClick={() => onClickNumber(value)}
                fontSize="32px"
                color={isVisible ? "blackLight" : "greyLight"}
            >
                {value}
            </ButtonCommon>
        </ContainerNumber>
    );
};

export default React.memo(NumberButton);
