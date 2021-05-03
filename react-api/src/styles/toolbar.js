import {makeStyles} from '@material-ui/core/styles'

export const UseStyles =  makeStyles((theme)=>({
    toolbar: {
        backgroundColor: 'gray',
    },
    root: {
        flexGrow: 1,
    },
    home: {
        marginRight: theme.spacing(2),
        flexGrow: 7,
        textAlign: 'left',
        color: 'white',
        fontSize: '20px',
        textDecoration: 'none',
    },

    register: {
        flexGrow: 1,
    },
    login: {
        flexGrow: 1,
        height: '100%',
        color: 'white',
        fontSize: '20px',
        textDecoration: 'none',
    },
}));