import React from "react";
import {HashRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";
import {ThemeProvider} from "styled-components";

// helpers
import {ModalProvider} from "./utils/contexts";

// components
import App from "./App";

// redux
import {createRoot} from "react-dom/client";
import {Provider} from "react-redux";
import {store, persistor} from "./redux/store/store";

// styles
import {GlobalStyles, theme} from "./styles";

const root = createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <GlobalStyles theme={theme} />
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <HashRouter>
                        <ModalProvider>
                            <App />
                        </ModalProvider>
                    </HashRouter>
                </PersistGate>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);
