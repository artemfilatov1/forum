import React from "react";
import { Box } from '@material-ui/core';
import {CustomCard} from '../extra/card'


function home() {
    return (
        <Box display='flex'>
            {CustomCard('Users', 'U can wach or find some people', '/db/users')}
            {CustomCard('Posts', 'U can wach or find some post', '/db/posts')}
        </Box>
    );

}

export default home;