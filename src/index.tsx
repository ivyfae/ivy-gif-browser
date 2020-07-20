import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, NavLink, Route } from "react-router-dom";
import { applyMiddleware, createStore, Store } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import * as serviceWorker from './serviceWorker';
import { gifReducer } from './reducers/gif-reducer';
import { GifDetails, Results, Search } from './components';

import './index.css';

const store: Store = createStore(gifReducer, {
  count: 0,
  endpoint: 'trending',
  gifs: null,
  id: null,
  loading: false,
  offset: 0,
  terms: null,
  totalCount: 0,
}, applyMiddleware(thunk));

export default function Root() {
  return (
    <Router>
      <Route path="/search/:terms">
        <Search />
        <Results />
      </Route>
      <Route path="/details/:id">
        <GifDetails />
      </Route>
      <Route exact={true} path="/">
        <Search />
        <Results />
      </Route>
    </Router>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
