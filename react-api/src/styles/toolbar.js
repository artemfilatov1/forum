import {makeStyles} from '@material-ui/core/styles'

export const UseStyles =  makeStyles((theme)=>({
    toolbar: {
        backgroundColor: 'gray',
    },
    root: {
        flexGrow: 1,
    },
    a: {
        fontFamily: 'initial',
        padding: '10px',
        marginRight: '20px',
        textAlign: 'left',
        color: 'white',
        fontSize: '15px',
        textDecoration: 'none',
        '&:hover':{
            color: 'black'
        }
    },
    button: {
        fontSize: '15px',
        fontFamily: 'initial',
    },
    auth: {
        flexGrow: 1,
        marginRight: '0px',
        textAlign: 'right',
    },
    homeDiv: {
        flexGrow: 7,
        textAlign: 'left',
    },
}));