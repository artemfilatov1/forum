import React from "react";
import {sendDeleteUser, sendGetUserById, sendSetAvatar} from '../../redux/modules/users';
import * as rr from "react-redux";
import * as rd from "react-router-dom";
import {Avatar, Button, ButtonBase} from '@material-ui/core';
import config from '../../config';
import * as r from "react";
import {logOut, setAvatar} from "../../redux/modules/users";
import DeleteIcon from '@material-ui/icons/Delete';
import FormDialog from './formDialog';
import {UseStyles} from '../../styles/acc';
import {parseToken} from '../../utils/parseToken';

function account() {
    const users = rr.useSelector(state => state.users);
    const history = rd.useHistory();
    const dispatch = rr.useDispatch();
    const classes = UseStyles();
    const id = parseInt(rd.useParams().id);
    const [file, setFile] = r.useState(null);
    const decode = parseToken(users.token)

    let clientId = '';
    if (decode) clientId = decode.id;

    const [openAvatar, setOpenAvatar] = r.useState(false);

    const handleClickOpenAvatar = () => {
        if (clientId === id){
            setOpenAvatar(true);
        }
    };

    r.useEffect(() => {
        dispatch(sendGetUserById(id));
    },[dispatch]);

    const handleLogOut = () => {
        dispatch(logOut());
        history.push('/login');
    }

    const handleDelete = () => {
        dispatch(sendDeleteUser(id));
        if (clientId === id){
            dispatch(logOut());
            history.push('/login');
        } else {
            history.push('/db/users');
        }
    }

    const handleSetImage = (e) => {
        if (clientId === id){
            e.preventDefault();
            const data = new FormData();
            data.append('avatar', file);
            const param = {token: users.token, file: data, history: history};
            dispatch(sendSetAvatar(param));
        }
    }

    return (
        <div>
            {users.specUser &&
            <div className={classes.personalInformation}>
                <h2>Personal information</h2>
                <ButtonBase className={classes.baseAvatar} variant='outlined' onClick={handleClickOpenAvatar}>
                    <Avatar alt="Remy Sharp" src={`${config.url}/${users.specUser.profile_picture}`} className={classes.img}/>
                </ButtonBase>
                <Button className={classes.base} href={'/name'} variant='outlined'>
                    <div className={classes.type}>Login</div>
                    <div className={classes.value}>{users.specUser.login}</div>
                </Button>
                <Button className={classes.base} variant='outlined'>
                    <div className={classes.type}>rating</div>
                    <div className={classes.value}>{users.specUser.rating}</div>
                </Button>
                <Button className={classes.base} href={'/fullname'} variant='outlined'>
                    <div className={classes.type}>Full name</div>
                    <div className={classes.value}>{users.specUser.full_name}</div>
                </Button>
                <Button className={classes.base} href={'/email'} variant='outlined'>
                    <div className={classes.type}>email</div>
                    <div className={classes.value}>{users.specUser.email}</div>
                </Button>
                {(clientId === id) &&
                <Button className={classes.base} href={'/password'} variant='outlined'>
                    <div className={classes.type}>password</div>
                    <div className={classes.value}>********</div>
                </Button>
                }
                {(clientId === id) &&
                    <Button style={{marginRight:20, marginBottom:10}} onClick={handleLogOut} variant='outlined' color='secondary'>
                        LOG OUT
                    </Button>
                }
                {users.user && (users.user.role === 'admin' || clientId === id) &&
                    <Button onClick={handleDelete} style={{marginBottom:10}} variant='contained' color='secondary'>
                        <DeleteIcon fontSize='small'/>
                        delete
                    </Button>
                }
                <FormDialog 
                    open={openAvatar} 
                    setOpen={setOpenAvatar}
                    setFile={setFile}
                    onSet={handleSetImage}
                />
            </div>
            }
        </div>
    )
}

export default account;
