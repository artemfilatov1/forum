import React from "react";
import {Link} from "react-router-dom";
import {UseStyles} from "../../styles/toolbar";
import {Button, Avatar, Box, InputBase} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import config from "../../config";
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import Fab from '@material-ui/core/Fab';
import Tooltip from '@material-ui/core/Tooltip';

function toolbar() {
    const classes = UseStyles();
    const user = rr.useSelector(state => state.auth);
    const history = rd.useHistory();
    let id = ''
    let profile_picture = ''
    if (user.user) {
        id = user.user.id;
        profile_picture = user.user.profile_picture
    }

    const register = () => {
        history.push('/register');
    }

    const guest = (
        <div>
            <Link className={classes.a} to="/login">SING IN</Link>
            <Button className={classes.button}
            onClick={register}
            variant='contained' color='primary'>REGISTER</Button>
        </div>
    );
    const client = (
        <Box display='flex'>
            <Tooltip title="Add post" aria-label="add">
                <Fab color="primary" size="small">
                    <AddIcon />
                </Fab>
            </Tooltip>
            <Tooltip title="account" aria-label="add" style={{marginLeft: 10}}>
                <Link to={`/db/users/${id}`}>
                    <Avatar alt="Remy Sharp" src={`${config.url}/${profile_picture}`} className={classes.img}/>
                </Link>
            </Tooltip>
        </Box>
    );

    return (
        <div className={classes.root}>
            <AppBar className={classes.toolbar} position="static">
                <Toolbar>
                    <div className={classes.homeDiv}>
                        <Link className={classes.a} to="/">HOME</Link>
                    </div>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    {!user.token && guest}
                    {user.token && client}
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default toolbar;