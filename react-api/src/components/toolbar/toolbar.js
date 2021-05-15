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
import {parseToken} from '../../utils/parseToken';


function toolbar() {
    const classes = UseStyles();
    const user = rr.useSelector(state => state.auth);
    const history = rd.useHistory();
    let decode = parseToken(user.token);

    const register = () => {
        history.push('/register');
    }

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
                    {!user.token &&
                    <div>
                        <Link className={classes.a} to="/login">SING IN</Link>
                        <Button className={classes.button}
                                onClick={register}
                                variant='contained' color='primary'>REGISTER</Button>
                    </div>
                    }
                    {user.token && decode && user.user &&
                    <Box display='flex'>
                        <Tooltip title="Add post" aria-label="add">
                            <Fab color="primary" size="small">
                                <AddIcon />
                            </Fab>
                        </Tooltip>
                        <Tooltip title="account" placement="bottom-start" style={{marginLeft: 10}}>
                            <Link to={`/db/users/${decode.id}`}>
                                <Avatar alt="Remy Sharp" src={`${config.url}/${user.user.profile_picture}`} className={classes.img}/>
                            </Link>
                        </Tooltip>
                    </Box>
                    }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default toolbar;