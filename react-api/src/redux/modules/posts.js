import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from "axios";
import config from "../../config";
import {convertDate} from "../../utils/date";
import comment from "../../components/db/comment";

export const sendGetAllPosts = createAsyncThunk(
    'posts/sendGetAllPosts',
    async (thunkAPI) => {
        try {
            const res = await axios.get(`${config.url}/api/posts`);
            convertDate(res.data);
            return res.data;
        } catch (err) {

        }
    }
)

export const sendDeletePost = createAsyncThunk(
    'posts/sendDeletePost',
    async (id, thunkAPI) => {
        try {
            await axios.delete(`${config.url}/api/posts/${id}`);
        } catch (err) {

        }
    }
)

export const sendSetLike = createAsyncThunk(
    'posts/sendSetLike',
    async (param, thunkAPI) => {
        try {
            let header = { headers: { Authorization: `Bearer ${param.token}` }}
            let type = {type: param.type}
            const res = await axios.post(`${config.url}/api/posts/${param.id}/like`, type, header);
            let isLiked = false, isDisliked = false;
            if (param.decode !== null) {
                const L = await res.data.likes.find(i => i.userId === param.decode.id);
                if (L) isLiked = true;
                const D = await res.data.dislikes.find(i => i.userId === param.decode.id);
                if (D) isDisliked = true;
            }
            return {likes: res.data.likes, dislikes: res.data.dislikes, isLiked: isLiked, isDisliked: isDisliked};
        } catch (err) {

        }
    }
);

export const sendSetLikeToComment = createAsyncThunk(
    'posts/sendSetLikeToComment',
    async (param, thunkAPI) => {
        try {
            let header = { headers: { Authorization: `Bearer ${param.token}` }}
            let type = {type: param.type}
            await axios.post(`${config.url}/api/comments/${param.id}/like`, type, header);
            let comments = [];
            const res = await axios.get(`${config.url}/api/posts/${param.postId}/comments`);
            convertDate(res.data);

            for (let i = 0; i < res.data.length; i++){
                const com = res.data[i];
                const resL = await axios.get(`${config.url}/api/comments/${com.id}/likes`);
                let l = resL.data.likes;
                if (l.length === 0) l = [];
                let d = resL.data.dislikes;
                if (d.length === 0) d = [];

                let isLikedComment = false;
                let isDislikedComment = false;
                if (param.decode !== null) {
                    const L = await resL.data.likes.find(i => i.userId === param.decode.id);
                    if (L) isLikedComment = true;
                    const D = await resL.data.dislikes.find(i => i.userId === param.decode.id);
                    if (D) isDislikedComment = true;
                }

                const obj = {
                    comment: com,
                    likes: l,
                    dislikes: d,
                    isLiked: isLikedComment,
                    isDisliked: isDislikedComment,
                }
                comments.push(obj);
            }
            return comments;
        } catch (err) {

        }
    }
);

export const sendGetPostById = createAsyncThunk(
    'posts/sendGetPostById',
    async (param, thunkAPI) => {
        try {
            let header = { headers: { Authorization: `Bearer ${param.token}` }}
            const resPost = await axios.get(`${config.url}/api/posts/${param.id}`);
            const post = resPost.data;

            convertDate(post);
            const postLikes = await axios.get(`${config.url}/api/posts/${param.id}/like`);

            let comments = [];
            const res = await axios.get(`${config.url}/api/posts/${post.id}/comments`);
            convertDate(res.data);

            for (let i = 0; i < res.data.length; i++){
                const com = res.data[i];
                const resL = await axios.get(`${config.url}/api/comments/${com.id}/likes`);
                let l = resL.data.likes;
                if (l.length === 0) l = [];
                let d = resL.data.dislikes;
                if (d.length === 0) d = [];

                let isLikedComment = false;
                let isDislikedComment = false;
                if (param.decode !== null) {
                    const L = await resL.data.likes.find(i => i.userId === param.decode.id);
                    if (L) isLikedComment = true;
                    const D = await resL.data.dislikes.find(i => i.userId === param.decode.id);
                    if (D) isDislikedComment = true;
                }

                const obj = {
                    comment: com,
                    likes: l,
                    dislikes: d,
                    isLiked: isLikedComment,
                    isDisliked: isDislikedComment,
                }
                comments.push(obj);
            }

            let isLiked = false, isDisliked = false;
            if (param.decode !== null) {
                const L = postLikes.data.likes.find(i => i.userId === param.decode.id);
                if (L) isLiked = true;
                const D = await postLikes.data.dislikes.find(i => i.userId === param.decode.id);
                if (D) isDisliked = true;
            }

            return {
                post: post,
                comments: comments,
                isLiked: isLiked,
                isDisliked: isDisliked,
                likes: postLikes.data.likes,
                dislikes: postLikes.data.dislikes,
            };
        } catch (err) {

        }
    }
);

const initialState = {
    posts: [],
    specPost: null,
    comments: [],
    likes: [],
    dislikes: [],
    error: null,
    status: 'idle',
    isLiked: false,
    isDisliked: false,
};

const slice = createSlice({
    name: 'posts',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [sendGetPostById.fulfilled]: (state, action) => {
            state.specPost = action.payload.post;
            state.comments = action.payload.comments;
            state.likes = action.payload.likes;
            state.dislikes = action.payload.dislikes;
            state.isLiked = action.payload.isLiked;
            state.isDisliked = action.payload.isDisliked;
        },
        [sendGetAllPosts.fulfilled]: (state, action) => {
            state.specPost = null;
            state.posts = action.payload;
        },
        [sendDeletePost.fulfilled]: (state, action) => {
            state.specPost = null;
            state.posts = null;
        },
        [sendSetLike.fulfilled]: (state, action) => {
            state.likes = action.payload.likes;
            state.dislikes = action.payload.dislikes;
            state.isLiked = action.payload.isLiked;
            state.isDisliked = action.payload.isDisliked;
        },
        [sendSetLikeToComment.fulfilled]: (state, action) => {
            state.comments = action.payload;
        },
    }
})
export default slice.reducer;
