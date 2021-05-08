import React from "react";
import {Link} from "react-router-dom";
import {UseStyles} from "../../styles/toolbar";
import {Button} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import * as rr from "react-redux";
import * as rd from "react-router-dom";

function toolbar() {
    const classes = UseStyles();
    const user = rr.useSelector(state => state.auth);
    const history = rd.useHistory();

    const register = () => {
        history.push('/register');
    }

    const guest = (
        <div className={classes.auth}>
            <Link className={classes.a} to="/login">SING IN</Link>
            <Button className={classes.button}
            onClick={register}
             variant='contained' color='primary'>REGISTER</Button>
        </div>
    );

    const client = (
        <Link className={classes.a} to="/account">ACCOUNT</Link>
    );

    return (
        <div className={classes.root}>
            <AppBar className={classes.toolbar} position="static">
                <Toolbar>
                    <div className={classes.homeDiv}>
                        <Link className={classes.a} to="/">HOME</Link>
                    </div>
                    {!user.token && guest}
                    {user.token && client}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default toolbar;