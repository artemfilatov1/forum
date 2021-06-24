import React from "react";
import {Box} from '@material-ui/core';
import {Pagination} from '@material-ui/lab';
import { sendGetAllPosts } from '../../redux/modules/posts'
import { sendGetAllUsers} from '../../redux/modules/users'
import * as rr from "react-redux";
import * as r from "react";
import {CustomCard} from '../extra/card'

function posts() {
    const posts = rr.useSelector(state => state.posts);
    const users = rr.useSelector(state => state.users);
    const dispatch = rr.useDispatch();
    let map = new Map();

    r.useEffect(() => {
        if (posts.status === 'idle'){
            dispatch(sendGetAllPosts({page: 1}));
        }
    }, [dispatch])

    r.useEffect(() => {
        if (users.status === 'idle'){
            dispatch(sendGetAllUsers())
        }
    },[dispatch])

    users.users.map(i => {
        map.set(i.id, i.profile_picture);
    })

    const handleChange = (event, value) => {
        dispatch(sendGetAllPosts({page: value}));
    }

    return (
        <Box>
            <h1>Posts</h1>
            {posts.posts.length !== 0 && map.size>0 &&
                <Box>
                    {posts.posts.map(i => (
                        <div key={i.post.id}>
                            <CustomCard
                                title={i.post.title}
                                content={i.post.content}
                                to={`/posts/${i.post.id}`}
                                author={map.get(i.post.userId)}
                                userId={i.post.userId}
                                votes={i.votes}
                                answers={i.answers}
                            />
                        </div>
                    ))}
                </Box>
            }
            {posts.posts.length > 0 &&
            <div style={{margin: 20}}>
                <Pagination count={Math.ceil(posts.count/5)} page={posts.page} onChange={handleChange} variant="outlined" color="primary" />
            </div>
            }
        </Box>
    );
}

export default posts;
