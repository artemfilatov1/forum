import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import config from "../../config";
import {setAvatar} from "./auth";
import * as rr from "react-redux";

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
            return;
        } catch (err) {

        }
    }
)

export const sendSetAvatar = createAsyncThunk(
    'users/sendSetAvatar',
    async (props, thunkAPI) => {
        try {
            let header = { headers: { Authorization: `Bearer ${props.token}` }}
            const res = await axios.post(`${config.url}/api/users/avatar`, props.file, header);
            return res.data;
        } catch (err) {

        }
    }
)

const initialState = {
    users: [],
    specUser: null,
    error: null,
    status: 'idle',
};

const slice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {},
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
        },
    }
})
export default slice.reducer;
