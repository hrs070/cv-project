import React from 'react';
import { Grid } from '@material-ui/core';
import NoDataComponent from './noDataComponent';
import GeneratedOutput from './generatedOutput';

export default function Output({ displayCondition, outputData, dataOrNoDataState }) {

    return (

        <Grid container alignItems="center" justifyContent="center" style={{ display: !displayCondition ? null : 'none' }}>
            {!dataOrNoDataState ? <NoDataComponent /> : <GeneratedOutput recievedData={outputData} />}
        </Grid>

    )
}


