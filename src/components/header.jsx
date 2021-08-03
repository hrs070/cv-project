import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AppIcon from "./images/cv.png";

const useStyles = makeStyles((theme) => ({
    appBar: {
        marginBottom: theme.spacing(3)
    },
    icon: {
        width: "40px",
        height: "auto"
    }
}))

export default function Header() {

    const classes = useStyles();

    return (
        <AppBar position='static' className={classes.appBar}>
            <Toolbar>
                <IconButton edge="start" >
                    <img src={AppIcon} alt="app-icon" className={classes.icon} />
                </IconButton>
                <Typography variant="h5">Resume Maker</Typography>
            </Toolbar>
        </AppBar>
    )
}