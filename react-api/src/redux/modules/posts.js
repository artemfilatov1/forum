import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import config from "../../config";
import {convertDate} from "../../utils/date";

export const sendGetPostById = createAsyncThunk(
    'users/sendGetPostById',
    async (id, thunkAPI) => {
        try {
            const res = await axios.get(`${config.url}/api/posts/${id}`);
            convertDate(res.data);
            return res.data;
        } catch (err) {
            // slice.actions.
        }
    }
)

export const sendGetAllPosts = createAsyncThunk(
    'users/sendGetAllPosts',
    async (thunkAPI) => {
        try {
            const res = await axios.get(`${config.url}/api/posts`);
            convertDate(res.data);
            return res.data;
        } catch (err) {
            // slice.actions.
        }
    }
)

export const sendDeletePost = createAsyncThunk(
    'users/sendDeletePost',
    async (id, thunkAPI) => {
        try {
            await axios.delete(`${config.url}/api/posts/${id}`);
            return;
        } catch (err) {
            // slice.actions.
        }
    }
)

const initialState = {
    posts: [],
    specPost: null,
    error: null,
    status: 'idle',
};

const slice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [sendGetPostById.fulfilled]: (state, action) => {
            state.specPost = action.payload;
        },
        [sendGetAllPosts.fulfilled]: (state, action) => {
            state.specPost = null;
            state.posts = action.payload;
        },
        [sendDeletePost.fulfilled]: (state, action) => {
            state.specPost = null;
            state.posts = null;
        },
    }
})
export default slice.reducer;
