import { Box, Button, Container, Paper } from '@material-ui/core'
import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Calculator } from 'mdi-material-ui'
import Form from './Form'
const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent:'center',
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
        flexDirection:'column',
        alignItems: 'center'
    },
    topBox: {
        display: 'flex',
        justifyContent:'center',
        alignItems: 'center',
        flexDirection:'column'
    }
}))

const MainPage = (props) => {
    const classes = useStyles()
    const formId = 'computed-values-form'

    const handleOnSubmit = (values) => {
        alert(JSON.stringify(values))
    }

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
                    <div>cocucoco</div>
                </Paper>
            </Container>
        </Box>
        
    )
}

export default MainPage