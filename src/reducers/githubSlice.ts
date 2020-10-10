import { createSlice, Draft, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { GithubSearchResponse, GithubSearchState } from '../types';

interface GithubSearchReducer extends SliceCaseReducers<GithubSearchState> {
  load(state: Draft<GithubSearchState>, action: PayloadAction<string>),

  success(state: Draft<GithubSearchState>, action: PayloadAction<GithubSearchResponse>),

  failure(state: Draft<GithubSearchState>)
}

const githubSlice = createSlice<GithubSearchState, GithubSearchReducer>({
  name: 'github',
  initialState: { loading: false, githubSearchResponse: null },
  reducers: {
    load: (state, { payload: keyword }: PayloadAction<string>) => {
      state.loading = true;
    },
    success: (state, { payload: githubSearchResponse }: PayloadAction<GithubSearchResponse>) => {
      state.loading = false;
      state.githubSearchResponse = githubSearchResponse;
    },
    failure: (state) => {
      state.loading = false;
      state.githubSearchResponse = undefined;
    },
  },
});

export default githubSlice;
