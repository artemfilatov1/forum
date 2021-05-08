import {makeStyles} from '@material-ui/core/styles'

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