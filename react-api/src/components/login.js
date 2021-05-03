import React from "react";
import {Button, TextField} from "@material-ui/core";
import {UseStyles} from "../styles/login";

function login() {
    const classes = UseStyles();
    return (
        <div className={classes.main}>
            <h2>Sing in</h2>
            <form>
                <TextField className={classes.input } required label='login'/>
                <TextField className={classes.input} required label='password' type='password'/>
                <Button className={classes.button} variant='contained' color='primary'>Send</Button>
            </form>
        </div>
    )
}

export default login;
