import React from "react";
import { Box } from '@material-ui/core';
import {CustomCard} from '../extra/card'


function home() {
    return (
        <Box display='flex'>
            <CustomCard title={'users'} 
                content={'U can watch or find some people'}
                to={`/users`}/>
            <CustomCard title={'posts'} 
                content={'U can watch or find some post'}
                to={`/posts`}/>
            <CustomCard title={'categories'}
                 content={'U can watch or find some category'}
                 to={`/categories`}/>
        </Box>
    );

}

export default home;