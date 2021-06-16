import users from "./users";
import posts from "./posts";
import {combineReducers} from "redux";

// export default {
//     users: users,
//     posts: posts,
// }

export default combineReducers({
    users: users,
    posts: posts,
})