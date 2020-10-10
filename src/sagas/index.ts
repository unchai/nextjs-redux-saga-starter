import { all, call } from 'redux-saga/effects';
import timeSaga from './timeSaga';
import githubSaga from './githubSaga';

export default function* rootSaga() {
  yield all([
    call(timeSaga),
    call(githubSaga),
  ]);
}
