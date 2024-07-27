import { createSlice } from "@reduxjs/toolkit";

export interface UserState {
  currentUser: null | Record<string, string>;
}

const initialState: UserState = {
  currentUser: null
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    }
  }
});

export const { setCurrentUser } = userSlice.actions;

export default userSlice.reducer;
