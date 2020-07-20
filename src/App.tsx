import React from 'react';
import './App.css';

import { Results, Search } from './components';

export const App = () => {
  return (
    <div className="gif-browser">
      <Search />
      <Results />
    </div>
  )
}
export default App;