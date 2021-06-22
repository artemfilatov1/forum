import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import config from "../../config";

export const sendGetUserById = createAsyncThunk(
    'users/sendGetUserById',
    async (id, thunkAPI) => {
        try {
            if (!id) return null;
            const res = await axios.get(`${config.url}/api/users/${id}`);
            return res.data;
        } catch (err) {

        }
    }
)

export const sendGetAllUsers = createAsyncThunk(
    'users/sendGetAllUsers',
    async (thunkAPI) => {
        try {
            const res = await axios.get(`${config.url}/api/users`);
            return res.data;
        } catch (err) {

        }
    }
)

export const sendDeleteUser = createAsyncThunk(
    'users/sendDeleteUser',
    async (id) => {
        try {
            await axios.delete(`${config.url}/api/users/${id}`);
        } catch (err) {

        }
    }
)

export const sendSetAvatar = createAsyncThunk(
    'users/sendSetAvatar',
    async (param, thunkAPI) => {
        try {
            let header = { headers: { Authorization: `Bearer ${param.token}` }}
            const res = await axios.post(`${config.url}/api/users/avatar`, param.file, header);
            return res.data;
        } catch (err) {

        }
    }
)

export const sendUpdate = createAsyncThunk(
    'users/sendUpdate',
    async (param, thunkAPI) => {
        try {
            const res = await axios.patch(`${config.url}/api/users/${param.id}`, param.user);
            console.log(res.data)
            param.history.push(`/users/${param.id}`);
            return {error: null, user: res.data};
        } catch (err) {
            console.log(err.response.data.error);
            return {error: err.response.data.error};
        }
    }
)

export const sendLogin = createAsyncThunk(
    'users/sendLogin',
    async (param, thunkAPI) => {
        try {
            const res = await axios.post(`${config.url}/api/auth/login`, param.user);
            param.history.push('/');
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
    async (param, thunkAPI) => {
        try {
            await axios.post(`${config.url}/api/auth/register`, param.user);
            param.history.push('/login');
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
    users: [],
    specUser: null,
    error: null,
    status: 'idle',
    token: null,
    user: null,
};

const slice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        logOut: (state, action) => {
            state.user = null;
            state.token = null;
        },
        setAvatar: (state, action) => {
            state.user.profile_picture = action.payload;
        },
        clearError: (state, action) => {
            state.error = null;
        },
    },
    extraReducers: {
        [sendGetUserById.fulfilled]: (state, action) => {
            state.specUser = action.payload;
        },
        [sendGetAllUsers.fulfilled]: (state, action) => {
            state.users = action.payload;
            state.specUser = null;
        },
        [sendDeleteUser.fulfilled]: (state, action) => {
            state.specUser = null;
            state.users = null;
        },
        [sendSetAvatar.fulfilled]: (state, action) => {
            state.specUser.profile_picture = action.payload;
            state.user.profile_picture = action.payload;
        },
        [sendUpdate.fulfilled]: (state, action) => {
            state.user = action.payload.user;
            state.error = action.payload.error;
        },
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

export default slice.reducer;
export const { logOut, setAvatar, clearError } = slice.actions;
