import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { gameReducer } from '../features/game/gameSlice';
import { gameApi } from './services/game';
import { authApi } from './services/auth';
import { pastryApi } from './services/pastries';

export const store = configureStore({
  reducer: {
    [gameApi.reducerPath]: gameApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [pastryApi.reducerPath]: pastryApi.reducer,
    game: gameReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(gameApi.middleware, authApi.middleware, pastryApi.middleware),
});

setupListeners(store.dispatch);
