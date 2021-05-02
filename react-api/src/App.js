import React from "react";
import './App.css';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Register from "./components/register";

function App() {
  return (
    <Router>
        <div className="App">
            <Switch>
                <Route path="/api/auth/register">
                    <Register />
                </Route>
                <Route path="/">
                    <h1>Home</h1>
                </Route>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
