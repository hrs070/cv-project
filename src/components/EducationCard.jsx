import React from 'react';
import { Typography, makeStyles, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

}))

export default function EducationCard({ degree, institutionName, specialization, percentage, fromYear, toYear, city, country, }) {

    const classes = useStyles();

    return (
        <Grid container direction="row">
            <Grid item >
                <Grid container>
                    <Typography>{fromYear} - {toYear}</Typography>
                    <Typography>{city}, {country}</Typography>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container direction="column">
                    <Typography>{degree}</Typography>
                    <Typography>{institutionName}</Typography>
                    <Typography>{specialization}</Typography>
                    <Typography>{percentage}</Typography>
                </Grid>
            </Grid>
        </Grid>
    )
}