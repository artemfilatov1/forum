import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import config from "../../config";
import {parseToken} from "../../utils/parseToken";

const initialState = {
    posts: [],
    specPost: null,
    error: null,
};

const slice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {
        setPostsSuccess: (state, action) => {
            state.posts = action.payload;
        },
        setSpecPostSuccess: (state, action) => {
            state.specPost = action.payload;
        },
        deletePostSuccess: (state, action) => {
            state.specPost = null;
        }
    }
})
export default slice.reducer;

const {deletePostSuccess, setPostsSuccess, setSpecPostSuccess} = slice.actions;

export const sendGetAllPosts = () => async dispatch => {
    try {
        const res = await axios.get(`${config.url}/api/posts`);
        dispatch(setPostsSuccess(res.data));
        console.log(res.data)
    } catch (err) {
        // dispatch(deleteFailure());
    }
}

export const sendGetUserById = (id) => async dispatch => {
    try {
        const res = await axios.get(`${config.url}/api/posts/${id}`);
        dispatch(setSpecPostSuccess(res.data));
    } catch (err) {
        // dispatch(deleteFailure());
    }
}

export const sendDeletePost = (id) => async dispatch => {
    try {
        await axios.delete(`${config.url}/api/posts/${id}`);
        dispatch(deletePostSuccess());
    } catch (err) {
        // dispatch(deleteFailure());
    }
}

