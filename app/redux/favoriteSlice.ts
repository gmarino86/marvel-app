import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "../interfaces/caracter.interface";

interface FavoriteState {
  value: Character[];
  showFavorites: boolean;
}

const initialState: FavoriteState = {
  value: [],
  showFavorites: false,
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Character>) => {
      state.value.push(action.payload);
    },
    remove: (state, action: PayloadAction<Character>) => {
      state.value = state.value.filter((char) => char.id !== action.payload.id);
    },
    toggleShowFavorites: (state) => {
      state.showFavorites = !state.showFavorites;
    },
  },
});

export const { add, remove, toggleShowFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
