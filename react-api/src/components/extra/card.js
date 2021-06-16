import React from "react";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import {Button, ButtonBase} from '@material-ui/core/';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Link} from "react-router-dom";
import * as rd from "react-router-dom";
import config from "../../config";
import { Divider } from "@material-ui/core";

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

export const CustomCard = (props) => {
    const classes = UseStyles();
    return (
        <Card className={classes.root} style={{width: props.width, height: props.height}}>
            <CardActionArea>
                <Link className={classes.link} to={props.to}>
                    {props.image &&
                        <CardMedia
                            className={classes.media}
                            image={props.image}
                            title="Contemplative Reptile"
                        />
                    }
                    <CardContent>
                        <Typography className={classes.text} gutterBottom variant="h5" component="h2">
                            {props.title}
                        </Typography>
                        <Typography className={classes.text} variant="body2" color="textSecondary" component="p">
                            {props.content}
                        </Typography>
                    </CardContent>
                </Link>
            </CardActionArea>
            <CardActions>
                <Box display='flex' style={{width: '100%'}}>
                    <Box style={{flex:1, textAlign:'left'}}>
                        <Button size="small" color="primary" href={props.to} >
                            Learn More
                        </Button>
                    </Box>
                    {props.author && props.userId &&
                    <Box style={{flex:1, textAlign:'right'}}>
                        <ButtonBase href={`/db/users/${props.userId}`} style={{borderRadius:'100%', padding:10}}>
                            <Avatar alt="Remy Sharp" src={`${config.url}/${props.author}`} style={{width: 30, height:30}}/>
                        </ButtonBase>
                    </Box>
                    }
                </Box>
            </CardActions>
        </Card>
    );
}
