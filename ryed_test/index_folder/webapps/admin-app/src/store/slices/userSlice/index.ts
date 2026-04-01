import { authEndPoints } from '@/api/authEndpoints';
import { User } from '@/models/auth/Auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// import { userEndPoints } from 'api/userEndPoints/userEndPoints';

export interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    signIn: (state, action) => {
      state.user = action.payload;
    },
    signOut: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authEndPoints.endpoints.signIn.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(
      authEndPoints.endpoints.getCurrentUser.matchFulfilled,
      (state, action) => {
        state.user = action.payload;
      }
    );
  },
});

export const { signIn, signOut, setUser } = userSlice.actions;

export default userSlice.reducer;
