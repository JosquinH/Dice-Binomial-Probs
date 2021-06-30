import { Box, Button, Container, Paper } from '@material-ui/core'
import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Calculator } from 'mdi-material-ui'
import { computeProbs } from './utils'
import Form from './Form'
import ResultComponent from './ResultComponent'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginTop: '5%',
        marginBottom: '5%'
    },
    box: {
        margin: '2%',
        marginBottom: "20px",
        flex: 5
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    topBox: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }
}))

const computeFormValues = ({ values }) => {
    return new Promise((resolve) => {
        const res = computeProbs({...values})
        resolve(res)
    })
}

const MainPage = (props) => {
    const classes = useStyles()
    const formId = 'computed-values-form'
    const [loading, setLoading] = useState(false)
    const [probsData, setProbsData] = useState(null)

    const handleOnSubmit = (values) => {
        setLoading(true)
        computeFormValues({values}).then(
            (res) => {
                setProbsData(res)
                setLoading(false)
            }
        )
    }

    console.log(probsData)
    return (
        <Box className={classes.topBox}>
            <Container maxWidth='md' className={classes.container} >
                <Paper className={classes.paper}>
                    <Box className={classes.box}>
                        <Form formId={formId} onSubmit={handleOnSubmit} />
                    </Box>
                    <Box style={{ flex: 1 }} className={classes.box}>
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<Calculator />}
                            type='submit'
                            fullWidth={false}
                            form={formId}
                        >
                            Calculer les probabilités
                        </Button>
                    </Box>
                </Paper>
            </Container>

            <Container maxWidth='md' className={classes.container} >
                <Paper className={classes.paper}>
                    <ResultComponent loading={loading} data={probsData} />
                </Paper>
            </Container>
        </Box>

    )
}

export default MainPage