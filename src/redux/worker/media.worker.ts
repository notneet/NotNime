"use client";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = 1;

export const mediaWorkerSlice = createSlice({
  name: "media_id",
  initialState,
  reducers: {
    setMedia(state: number, action: PayloadAction<number>) {
      return action.payload || state;
    },
  },
});

export const { setMedia } = mediaWorkerSlice.actions;

export const selectMediaId = (state: Record<string, number>) => state?.media_id;
export const selectData = (state: Record<string, number>) => state?.media_id;

export default mediaWorkerSlice.reducer;
