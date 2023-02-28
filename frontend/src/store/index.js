import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
import { authReducer } from "./auth/reducer";
import { storeReducer } from "./store/reducer";

export const createRootReducer = (history) =>
    combineReducers({
        auth: authReducer,
        store: storeReducer,
        router: connectRouter(history),
    });
