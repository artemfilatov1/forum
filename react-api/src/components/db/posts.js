import React from "react";
import {Box, Button} from '@material-ui/core';
import { sendGetAllPosts } from '../../redux/modules/posts'
import * as rr from "react-redux";
import * as r from "react";
import {CustomCard} from '../extra/card'


function posts() {
    const posts = rr.useSelector(state => state.posts);
    const dispatch = rr.useDispatch();

    r.useEffect(() => {
        dispatch(sendGetAllPosts())
    }, [])

    console.log(posts.posts)

    return ( 
        <Box>
            <h1>Posts</h1>
            {posts.posts &&
                <Box>
                    {posts.posts.map(i => (
                        <div key={i.id}>
                            {CustomCard(i.title, i.content, `/db/posts/${i.id}`)}
                        </div>
                    ))}
                </Box>
            }
        </Box>
    );
}

export default posts;
