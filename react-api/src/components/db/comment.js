import React from "react";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import {Avatar, ButtonBase, Box} from '@material-ui/core';
import config from '../../config';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import {UseStyles} from '../../styles/specP';
import {parseToken} from '../../utils/parseToken';
import {sendSetLikeToComment} from '../../redux/modules/posts';

function comment(props) {
    const users = rr.useSelector(state => state.users);
    const dispatch = rr.useDispatch();
    const classes = UseStyles();
    const id = parseInt(rd.useParams().id);
    const decode = parseToken(users.token);
    let isLiked = null, isDisliked = null;
    const likes = props.likes;
    const dislikes = props.dislikes;

    if(props.isLiked) isLiked = classes.clicked;
    if(props.isDisliked) isDisliked = classes.clicked;
    
    const handleSetLike = () => {
        if (!decode) return;
        const param = {id: props.id, postId: id, token: users.token, type: 'like', decode: decode}
        dispatch(sendSetLikeToComment(param));
        isDisliked = null; isLiked = null;
        if(props.isLiked) isLiked = classes.clicked;
        if(props.isDisliked) isDisliked = classes.clicked;
    }

    const handleSetDislike = (type) => {
        if (!decode) return;
        const param = {id: props.id, token: users.token, postId: id, type: 'dislike', decode: decode}
        dispatch(sendSetLikeToComment(param));
        isLiked = null; isDisliked = null;
        if(props.isLiked) isLiked = classes.clicked;
        if(props.isDisliked) isDisliked = classes.clicked;
    }

    return (
        <div className={classes.comment}>
            <div className={classes.title}>
                <div className={classes.underTitle}>
                    <p className={classes.underP}>publish date: {props.publish_date}</p>
                    <ButtonBase href={`/db/users/${props.id}`} style={{borderRadius:'100%', padding:5}}>
                        <Avatar alt="Remy Sharp" src={`${config.url}/${props.map.get(props.userId)}`} className={classes.img}/>
                    </ButtonBase>
                </div>
            </div>
            <div className={classes.content}>
                {props.content}
            </div>
            <Box className={classes.actions} display='flex'>
                <div>
                    {likes &&
                    <i style={{marginRight: 5}}>{likes.length}</i>
                    }
                    <ButtonBase className={isLiked} onClick={handleSetLike} style={{padding:4, borderRadius:100}}>
                        <ThumbUpOutlinedIcon/>
                    </ButtonBase>
                </div>
                <div>
                    {dislikes &&
                    <i style={{marginRight: 5}}>{dislikes.length}</i>
                    }
                    <ButtonBase className={isDisliked} style={{padding:4, borderRadius:100}} onClick={handleSetDislike}>
                        <ThumbDownOutlinedIcon/>
                    </ButtonBase>
                </div>
            </Box>
        </div>
    )
}

export default comment;
