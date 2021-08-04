import React from 'react';
import { Grid, Box, Card, CardContent, Typography } from '@material-ui/core'

export default function Output({ displayCondition }) {
    return (
        <>
            <Card raised={true} style={{ display: !displayCondition ? null : 'none' }}>
                <CardContent>
                    <Grid container>
                        <Grid item>
                            <Typography>This is Output</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </>
    )
}