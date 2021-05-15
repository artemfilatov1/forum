import React from "react";
import {Button, TextField} from "@material-ui/core";
import {Alert, AlertTitle} from "@material-ui/lab";
import {UseStyles} from "../../styles/login";
import {sendRegister} from "../../redux/modules/auth";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";

function register() {
    const classes = UseStyles();
    const dispatch = rr.useDispatch();
    const user = rr.useSelector(state => state.auth);

    const [full_name, setFullName] = r.useState('');
    const [login, setLogin] = r.useState('');
    const [email, setEmail] = r.useState('');
    const [password, setPassword] = r.useState('');
    const [password_confirmation, setPasswordConfirmation] = r.useState('');
    const history = rd.useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const User = { full_name, login, email, password, password_confirmation };
        if (user.status === 'idle'){
            dispatch(sendRegister(User));
            history.push('/login');
        }
    }

    const onChangeLogin = (e) => setLogin(e.target.value);
    const onChangeName = (e) => setFullName(e.target.value);
    const onChangePassword = (e) => setPassword(e.target.value);
    const onChangePassword2 = (e) => setPasswordConfirmation(e.target.value);
    const onChangeEmail = (e) => setEmail(e.target.value);

    return (
        <div className={classes.main}>
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                {user.error && 
                    <Alert className={classes.error} severity="error">
                        <AlertTitle>Error</AlertTitle>
                        {user.error}
                    </Alert>
                }
                <TextField onChange={onChangeLogin} className={classes.input} required label='login'/>
                <TextField onChange={onChangeName} className={classes.input} required label='full name'/>
                <TextField onChange={onChangeEmail} className={classes.input} required label='email' type='email' placeholder='my@gmail.com'/>
                <TextField onChange={onChangePassword} className={classes.input} required label='password' type='password'/>
                <TextField onChange={onChangePassword2} className={classes.input} required label='confirm password' type='password'/>
                <Button className={classes.button} type="submit" variant='contained' color='primary'>Send</Button>
            </form>
        </div>
    );
}

export default register;
