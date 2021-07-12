import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import './index.css';

import Home from './pages/Home';
import ViewPoll from './pages/ViewPoll'
import CreatePoll from './pages/CreatePoll'
import MainHome from './pages/MainHome'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="w-full h-screen main-page">
        <div className="decoration"></div>
        <div className="vote-img"></div>
        <div className="h-16 w-full header flex items-center">
            <div className="container mx-auto px-5">
              <Link to='/' className='header-text text-white cursor-pointer hover:text-pink-400 transition duration-150 mr-3'>ElectroVote</Link>
              
            </div>
        </div>

        <Switch>
          <Route exact path="/" component={MainHome} />
          <Route exact path='/polls/' component={Home} />
          <Route path='/polls/create' component={CreatePoll} />
          <Route path='/polls/:poll' component={ViewPoll} />
        </Switch>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
