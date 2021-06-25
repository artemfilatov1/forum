import React from "react";
import {Avatar, Box} from '@material-ui/core';
import {CustomCard} from '../extra/card';
import {sendGetAllUsers} from '../../redux/modules/users'
import * as rr from "react-redux";
import * as r from "react";
import config from "../../config";
import {Pagination} from "@material-ui/lab";
import {sendGetAllPosts} from "../../redux/modules/posts";

function users() {
    const users = rr.useSelector(state => state.users);
    const dispatch = rr.useDispatch();

    r.useEffect(() => {
        if (users.status === 'idle'){
            dispatch(sendGetAllUsers({page: 1}))
        }
    },[dispatch])

    const handleChange = (event, value) => {
        dispatch(sendGetAllUsers({page: value}));
    }

    return (
        <div style={{width: '100%'}}>
            <h1>Users</h1>
            {users.users && users.users.length !== 0 &&
                <Box display='flex' style={{flexWrap: 'wrap'}}>
                    {users.users.map(i => (
                        <div key={i.id} >
                            <CustomCard title={i.login} content={i.email}
                                to={`/users/${i.id}`}
                                image={`${config.url}/${i.profile_picture}`}
                                width={'240px'}/>
                        </div>
                    ))}
                </Box>
            }
            {users.users.length > 0 &&
            <div style={{margin: 20}}>
                <Pagination count={Math.ceil(users.count/5)} page={users.page} onChange={handleChange} variant="outlined" color="primary" />
            </div>
            }
        </div>
    );
}

export default users;
