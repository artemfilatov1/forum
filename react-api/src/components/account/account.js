import React from "react";
import {sendLogOut} from '../../redux/modules/auth';
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import {Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import {Button, ButtonBase} from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

const UseStyles = makeStyles({
    personalInformation: {
        width: '50%',
        margin: 'auto',
        marginTop: 40,
        border: '1px solid black',
        borderRadius: 4,
        padding: 10,
        textAlign: 'left',
    },
    base: {
        padding: 20,
        width: '100%',
        textTransform: 'none',
        marginBottom: '15px',
    },
    type: {
        flexGrow: 1,
        textAlign: 'left',
        width: 100
    },
    value: {
        flexGrow: 7,
        textAlign: 'left',
        font: '1.2em "Fira Sans", sans-serif',
    }
});

function account() {
    const user = rr.useSelector(state => state.auth);
    const history = rd.useHistory();
    const dispatch = rr.useDispatch();
    const classes = UseStyles();

    const logout = () => {
        dispatch(sendLogOut());
        history.push('/login');
    }

    return (
        <div>
            <div className={classes.personalInformation}>
                <h2>Personal information</h2>
                <Button className={classes.base} variant='outlined'>
                    <div className={classes.type}>Image</div>
                    {/* <div className={classes.value}>{user.user.login}</div> */}
                </Button><br/>
                <Button className={classes.base} variant='outlined'>
                    <div className={classes.type}>Login</div>
                    <div className={classes.value}>{user.user.login}</div>
                </Button><br/>
                <Button className={classes.base} variant='outlined'>
                    <div className={classes.type}>Full name</div>
                    <div className={classes.value}>{user.user.full_name}</div>
                </Button><br/>
                <Button className={classes.base} variant='outlined'>
                    <div className={classes.type}>email</div>
                    <div className={classes.value}>{user.user.email}</div>
                </Button><br/>
                <Button className={classes.base} variant='outlined'>
                    <div className={classes.type}>password</div>
                    <div className={classes.value}>********</div>
                </Button><br/>
                <Button onClick={logout} variant='outlined' color='secondary'>LOG OUT</Button>
            </div>
        </div>
    )
}

export default account;