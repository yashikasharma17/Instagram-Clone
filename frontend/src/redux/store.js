import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authslice.js";
import postslice from "./postslice.js";
import chatpageslice from "./chatpage.js";
import socketioslice from "./socketio.js";
import rtnslice from "./rtnslice.js";

import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";

import createWebStorage from "redux-persist/es/storage/createWebStorage";


const storage = createWebStorage("local");

const persistConfig = {
    key: "root",
    version: 1,
    storage,
};

const rootReducer = combineReducers({
    posts:postslice,
    auth: authSlice,
    chat:chatpageslice,
    socketio:socketioslice,
    real:rtnslice
});

const persistedReducer = persistReducer(
    persistConfig,
    rootReducer
);

export const store = configureStore({
    reducer: persistedReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }),
});

export const persistor = persistStore(store);