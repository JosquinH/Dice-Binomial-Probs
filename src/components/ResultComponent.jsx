import React from 'react'
import { CircularProgress, Typography, Grid } from '@material-ui/core'
const ResultComponent = (props) => {
    const { loading, data } = props
    if (loading) return <CircularProgress />
    let res = '?'
    if (data && typeof data.res === 'number') {
        const val = Math.round(data.res * 10000) / 100
        res = `${val} % de chance de réussite ` 
    }
    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography> Résultat : {res} </Typography>
            </Grid>
        </Grid>

    )
}

export default ResultComponent