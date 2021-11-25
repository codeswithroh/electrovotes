import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import "./index.scss";

import Home from "./pages/Home";
import ViewPoll from "./pages/ViewPoll";
import CreatePoll from "./pages/CreatePoll";
import MainHome from "./pages/MainHome";
import ResultChart from "./pages/ResultChart";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="h-16 w-full header flex items-center">
        <div className="container mx-auto px-5">
          <Link to="/" className="header-text text-white cursor-pointer mr-3">
            ElectroVote
          </Link>
        </div>
      </div>

      <Switch>
        <Route exact path="/" component={MainHome} />
        <Route exact path="/polls/" component={Home} />
        <Route path="/polls/create" component={CreatePoll} />
        <Route exact path="/polls/:pollId" component={ViewPoll} />
        <Route path="/polls/:pollId/result" component={ResultChart} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
