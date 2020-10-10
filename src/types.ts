import { Store } from 'redux';
import { Task } from 'redux-saga';

export interface TimeResponse {
  currentTime: number;
}

export interface TimeState {
  loading: boolean,
  currentTime: number;
}

export interface GithubSearchResponse {
  totalCount: number;
  items: any[];
}

export interface GithubSearchState {
  loading: boolean,
  githubSearchResponse: GithubSearchResponse
}

export interface State {
  time: TimeState;
  github: GithubSearchState;
}

export interface SagaStore extends Store {
  sagaTask?: Task;
}
