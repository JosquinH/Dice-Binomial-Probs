import { Box, Button, Container, Paper } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Calculator } from 'mdi-material-ui'
import Form from './Form'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignSelf: 'center',
        marginTop: '4%'
    },
    box: {
        margin: '2%',
        alignSelf: 'center',
        marginBottom: "20px",
        flex: 1
    }
}))

const MainPage = (props) => {
    const classes = useStyles()
    const formId = 'computed-values-form'

    const handleOnSubmit = (values) => {
        alert(JSON.stringify(values))
    }

    return (
        <Container maxWidth='md' className={classes.container} >
            <Paper>
                <Box className={classes.box}>
                    <Form formId={formId} onSubmit={handleOnSubmit} />
                </Box>
                <Box style={{ alignItems: 'center' }} className={classes.box}>
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
    )
}

export default MainPage