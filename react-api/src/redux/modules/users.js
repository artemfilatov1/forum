import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import config from "../../config";
import {parseToken} from "../../utils/parseToken";

const initialState = {
    users: [],
    specUser: null,
    error: null,
};

const slice = createSlice({
    name: 'users',
    initialState: initialState,
    reducers: {
        setUsersSuccess: (state, action) => {
            state.users = action.payload;
        },
        setSpecUserSuccess: (state, action) => {
            state.specUser = action.payload;
        },
        deleteUserSuccess: (state, action) => {
            state.users = null;
        }
    }
})
export default slice.reducer;

const {deleteUserSuccess, setUsersSuccess, setSpecUserSuccess} = slice.actions;

export const sendGetAllUsers = () => async dispatch => {
    try {
        const res = await axios.get(`${config.url}/api/users`);
        dispatch(setUsersSuccess(res.data));
    } catch (err) {
        // dispatch(deleteFailure());
    }
}

export const sendGetUserById = (id) => async dispatch => {
    try {
        const res = await axios.get(`${config.url}/api/users/${id}`);
        dispatch(setSpecUserSuccess(res.data));
    } catch (err) {
        // dispatch(deleteFailure());
    }
}

export const sendDeleteUser = (id) => async dispatch => {
    try {
        await axios.delete(`${config.url}/api/users/${id}`);
        dispatch(deleteUserSuccess());
    } catch (err) {
        // dispatch(deleteFailure());
    }
}

