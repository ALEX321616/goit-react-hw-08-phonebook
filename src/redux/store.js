import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { UserApi } from 'ApiService/UserApi';
import authSlice from './auth-slice';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token'],
};

const reducer = combineReducers({
  [UserApi.reducerPath]: UserApi.reducer,
  auth: persistReducer(authPersistConfig, authSlice),
});

const store = configureStore({
  reducer: reducer,

  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    UserApi.middleware,
  ],
  devTools: process.env.NODE_ENV === 'development',
});

export const persistor = persistStore(store);
export default store;
