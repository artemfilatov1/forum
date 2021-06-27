import React from "react";
import "./App.css"
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import RegisterVerify from "./components/auth/registerVerify";
import Home from "./components/home/home";
import Toolbar from "./components/toolbar/toolbar";
import NotFound from "./components/extra/notfound";
import Users from "./components/users/users";
import Posts from "./components/posts/posts";
import UserAcc from "./components/users/userAcc";
import SpecPost from "./components/posts/specPost";
import Name from "./components/users/name";
import FullName from "./components/users/fullname";
import Password from "./components/users/password";
import Email from "./components/users/email";
import CreatePost from "./components/posts/createPost";
import Categories from "./components/categories/categories";
import SpecCategory from "./components/categories/specCategory";
import CreateCategory from "./components/categories/createCategory";
import CreateUser from "./components/users/createUser";

import {RouteGuest} from "./components/extra/route";
import {RouteClient} from "./components/extra/route";

function App(){
  return (
    <Router>
        <div className="App">
            <Toolbar/>
            <Switch>
                <RouteClient exact path="/createuser" component={CreateUser}/>
                <RouteClient exact path="/createpost" component={CreatePost}/>
                <RouteClient exact path="/createcategory" component={CreateCategory}/>
                <RouteClient exact path="/name" component={Name}/>
                <RouteClient exact path="/fullname" component={FullName}/>
                <RouteClient exact path="/password" component={Password}/>
                <RouteClient exact path="/email" component={Email}/>
                <RouteGuest exact path="/login" component={Login}/>
                <RouteGuest exact path="/register" component={Register}/>
                <RouteGuest exact path="/register/verify-email/:token" component={RegisterVerify}/>
                <Route exact path="/users/:id" component={UserAcc} />
                <Route exact path="/posts/:id" component={SpecPost} />
                <Route exact path="/categories/:id" component={SpecCategory} />
                <Route exact path="/categories" component={Categories} />
                <Route exact path="/users" component={Users} />
                <Route exact path="/posts" component={Posts} />
                <Route exact path="/" component={Home} />
                <Route exact path="/404" component={NotFound} />
                <Redirect to='/404'/>
            </Switch>
        </div>
    </Router>
  );
}

export default App;
