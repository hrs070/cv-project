import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Grid } from '@material-ui/core';
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

export default function Header({ onEdit, name }) {

    const classes = useStyles();

    return (
        <AppBar position='static' className={classes.appBar}>
            <Toolbar>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item>
                        <Grid container alignItems="center" justifyContent="space-between">
                            <IconButton edge="start" >
                                <img src={AppIcon} alt="app-icon" className={classes.icon} />
                            </IconButton>
                            <Typography variant="h6">CV Maker</Typography>
                        </Grid>
                    </Grid>
                    <Button color="inherit" variant="outlined" onClick={() => onEdit()}>{name}</Button>
                </Grid>
            </Toolbar>
        </AppBar >
    )
}