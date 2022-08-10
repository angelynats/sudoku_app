import React, {FC} from "react";

// helpers
import {useAppSelector} from "src/utils/hooks";

// components
import {NewGameButton, ContinueButton, OptionsContainer} from "src/components";

// redux
import {getChallengeGrid, getGridDifficulty} from "src/redux/selectors/gridSelectors";

const MainScreen: FC = () => {
    const challengeGrid = useAppSelector((state) => getChallengeGrid(state));
    const gridDifficulty = useAppSelector((state) => getGridDifficulty(state));

    return (
        <OptionsContainer>
            {challengeGrid && <ContinueButton difficulty={gridDifficulty} />}
            <NewGameButton />
        </OptionsContainer>
    );
};

export default MainScreen;
