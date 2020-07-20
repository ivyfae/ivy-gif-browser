import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { GifState, getTrending, searchGifs } from '../../reducers/gif-reducer';

import './search.css';

export const Search = connect(
  (state: GifState) => ({
    loading: state.loading,
    terms: state.terms
  }), {
  searchGifs, getTrending
}
)((props: any, state: any) => {

  const [searchText, setSearchText] = useState(null);
  let params: { terms: string } = useParams();

  const search = () => {
    if (searchText && searchText.trim()) props.searchGifs(searchText.trim());
  }

  const trending = () => {
    props.getTrending();
  }

  const updateSearchText = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target?.value);
    if (e.target?.value === '') {
      trending();
    }
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      search();
    }
  }

  useEffect(() => {
    if (params.terms) {
      props.searchGifs(params.terms);
    } else {
      props.getTrending();
    }
  }, []);

  return (
    <div className={`search header ${(props.loading ? 'loading' : '')}`}>
      <div className="searchBox">
        <input type="text" disabled={props.loading} placeholder="Search" onChange={updateSearchText} onKeyPress={handleKeyPress} />
        <button type="button" className={(props.loading ? 'loading' : '')} disabled={props.loading || !searchText} onClick={search}>Search</button>
      </div>
      <div className="status">
        {(props.loading ? 'loading...' : '')}
      </div>
    </div>
  )
});
