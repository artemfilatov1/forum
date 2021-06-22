import React from "react";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import {Avatar, ButtonBase, Box, Button} from '@material-ui/core';
import * as r from "react";
import {UseStyles} from '../../styles/specP';
import {parseToken} from '../../utils/parseToken';
import DeleteIcon from "@material-ui/icons/Delete";

function categories() {
    const categories = rr.useSelector(state => state.categories);

    return (
        <div>
            <h2>Categories</h2>
        </div>
    )
}

export default categories;
