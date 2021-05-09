import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import * as rd from "react-router-dom";

const UseStyles = makeStyles({
    root: {
        // width: 240,
        margin: '20px'
    },
    media: {
        height: 130,
    },
    link: {
        textDecoration: 'none',
        color: 'black'
    },
    text: {
        // whiteSpace: 'wrap',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
    }
});

export const CustomCard = (title, content, to, image, width, height) => {
    const classes = UseStyles();
    const history = rd.useHistory();
    const click = () => {
        history.push(to)
    }
    return (
        <Card className={classes.root} style={{width: width, height: height}}>
            <CardActionArea>
                <Link className={classes.link} to={to}>
                    {image &&
                        <CardMedia
                            className={classes.media}
                            image={image}
                            title="Contemplative Reptile"
                        />
                    }
                    <CardContent>
                        <Typography className={classes.text} gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography className={classes.text} variant="body2" color="textSecondary" component="p">
                            {content}
                        </Typography>
                    </CardContent>
                </Link>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={click}>
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}
