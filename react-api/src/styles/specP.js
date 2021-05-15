import {makeStyles} from "@material-ui/core/styles";

export const UseStyles = makeStyles({
    post: {
        width: '90%',
        margin: 'auto',
    },
    title: {
        margin: 'auto',
        marginTop: 40,
        padding: 3,
        textAlign: 'center',
    },
    underTitle: {
        display: 'flex',
        color: 'gray',
        padding: 3,
        "& > *": {
            marginRight: 20,
            fontSize: 15
        }
    },
    content: {
        textAlign: 'left',
        marginTop: '20px',
        paddingBottom: '30px',
        borderBottom: '1px solid gray',
    },
});
