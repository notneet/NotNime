"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import media_id from "./worker/media.worker";

const rootReducer = combineReducers({
  media_id,
});

export const store = configureStore({
  reducer: rootReducer,
});
