import React from "react";
import * as rr from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const UseStyles = makeStyles({
    root: {
        maxWidth: 345,
        margin: '20px'
    },
    media: {
        height: 140,
    },
    link: {
        textDecoration: 'none',
        color: 'black'
    }
});

function home() {
    const user = rr.useSelector(state => state.auth);
    const classes = UseStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <Link className={classes.link} to='/users'>
                    <CardMedia
                        className={classes.media}
                        image="/static/images/cards/contemplative-reptile.jpg"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Users
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            U can wach or find some people
                        </Typography>
                    </CardContent>
                </Link>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" href="/users">
                Learn More
                </Button>
            </CardActions>
        </Card>
    );

}

export default home;