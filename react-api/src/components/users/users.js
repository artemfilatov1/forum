import React from "react";
import {Avatar, Box} from '@material-ui/core';
import {CustomCard} from '../extra/card';
import {sendGetAllUsers} from '../../redux/modules/users'
import * as rr from "react-redux";
import * as r from "react";
import config from "../../config";

function users() {
    const users = rr.useSelector(state => state.users);
    const dispatch = rr.useDispatch();
    r.useEffect(() => {
        if (users.status === 'idle'){
            dispatch(sendGetAllUsers())
        }
    },[dispatch])

    return (
        <div style={{width: '100%'}}>
            <h1>Users</h1>
            {users.users &&
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
        </div>
    );
}

export default users;
