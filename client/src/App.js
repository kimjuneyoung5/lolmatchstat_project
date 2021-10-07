import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  BrowserRouter,
  Link,
  Switch,
  Route
} from 'react-router-dom';
import SearchForm from './components/SearchForm';
import Display from './views/Display';
import MatchDisplay from './views/MatchDisplay';
import CurrentGameDisplay from './views/CurrentGameDisplay';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path ="/home">
          <SearchForm />
        </Route>
        <Route exact path="/:region/game/info/:summonerId">
          <CurrentGameDisplay />
        </Route>
        <Route exact path="/:region/:name/:matchid">
          <MatchDisplay />
        </Route>
        <Route exact path="/:region/:name">
          <Display />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
