import React from "react";
import {Button, TextField} from "@material-ui/core";
import {Alert, AlertTitle} from "@material-ui/lab";
import {UseStyles} from "../../styles/login";
import {sendLogin} from "../../redux/modules/auth";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";

function login() {
    const classes = UseStyles();
    const dispatch = rr.useDispatch();
    const user = rr.useSelector(state => state.auth);

    const [login, setLogin] = r.useState('');
    const [password, setPassword] = r.useState('');
    const history = rd.useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const User = {login, password};
        if (user.status === 'idle'){
            dispatch(sendLogin(User));
        }
        if(!user.error) history.push('/');
    };

    const onChangeLogin = (e) => setLogin(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);

    return (
        <div className={classes.main}>
            <h2>Sing in</h2>
            <form onSubmit={handleSubmit}>
                {user.error && 
                    <Alert className={classes.error} severity="error">
                        {/* <AlertTitle>Error</AlertTitle> */}
                        {user.error}
                    </Alert>
                }

                <TextField onChange={onChangeLogin} className={classes.input } required label='login'/>
                <TextField onChange={onChangePassword} className={classes.input} required label='password' type='password'/>
                <Button className={classes.button} type="submit" variant='contained' color='primary'>Send</Button>
            </form>
        </div>
    )
}

export default login;
