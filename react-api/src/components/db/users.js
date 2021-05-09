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
        dispatch(sendGetAllUsers())
    },[])

    console.log(users);

    return (
        <div>
            <h1>Users</h1>
            {users.users &&
                <Box display='flex' style={{flexWrap: 'wrap', margin: 'auto'}}>
                    {users.users.map(i => (
                        <div key={i.id}>
                            {CustomCard(i.login, i.email, `/db/users/${i.id}`,
                                `${config.url}/${i.profile_picture}`,
                                '240px')}
                        </div>
                    ))}
                </Box>
            }
        </div>
    );
}

export default users;
