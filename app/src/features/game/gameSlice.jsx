import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    win: null,
    values: new Array(5).fill(6),
    rolls: 0,
    gameState: 'start',
  },
  reducers: {
    startGame: (state) => {
      state.gameState = 'playing';
    },
    rollDice: (state) => {
      state.values = state.values.map(() => Math.floor(Math.random() * 6) + 1);
      state.rolls += 1;
    },
    endGame: (state) => {
      state.gameState = 'end';
    },
    setWin: (state, action) => {
      state.win = action.payload;
    },
  },
});

export const { startGame, rollDice, endGame, setWin } = gameSlice.actions;
export const gameReducer = gameSlice.reducer;
