import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "../reducerAndMiddleware";

export const store = configureStore({
    reducer: reducer,
    devTools: true
})