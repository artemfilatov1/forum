import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../config";

export const sendGetAllCategories = createAsyncThunk(
    'posts/sendCreatePost',
    async (param, thunkAPI) => {
        try {
            const res = await axios.get(`${config.url}/api/categories/`);
            return res.data;
        } catch (err) {
            return {error: err.response.data.error};
        }
    }
)

const initialState = {
    categories: [],
    specCategory: null,
};

const slice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [sendGetAllCategories.fulfilled]: (state, action) => {
            state.categories = action.payload;
        },
    }
})
export default slice.reducer;