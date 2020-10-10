import React, { ChangeEvent, useEffect, useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { END } from 'redux-saga';
import { useEventCallback } from 'rxjs-hooks';
import { debounceTime, map, tap } from 'rxjs/operators';
import { useDispatch, useSelector } from 'react-redux';
import timeSlice from '../reducers/timeSlice';
import githubSlice from '../reducers/githubSlice';
import { wrapper } from '../store';
import { GithubSearchState, SagaStore, State, TimeState } from '../types';

interface HomeProps {
}

const Home: NextPage<HomeProps> = () => {
  const { loading, githubSearchResponse } = useSelector<State, GithubSearchState>(state => state.github);
  const { currentTime } = useSelector<State, TimeState>(state => state.time);
  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState<string>('redux-saga');

  const [onKeywordChange, text] = useEventCallback<ChangeEvent<HTMLInputElement>, string>(event$ =>
    event$.pipe(
      map(e => e.target.value),
      tap(value => setKeyword(value)),
      debounceTime(300),
    ), keyword,
  );

  useEffect(() => {
    dispatch(githubSlice.actions.load(text));
  }, [text]);

  return (
    <div>
      <h1>TimeMiiliseconds via SSR : {currentTime}</h1>
      <b>Github search</b> <input type='input' value={keyword} onChange={onKeywordChange} />
      {loading ? (<p>loading...</p>) : githubSearchResponse?.items.map(v => <p key={v.id}>{v.name}</p>)}
    </div>
  );
};

export const getServerSideProps: GetStaticProps = wrapper.getServerSideProps(
  async ({ store, req, res, ...etc }) => {
    store.dispatch(timeSlice.actions.load());
    store.dispatch(END);

    await (store as SagaStore).sagaTask.toPromise();
  },
);

export default Home;
