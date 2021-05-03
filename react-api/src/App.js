import React from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Register from "./components/register";
import Home from "./components/home";
import Toolbar from "./components/toolbar";
import Login from "./components/login";

function App() {
  return (
    <Router>
        <div className="App">
            <Toolbar />
            <Switch>
                <Route path="/api/auth/login">
                    <Login />
                </Route>
                <Route path="/api/auth/register">
                    <Register />
                </Route>
                <Route path="/">
                    <Home />
                </Route>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
