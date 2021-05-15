import {makeStyles} from "@material-ui/core/styles";

export const UseStyles = makeStyles({
    personalInformation: {
        width: '50%',
        minWidth: '400px',
        margin: 'auto',
        marginTop: 40,
        border: '1px solid gray',
        borderRadius: 4,
        paddingLeft: 10,
        paddingRight: 10,
        textAlign: 'left',
    },
    base: {
        width: '100%',
        textTransform: 'none',
        marginBottom: '10px',
        display: 'flex'
    },
    type: {
        flex: 1,
        padding: 15,
        textAlign: 'left',
    },
    value: {
        flex: 3,
        textAlign: 'left',
        font: '1.2em "Fira Sans", sans-serif',
    },
    img: {
        boxShadow: '0 0 0 0px black, 0 0 4px #333',
    }
});
