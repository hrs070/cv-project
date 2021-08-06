import React from 'react';
import { Typography, makeStyles, Card, CardContent, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    errorColor: {
        color: theme.palette.error.main,
    },
    card: {
        width: "90%",
        minWidth: "300px",
        maxWidth: "750px",
        minHeight: "350px",
        marginBottom: theme.spacing(3)
    },
    gridContainer: {
        minHeight: "300px",
    }
}));

export default function NoDataComponent() {

    const classes = useStyles();

    return (
        <Card raised={true} className={classes.card}>
            <CardContent>
                <Grid container alignItems="center" justifyContent="center" className={classes.gridContainer}>
                    <Grid item>
                        <Typography align="center" variant="h5" color="textSecondary">Fill Details &amp; Click on Generate for a Preview</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}