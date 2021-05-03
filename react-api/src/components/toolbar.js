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
                    <Link className={classes.home} to="/">home</Link>
                    <Link className={classes.login} to="/login">sing in</Link>
                    <Button className={classes.register} href='/register' variant='contained' color='primary'>register</Button>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default toolbar;