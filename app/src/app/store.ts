import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from '@reduxjs/toolkit';
import calculateSlice from '../features/calculate/calculateSlice';
import githubSlice from '../features/github/githubSlice';
import errorMiddleware from '../features/middleware/sayBye';
import sayHelloMiddleware from '../features/middleware/sayHello';

const rootReducer = combineReducers({
  calculate: calculateSlice.reducer,
  github: githubSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(sayHelloMiddleware)
      .concat(errorMiddleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
