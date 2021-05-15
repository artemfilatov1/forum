import React from "react";
import {sendDeleteUser, sendGetUserById} from '../../redux/modules/users';
import {sendGetPostById} from '../../redux/modules/posts';
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import {Avatar, Button} from '@material-ui/core';
import config from '../../config';
import * as r from "react";
import {logOut} from "../../redux/modules/auth";
import DeleteIcon from '@material-ui/icons/Delete';
import {UseStyles} from '../../styles/specP';
import {parseToken} from '../../utils/parseToken';

function post() {
    const user = rr.useSelector(state => state.auth);
    const users = rr.useSelector(state => state.users);
    const posts = rr.useSelector(state => state.posts);
    const history = rd.useHistory();
    const dispatch = rr.useDispatch();
    const classes = UseStyles();
    const id = parseInt(rd.useParams().id);
    const decode = parseToken(user.token)

    let clientId = '';
    if (decode) clientId = decode.id;

    r.useEffect(() => {
        if (posts.status === 'idle'){
            dispatch(sendGetPostById(id));
        }
    },[dispatch]);

    const handleDelete = () => {
        dispatch(sendDeleteUser(id));
        if (clientId === id){
            dispatch(logOut());
            history.push('/login');
        } else {
            history.push('/db/users');
        }
    }

    const getDate = () => {
        return 
    }

    return (
        <div>
            {posts.specPost &&
            <div>
                <div className={classes.post}>
                    <div className={classes.title}>
                        <h2>{posts.specPost.title}</h2>
                        <div className={classes.underTitle}> 
                            <p className={classes.underP}>publish date: {posts.specPost.publish_date}</p>
                            <p className={classes.underP}>status: {posts.specPost.status}</p>
                        </div>
                    </div>
                    <div className={classes.content}>
                        {posts.specPost.content}
                    </div>
                </div>
            </div>
            }
        </div>
    )
}

export default post;
