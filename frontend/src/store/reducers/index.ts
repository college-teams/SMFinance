import { combineReducers } from "@reduxjs/toolkit";
import { UserReducer } from "../slices/user";

export const rootReducer = combineReducers({
  appState: UserReducer,
});
