import {combineReducers} from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import {persistReducer} from "redux-persist";

import {gridReducer} from "../slices/gridReducer";

const rootPersistConfig = {
    key: "root",
    storage,
    version: 1,
    whitelist: ["grid"]
};

const gridPersistConfig = {
    key: "grid",
    storage,
    version: 1,
    blacklist: ["isActiveGame", "selectedBlock"]
};

const rootReducer = combineReducers({
    gridReducer: persistReducer(gridPersistConfig, gridReducer)
});
const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

export default persistedReducer;
