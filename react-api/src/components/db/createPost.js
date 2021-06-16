import React from "react";
import {Button, TextField, TextareaAutosize, Box} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {UseStyles} from "../../styles/login";
import {clearError} from "../../redux/modules/users";
import {sendUpdate} from "../../redux/modules/users";
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import * as r from "react";
import {parseToken} from "../../utils/parseToken";

function createPost() {
    const classes = UseStyles();
    const dispatch = rr.useDispatch();
    const users = rr.useSelector(state => state.users);
    const decode = parseToken(users.token)

    const [title, setTitle] = r.useState('');
    const [content, setContent] = r.useState('');
    const [category, setCategory] = r.useState('');
    const history = rd.useHistory();

    r.useEffect(() => {
        dispatch(clearError());
    }, [dispatch])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const User = {
        //     full_name: fullname,
        // };
        // if (users.status === 'idle'){
        //     dispatch(sendUpdate({user: User, history: history, id: decode.id}));
        // }
    };

    const onChangeContent = (e) => setContent(e.target.value);
    const onChangeTitle = (e) => setTitle(e.target.value);
    const onChangeCategory = (e) => setCategory(e.target.value);

    return (
        <div className={classes.main} style={{width: '50%'}}>
            <h2>Create post</h2>
            <form onSubmit={handleSubmit}>
                {users.error &&
                <Alert className={classes.error} severity="error">
                    {users.error}
                </Alert>
                }
                <TextField onChange={onChangeTitle} className={classes.input} required label='title'/>
                <TextField onChange={onChangeCategory} className={classes.input} required label='category'/>
                <TextareaAutosize rowsMax={30} rowsMin={3} onChange={onChangeContent} className={classes.input} required placeholder='some text'/>
                <Button className={classes.button} type="submit" variant='contained' color='primary'>Send</Button>
            </form>
        </div>
    )
}

export default createPost;