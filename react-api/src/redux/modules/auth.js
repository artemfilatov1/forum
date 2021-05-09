import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import config from "../../config";

const initialState = {
    user: null,
    error: null,
    token: null,
};

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        loginSuccess: (state, action) => {
            console.log(action);
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        loginFailure : (state, action) => {
            state.user = null;
            state.error = action.payload;
        },
        logOut: (state, action) => {
            state.token = null;
            state.user = null;
        },
        registerSuccess: (state, action) => {
            state.user = null;
            state.error = null;
        },
        registerFailure: (state, action) => {
            state.user = null;
            state.error = action.payload;
        },
        resetFailure: (state, action) => {
            state.error = action.payload;
            state.isPending = false;
        },
        resetSuccess: (state, action) => {
            state.error = null;
            state.isPending = false;
        },
        resetPending: (state, action) => {
            state.isPending = true;
        },
        newPswFailure: (state, action) => {
            state.error = action.payload;
        },
        verifyEmailFailure: (state, action) => {
            console.log(action.payload);
            state.error = action.payload;
        },
        clearError: (state, action) => {
            console.log(action.payload);
            state.error = action.payload;
        },
    }
})
export default slice.reducer;

const {
    loginSuccess,
    loginFailure,
    logOut,
    registerSuccess,
    registerFailure,
    resetFailure,
    resetSuccess,
    resetPending,
    newPswFailure,
    verifyEmailFailure,
    clearError,
} = slice.actions;

export const sendLogin = (user, history) => async dispatch => {
    try {
        const res = await axios.post(`${config.url}/api/auth/login`, user);
        dispatch(loginSuccess({user: res.data.user, token: res.data.token}));
        history.push('/');
    } catch (err) {
        dispatch(loginFailure(err.response.data.error))
    }
}

export const sendLogOut = () => async dispatch => {
    dispatch(logOut());
}

export const sendRegister = (user, history) => async dispatch => {
    try {
        await axios.post(`${config.url}/api/auth/register`, user);
        dispatch(registerSuccess());
        history.push('/login');
    } catch (err) {
        console.log(err.response.data);
        dispatch(registerFailure(err.response.data.error));
    }
}

export const sendReset = (user, history) => async dispatch => {
    try {
        dispatch(resetPending())
        await axios.post(`${config.url}/api/auth/password-reset`, user);
        dispatch(resetSuccess());
        history.push('/login');
    } catch (err) {
        dispatch(resetFailure(err.response.data.error));
    }
}

export const sendNewPsw = (user, history, token) => async dispatch => {
    try {
        await axios.post(`${config.url}/api/auth/password-reset/${token}`, user);
        history.push('/login');
    } catch (err) {
        dispatch(newPswFailure(err.response.data.error));
    }
}

export const sendVerifyEmail = (token) => async dispatch => {
    try {
        await axios.get(`${config.url}/api/auth/register/verify-email/${token}`);
    } catch (err) {
        console.log(err.response.data.error);
        dispatch(verifyEmailFailure(err.response.data.error));
    }
}

export const sendClearError = (token) => async dispatch => {
    dispatch(clearError());
}
