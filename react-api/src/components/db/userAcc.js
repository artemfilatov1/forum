import React, {useEffect} from "react";
import {sendDeleteUser, sendGetUserById} from '../../redux/modules/users';
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Avatar, Button} from '@material-ui/core';
import config from '../../config';
import * as r from "react";
import {sendLogOut} from "../../redux/modules/auth";
import DeleteIcon from '@material-ui/icons/Delete';

const UseStyles = makeStyles({
    personalInformation: {
        width: '50%',
        margin: 'auto',
        marginTop: 40,
        border: '1px solid gray',
        borderRadius: 4,
        padding: 10,
        textAlign: 'left',
    },
    base: {
        width: '100%',
        textTransform: 'none',
        marginBottom: '15px',
        display: 'flex'
    },
    type: {
        flex: 1,
        padding: 15,
        textAlign: 'left',
    },
    value: {
        flex: 3,
        textAlign: 'left',
        font: '1.2em "Fira Sans", sans-serif',
    },
    img: {
        boxShadow: '0 0 0 0px black, 0 0 4px #333',
    }
});

function account() {
    const user = rr.useSelector(state => state.auth);
    const users = rr.useSelector(state => state.users);
    const history = rd.useHistory();
    const dispatch = rr.useDispatch();
    const classes = UseStyles();
    const id = parseInt(rd.useParams().id);

    r.useEffect(() => {
        dispatch(sendGetUserById(id));
    },[dispatch]);

    const Logout = () => {
        dispatch(sendLogOut());
        history.push('/login');
    }

    const Delete = () => {
        dispatch(sendDeleteUser(id));
        if (user.user.id === id){
            dispatch(sendLogOut());
            history.push('/login');
        } else {
            history.push('/db/users');
        }
    }

    return (
        <div>
            {users.specUser &&
            <div className={classes.personalInformation}>
                <h2>Personal information</h2>
                <Button className={classes.base} variant='outlined'>
                    <div className={classes.type}>Image</div>
                    <Avatar alt="Remy Sharp" src={`${config.url}/${users.specUser.profile_picture}`} className={classes.img}/>
                </Button>
                <Button className={classes.base} variant='outlined'>
                    <div className={classes.type}>Login</div>
                    <div className={classes.value}>{users.specUser.login}</div>
                </Button>
                <Button className={classes.base} variant='outlined'>
                    <div className={classes.type}>Full name</div>
                    <div className={classes.value}>{users.specUser.full_name}</div>
                </Button>
                <Button className={classes.base} variant='outlined'>
                    <div className={classes.type}>email</div>
                    <div className={classes.value}>{users.specUser.email}</div>
                </Button>
                <Button className={classes.base} variant='outlined'>
                    <div className={classes.type}>password</div>
                    <div className={classes.value}>********</div>
                </Button>
                {(user.user.id === id) &&
                    <Button style={{marginRight:20}} onClick={Logout} variant='outlined' color='secondary'>
                        LOG OUT
                    </Button>
                }
                {(user.user.role === 'admin' || user.user.id === id) &&
                    <Button onClick={Delete} variant='contained' color='secondary'>
                        <DeleteIcon fontSize='small'/>
                        delete
                    </Button>
                }
            </div>
            }
        </div>
    )
}

export default account;
