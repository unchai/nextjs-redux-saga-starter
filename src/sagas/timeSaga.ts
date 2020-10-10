import { all, call, put, takeLatest } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import timeSlice from '../reducers/timeSlice';
import { TimeResponse } from '../types';

const { load, success, failure } = timeSlice.actions;

function fetchTime(): Promise<Response> {
  return fetch(`http://localhost:3000/api/time`).then(r => r.json());
}

function* loadFetchTime() {
  try {
    const result: TimeResponse = yield call(fetchTime);
    yield put(success(result));
  } catch (e) {
    console.error(e);
    yield put(failure());
  }
}

export default function* githubSaga() {
  yield all([
    takeLatest(load, loadFetchTime),
  ]);
}
