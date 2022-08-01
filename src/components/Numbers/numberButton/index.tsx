import React, {FC, useMemo} from "react";

// helpers
import {isNumberAvailable} from "src/utils/helpers";
import {useAppSelector} from "src/utils/hooks";
import {N} from "src/utils/interfaces";

// redux
import {getWorkingGrid} from "src/redux/selectors/gridSelectors";

// styles
import {ContainerNumber} from "../styles";
import {ButtonCommon} from "src/components/styles";

interface IProps {
    value: N;
    onSelectNumber: (value: N) => void;
}

const NumberButton: FC<IProps> = ({value, onSelectNumber}) => {
    const workingGrid = useAppSelector((state) => getWorkingGrid(state));

    const isVisible = useMemo(() => isNumberAvailable(workingGrid, value), [workingGrid, value]);

    return (
        <ContainerNumber>
            <ButtonCommon
                disabled={!isVisible}
                onClick={() => onSelectNumber(value)}
                fontSize="32px"
                color={isVisible ? "blackLight" : "greyLight"}
            >
                {value}
            </ButtonCommon>
        </ContainerNumber>
    );
};

export default NumberButton;
