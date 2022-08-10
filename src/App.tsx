import React, {FC} from "react";

// helpers
import {useAppSelector} from "./utils/hooks";

// components
import {Title, Content, Card} from "./components";
import {GridScreen, MainScreen} from "./containers";

// redux
import {getIsActiveGame} from "./redux/selectors/gridSelectors";

// styles
import "./styles/globals.scss";

const App: FC = () => {
    const isActiveGame = useAppSelector((state) => getIsActiveGame(state));

    return (
        <Content>
            <Title>Sudoku</Title>
            <Card>
                {!isActiveGame && <MainScreen />}
                {isActiveGame && <GridScreen />}
            </Card>
        </Content>
    );
};

export default App;
