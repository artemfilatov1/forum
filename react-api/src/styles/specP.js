import {makeStyles} from "@material-ui/core/styles";

export const UseStyles = makeStyles({
    post: {
        width: '90%',
        margin: 'auto',
        borderBottom: '1px solid gray',
    },
    comment: {
        width: '85%',
        margin: 'auto',
        // marginBottom: '100px',
        backgroundColor: '#f2f2f2',
        borderBottom: '1px solid gray',
        "& > *": {
            margin: 'auto',
            width:'90%',
        }
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
        paddingBottom: '15px',
    },
    actions: {
        padding: 3,
        paddingBottom: '15px',
        "& > *": {
            marginRight: 20,
            fontSize: 20,
        }
    },
    clicked: {
        color: 'blue',
    }
});
