import { all, call, put, takeLatest } from 'redux-saga/effects';
import fetch from 'isomorphic-unfetch';
import camelcaseKeys from 'camelcase-keys';
import githubSlice from '../reducers/githubSlice';
import { GithubSearchResponse } from '../types';

const { load, success, failure } = githubSlice.actions;

function search(keyword: string): Promise<Response> {
  return fetch(`http://localhost:3000/api/github/search?keyword=${keyword}`)
    .then(r => r.json().then(value => camelcaseKeys(value, { deep: true })));
}

function* loadSearch({ payload }: ReturnType<typeof load>) {
  try {
    const result: GithubSearchResponse = yield call(search, payload);
    yield put(success(result));
  } catch (e) {
    console.error(e);
    yield put(failure());
  }
}

export default function* githubSaga() {
  yield all([
    takeLatest(load, loadSearch),
  ]);
}
