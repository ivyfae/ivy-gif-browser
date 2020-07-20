import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { GifState, loadNextPage } from '../../reducers/gif-reducer';
import { GiphyGif } from '../../models';
import { GifResult } from "../gif-result/gif-result";

import './results.css';

export const Results = connect(
  (state: GifState) => ({
    loading: state.loading,
    gifs: state.gifs,
    terms: state.terms,
    offset: state.offset,
    count: state.count,
    totalCount: state.totalCount
  }))((props: any, state: any) => {
    const [waitForLoad, setWaitForLoad] = useState(props.loading);
    const dispatch = useDispatch();

    window.addEventListener('scroll', (ev: Event) => {
      if (!waitForLoad) {
        if (document.documentElement.scrollTop + window.outerHeight >= document.documentElement.offsetHeight) {
          setWaitForLoad(true);
          dispatch(loadNextPage());
        }
      }
    })

    return (
      <div className="results">
        <div className={`summary ${(props.terms && !(props.totalCount)) ? 'empty' : ''}`}>
          {(props.terms && !props.loading)
            ? (
              (props.totalCount)
                ? `Results 1-${props.gifs?.length ?? '?'} of ${props.totalCount} for '${props.terms}'`
                : `The search for '${props.terms}' returned no results.`
            ) : (
              ''
            )
          }
        </div>

        <div className="list">
          {props.gifs?.map((g: GiphyGif, i: number) => {
            return (
              <GifResult key={i} gif={g} />
            );
          })}
        </div>
        <div className="infinite-scroll">
          {(props.loading && props.totalCount) ? <div className="loading">Loading...</div> : ''}
        </div>
      </div>
    )
  });
