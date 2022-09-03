import { configureStore } from '@reduxjs/toolkit';

import gameReducer from './slices/gameSlice';

export const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
