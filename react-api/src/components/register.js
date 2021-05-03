import React from "react";
import {Button, TextField} from "@material-ui/core";
import {UseStyles} from "../styles/login";

function register() {
    const classes = UseStyles();
    return (
        <div className={classes.main}>
            <h2>Register</h2>
            <form>
                <TextField className={classes.input} required label='login'/>
                <TextField className={classes.input} required label='full name'/>
                <TextField className={classes.input} required label='email' type='email' placeholder='my@gmail.com'/>
                <TextField className={classes.input} required label='password' type='password'/>
                <TextField className={classes.input} required label='confirm password' type='password'/>
                <Button className={classes.button} variant='contained' color='primary'>Send</Button>
            </form>
        </div>
    )
}

export default register;
