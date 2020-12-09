import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Tetris from './components/tetris/Tetris';


ReactDOM.render(
  <React.StrictMode>
    <div className="app-root">
      <Router>
        <Switch>
          <Route exact path='/'><App /></Route>
          <Route path='/tetris'><Tetris/></Route>
        </Switch>
      </Router>
    </div>
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
