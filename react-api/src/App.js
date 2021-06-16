import React from "react";
import "./App.css"
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import RegisterVerify from "./components/auth/registerVerify";
import Home from "./components/home/home";
import Toolbar from "./components/toolbar/toolbar";
import NotFound from "./components/extra/notfound";
import Users from "./components/db/users";
import Posts from "./components/db/posts";
import UserAcc from "./components/db/userAcc";
import specPost from "./components/db/specPost";
import Name from "./components/db/name";
import FullName from "./components/db/fullname";
import Password from "./components/db/password";
import Email from "./components/db/email";
import CreatePost from "./components/db/createPost";

import {RouteGuest} from "./components/extra/route";
import {RouteClient} from "./components/extra/route";

function App(){
  return (
    <Router>
        <div className="App">
            <Toolbar/>
            <Switch>
                <RouteClient exact path="/createpost" component={CreatePost}/>
                <RouteClient exact path="/name" component={Name}/>
                <RouteClient exact path="/fullname" component={FullName}/>
                <RouteClient exact path="/password" component={Password}/>
                <RouteClient exact path="/email" component={Email}/>
                <RouteGuest exact path="/login" component={Login}/>
                <RouteGuest exact path="/register" component={Register}/>
                <RouteGuest exact path="/register/verify-email/:token" component={RegisterVerify}/>
                <Route exact path="/db/users/:id" component={UserAcc} />
                <Route exact path="/db/posts/:id" component={specPost} />
                <Route exact path="/db/users" component={Users} />
                <Route exact path="/db/posts" component={Posts} />
                <Route exact path="/" component={Home} />
                <Route exact path="/404" component={NotFound} />
                <Redirect to='/404'/>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
