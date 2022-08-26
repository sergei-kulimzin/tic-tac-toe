import { configureStore } from '@reduxjs/toolkit';

import currenGameReducer from './slices/currentGameSlice';

export const store = configureStore({
  reducer: {
    currentGame: currenGameReducer,
  },
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
