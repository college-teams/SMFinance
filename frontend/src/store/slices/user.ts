import { AdminDetails } from "@/types/admin";
import { createSlice } from "@reduxjs/toolkit";

interface AppState {
  user?: AdminDetails | null;
}

const initialState: AppState = {
  user: null,
};

const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUserDetails: (state, action) => {
      state.user = action.payload;
    },
    clearUserDetails: (state) => {
      state.user = null;
    },
  },
});

export const UserReducer = UsersSlice.reducer;
export const { setCurrentUserDetails, clearUserDetails } = UsersSlice.actions;
