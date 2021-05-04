import React from "react";
import {Link} from "react-router-dom";
import {UseStyles} from "../styles/toolbar";
import {Button, ButtonGroup} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

function toolbar() {
    const classes = UseStyles();
    return (
        <div className={classes.root}>
            <AppBar className={classes.toolbar} position="static">
                <Toolbar>
                    <div className={classes.homeDiv}>
                        <Link className={classes.a} to="/">HOME</Link>
                    </div>
                    <div className={classes.auth}>
                        <Link className={classes.a} to="/login">SING IN</Link>
                        <Button className={classes.button} variant='contained' color='primary' href='/register'>REGISTER</Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default toolbar;