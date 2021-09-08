import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import './App.scss'

import MainMenu from './components/MainMenu';
import QuickSet from './components/QuickSet';
import GameSet from './components/GameSet';
import Game from './components/Game';

function App() {
  return (
    <Router>
      <RecoilRoot>
        <Switch>
          <Route path="/quickset">
            <QuickSet />
          </Route>
          <Route path="/gameset">
            <GameSet />
          </Route>
          <Route path="/game">
            <Game />
          </Route>
          <Route path="/">
            <MainMenu />
          </Route>
        </Switch>
      </RecoilRoot>
    </Router>
  );
}

export default App;
