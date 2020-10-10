import { AnyAction, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Context, createWrapper, HYDRATE, MakeStore } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import rootSaga from './sagas';
import reducers from './reducers';
import { SagaStore, State } from './types';

export const makeStore: MakeStore<State> = (context: Context) => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
    logger,
  ];

  const reducer = (state: State, action: AnyAction) => {
    if (action.type === HYDRATE) {
      return {
        ...state,
        ...action.payload,
      };
    } else {
      return reducers(state, action);
    }
  };

  // 2: Add an extra parameter for applying middleware:
  const store = configureStore({ reducer, middleware });

  // 3: Run your sagas on server
  (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);

  // 4: now return the store:
  return store;
};

export const wrapper = createWrapper<State>(makeStore, { debug: true });
