import {fade, makeStyles} from '@material-ui/core/styles'

export const UseStyles =  makeStyles((theme)=>({
    toolbar: {
        backgroundColor: 'gray',
    },
    root: {
        flexGrow: 1,
    },
    a: {
        font: 'italic small-caps bold 15px cursive',
        padding: '10px',
        marginRight: '20px',
        textAlign: 'left',
        color: 'white',
        textDecoration: 'none',
        '&:hover':{
            color: 'black'
        }
    },
    button: {
        fontSize: '15px',
        // fontFamily: 'initial',
    },
    homeDiv: {
        flexGrow: 7,
        textAlign: 'left',
    },
    img: {
        boxShadow: '0 0 0 0px black, 0 0 2px #333',
        '&:hover': {
            boxShadow: '0 0 0 0px black, 0 0 5px #333',
        }
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
        marginRight: 10,
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));