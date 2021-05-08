import React from "react";
import "./App.css"
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import * as rr from "react-redux";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import RegisterVerify from "./components/auth/registerVerify";
import Home from "./components/home/home";
import Toolbar from "./components/toolbar/toolbar";
import NotFound from "./components/extra/notfound";
import Account from "./components/account/account";

import {RouteClient, RouteGuest} from "./components/extra/route";

function App(){
  const user = rr.useSelector(state => state.auth);

  return (
    <Router>
        <div className="App">
            {<Toolbar />}
            <Switch>
                <RouteGuest path="/login" component={Login}/>
                <RouteGuest path="/register" component={Register}/>
                <RouteGuest path="/register/verify-email/:token" component={RegisterVerify}/>
                <RouteClient path="/account" component={Account}/>
                <Route exact path="/" component={Home} />
                <Route path="/404" component={NotFound} />
            </Switch>
        </div>
    </Router>
  );
}

export default App;
