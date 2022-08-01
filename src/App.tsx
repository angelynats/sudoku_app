import React, {FC, useMemo} from "react";

// helpers
import {useAppSelector} from "./utils/hooks";

// components
import {
    Grid,
    Numbers,
    NewGameButton,
    RestartButton,
    ContinueButton,
    Title,
    Content,
    Card,
    OptionsContainer
} from "./components";

// redux
import {getChallengeGrid, getIsActiveGame} from "./redux/selectors/gridSelectors";

// styles
import "./styles/globals.scss";

const App: FC = () => {
    const challengeGrid = useAppSelector((state) => getChallengeGrid(state));
    const isActiveGame = useAppSelector((state) => getIsActiveGame(state));

    const isShowGrid = useMemo(() => isActiveGame && challengeGrid, [challengeGrid, isActiveGame]);
    const isShowContinueButton = useMemo(
        () => !isActiveGame && challengeGrid,
        [challengeGrid, isActiveGame]
    );

    return (
        <Content>
            <Title>Sudoku</Title>
            <Card>
                {isShowGrid && <Grid />}
                <OptionsContainer>
                    {isShowGrid && <RestartButton />}
                    {isShowContinueButton && <ContinueButton />}
                    <NewGameButton />
                    {isShowGrid && <Numbers />}
                </OptionsContainer>
            </Card>
        </Content>
    );
};

export default App;
