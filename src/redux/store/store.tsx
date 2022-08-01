import {Store} from "redux";
import {$CombinedState, configureStore} from "@reduxjs/toolkit";
import {persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist";

import persistedReducer from "../reducer/reducer";

export const store: Store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            }
        })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof persistedReducer> & {
    readonly [$CombinedState]?: undefined;
};
export type AppDispatch = typeof store.dispatch;
