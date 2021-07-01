import React from 'react'
import { CircularProgress, Typography, Box, makeStyles } from '@material-ui/core'
import { Chart } from "react-google-charts"

const useStyles = makeStyles((theme) => ({
    box: {
        marginBottom: '2%',
        marginLeft: '2%',
        marginRight: '2%',
        flex: 1
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    topBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chartBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '2%',
        marginLeft: '2%',
        marginRight: '2%',
    },
    text: {
        fontWeight: 'bold'
    }
}))

const ResultComponent = (props) => {
    const { loading, data } = props
    const classes = useStyles()

    if (loading) return <CircularProgress />

    let res = '?'

    if (data && typeof data.res === 'number') {
        const val = Math.round(data.res * 10000) / 100
        res = `${val} % de chance de réussite `
    }

    const dataChart1 = data?.table_single_probs ? [['Nombre de Succès', 'Probabilité (%)'], ...data.table_single_probs.map((x, idx) => [`${idx} succès`, Math.round(x * 10000) / 100])] : []
    const dataChart2 = data?.table_decrement_probs ? [['Nombre de Succès Au Moins', 'Probabilité (%)'], ...data.table_decrement_probs.map((x, idx) => [`${idx} succès au moins`, Math.round(x * 10000) / 100])] : []

    const height = 300
    const width = 700

    return (
        <Box className={classes.topBox}>
            <Box className={classes.box} style={{ marginTop: '2%' }}>
                <Typography className={classes.text}> Résultat : {res} </Typography>
            </Box>
            <Box className={classes.chartBox}>
                {dataChart1.length >= 2 ?
                    <div style={{ display: 'flex' }}>
                        <Chart
                            width={700}
                            height={height}
                            chartType="ColumnChart"
                            loader={<CircularProgress />}
                            data={dataChart1}
                            options={{
                                title: 'Probabilité sur le nombre de succès (%)',
                                chartArea: { width: '70%' },
                                hAxis: {
                                    title: 'Nombre de succès',
                                    minValue: 0,
                                    maxValue: dataChart1?.length - 1
                                }
                            }}
                            legendToggle
                        /></div> : <div style={{ height: height, width: width }}></div>
                }
                {dataChart2.length >= 2 ?
                    <div style={{ display: 'flex' }}>
                        <Chart
                            width={700}
                            height={300}
                            chartType="ColumnChart"
                            loader={<CircularProgress />}
                            data={dataChart2}
                            options={{
                                title: 'Probabilité sur le nombre de succès au moins (%)',
                                chartArea: { width: '70%' },
                                hAxis: {
                                    title: 'Nombre de succès au moins',
                                    minValue: 0,
                                    maxValue: dataChart1?.length - 1
                                }
                            }}
                            legendToggle
                        />
                    </div> : null

                }
            </Box>
        </Box>

    )
}

export default ResultComponent

