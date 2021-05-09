import auth from "./auth";
import users from "./users";
import posts from "./posts";
import {combineReducers} from "redux";

export default combineReducers({
    auth: auth,
    users: users,
    posts: posts,
})