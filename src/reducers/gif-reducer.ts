import { Dispatch } from 'redux';
import { GiphyGif } from '../models';
import { GiphyDetailsResponse, GiphyResponse } from '../models';
import { Settings } from '../settings';

export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';
export const RECEIVE_DETAILS = 'RECEIVE_DETAILS';
export const SEARCH = 'SEARCH';
export const TRENDING = 'TRENDING';
export const LOAD_NEXT_PAGE = 'LOAD_NEXT_PAGE';
export const REQUEST = 'REQUEST';
export const DETAILS = 'DETAILS';

export interface GifState {
  id: string;
  loading: boolean;
  endpoint: string;
  terms: string;
  offset: number;
  count: number;
  totalCount: number;
  gifs: Array<GiphyGif>
}

export interface GifAction {
  type: string;
  id?: string;
  terms?: string;
  endpoint?: string;
  gifs?: Array<GiphyGif>;
  offset?: number;
  count?: number;
  totalCount?: number;
}

export function search(terms: string) {
  return {
    type: SEARCH,
    terms: terms
  } as GifAction;
}

export function trending() {
  return {
    type: TRENDING
  } as GifAction;
}

export function details(id: string) {
  return {
    type: DETAILS,
    id
  } as GifAction;
}

export function request(endpoint: string, terms: string, offset: number) {
  return {
    type: REQUEST,
    endpoint: endpoint,
    terms: terms,
    offset: offset
  } as GifAction;
}

export function receiveResults(response: GiphyResponse) {
  return {
    type: RECEIVE_RESULTS,
    gifs: response.data,
    offset: response.pagination.offset,
    count: response.pagination.count,
    totalCount: response.pagination.total_count
  } as GifAction;
}

export function receiveDetails(response: GiphyDetailsResponse) {
  return {
    type: RECEIVE_DETAILS,
    gifs: [response.data]
  } as GifAction;
}

export function getTrending(terms: string) {
  return (dispatch: Dispatch) => {
    const url = buildRequestUrl('trending', { offset: 0 });
    dispatch(trending());
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveResults(json)));
  }
}

export function searchGifs(terms: string) {
  return (dispatch: Dispatch) => {
    const url = buildRequestUrl('search', { q: formatTerms(terms), offset: 0 });
    dispatch(search(terms));
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveResults(json)));
  }
}

export function getDetails(id: string) {
  return (dispatch: Dispatch, getState: Function) => {
    const url = `${Settings.giphy.url}${id}?api_key=${Settings.giphy.apiKey}`;
    dispatch(details(id));
    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveDetails(json)));
  }
}

export function loadNextPage() {
  return (dispatch: Dispatch, getState: Function) => {
    const state: GifState = getState();
    if (!state.loading) {
      const nextOffset = state.offset + state.count;
      const url = buildRequestUrl(state.endpoint, { q: state.terms, offset: nextOffset })
      dispatch(request(state.endpoint, state.terms, nextOffset));
      return fetch(url)
        .then(response => response.json())
        .then(json => dispatch(receiveResults(json)));
    } else {
      return new Promise<GifAction>((resolve, reject) => null);
    }
  }
}

function buildRequestUrl(endpoint: string, parameters: any) {
  const base = Settings.giphy.url;
  const requestUrl = new URL(endpoint, base);
  const requestParams = new URLSearchParams();
  requestParams.append('api_key', Settings.giphy.apiKey);
  requestParams.append('limit', Settings.giphy.limit.toString());
  for (const p in parameters) {
    if (parameters[p] !== null && parameters[p] !== undefined) {
      requestParams.append(p, encodeURIComponent(parameters[p]));
    }
  }
  requestUrl.search = requestParams.toString();
  return requestUrl.toString();
}

function formatTerms(terms: string): string {
  if (!terms) return '';
  return terms.trim().replace(/\s/g, '-',);
}

export function gifReducer(state: GifState, action: GifAction): GifState {
  switch (action.type) {
    case DETAILS:
      return {
        id: action.id,
        loading: true,
        endpoint: null,
        terms: null,
        gifs: [],
        count: 0,
        offset: 0,
        totalCount: 0
      }
    case SEARCH:
      return {
        ...state,
        terms: action.terms,
        endpoint: 'search',
        loading: true,
        gifs: [],
        offset: 0,
        count: 0,
        totalCount: 0
      }
    case TRENDING:
      return {
        ...state,
        terms: null,
        endpoint: 'trending',
        loading: true,
        gifs: [],
        offset: 0,
        count: 0,
        totalCount: 0
      }
    case REQUEST:
      return {
        ...state,
        terms: action.terms,
        endpoint: action.endpoint,
        loading: true
      }
    case RECEIVE_RESULTS:
      return {
        ...state,
        loading: false,
        gifs: (state.gifs ?? []).concat(action.gifs),
        offset: action.offset,
        count: action.count,
        totalCount: action.totalCount
      }
    case RECEIVE_DETAILS:
      return {
        ...state,
        loading: false,
        gifs: action.gifs,
        offset: action.offset,
        count: action.count,
        totalCount: action.totalCount
      }
    default:
      return state;
  }
}
