import { createSlice, Draft, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit';
import { TimeResponse, TimeState } from '../types';

interface TimeReducer extends SliceCaseReducers<TimeState> {
  load(state: Draft<TimeState>),

  success(state: Draft<TimeState>, action: PayloadAction<TimeResponse>),

  failure(state: Draft<TimeState>)
}

const timeSlice = createSlice<TimeState, TimeReducer>({
  name: 'time',
  initialState: { loading: false, currentTime: 0 },
  reducers: {
    load: (state) => {
      state.loading = true;
    },
    success: (state, { payload }: PayloadAction<TimeResponse>) => {
      state.loading = false;
      state.currentTime = payload.currentTime;
    },
    failure: (state) => {
      state.loading = false;
      state.currentTime = 0;
    },
  },
});

export default timeSlice;
