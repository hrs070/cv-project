import React from 'react';
import { Grid, Card, CardContent, makeStyles } from '@material-ui/core';
import NoDataComponent from './noDataComponent';
import GeneratedOutput from './generatedOutput';

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

export default function Output({ displayCondition, outputData, dataOrNoDataState }) {

    const classes = useStyles();

    return (

        <Grid container alignItems="center" justifyContent="center" style={{ display: !displayCondition ? null : 'none' }}>

            <Card raised={true} className={classes.card}>
                <CardContent>
                    <Grid container alignItems="center" justifyContent="center" className={classes.gridContainer}>
                        <Grid item>
                            {!dataOrNoDataState ? <NoDataComponent /> : <GeneratedOutput recievedData={outputData} />}
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

        </Grid>

    )
}


