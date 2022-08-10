import React, {FC} from "react";

// components
import {Grid, Numbers, NewGameButton, RestartButton, OptionsContainer} from "src/components";

const GridScreen: FC = () => {
    return (
        <>
            <Grid />
            <OptionsContainer>
                <RestartButton />
                <NewGameButton />
                <Numbers />
            </OptionsContainer>
        </>
    );
};

export default GridScreen;
