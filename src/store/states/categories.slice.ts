import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ICategoriesState {
  redirectFrom: string | null;
}

const initialState: ICategoriesState = {
  redirectFrom: null,
};

export const categories = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setRedirectFrom(state, action: PayloadAction<string>) {
      state.redirectFrom = action.payload;
    },
  },
});

export const { setRedirectFrom } = categories.actions;

export default categories.reducer;
