import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import config from "../../config";

export const sendLogin = createAsyncThunk(
    'users/sendLogin',
    async (user, thunkAPI) => {
        try {
            const res = await axios.post(`${config.url}/api/auth/login`, user);
            return {token: res.data.token, 
                    user: res.data.user,
                    error: null};
        } catch (err) {
            return {token: null, user: null, error: err.response.data.error};
        }
    }
)

export const sendRegister = createAsyncThunk(
    'users/sendRegister',
    async (user, thunkAPI) => {
        try {
            await axios.post(`${config.url}/api/auth/register`, user);
            return {error: null};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

export const sendVerifyEmail = createAsyncThunk(
    'users/sendVerifyEmail',
    async (token, thunkAPI) => {
        try {
            await axios.get(`${config.url}/api/auth/register/verify-email/${token}`);
            return {error: null};
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

const initialState = {
    error: null,
    token: localStorage.getItem('token'),
    user: localStorage.getItem('user'),
    status: 'idle',
};

const slice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        logOut: (state, action) => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            state.token = null;
        },
        setAvatar: (state, action) => {
            state.user.profile_picture = action.payload;
        },
    },
    extraReducers: {
        [sendLogin.fulfilled]: (state, action) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
            state.error = action.payload.error;
        },
        [sendRegister.fulfilled]: (state, action) => {
            state.error = action.payload.error;
        },
        [sendVerifyEmail.fulfilled]: (state, action) => {
            state.error = action.payload.error;
        },
    }
})

export const { logOut, setAvatar } = slice.actions;

export default slice.reducer;
