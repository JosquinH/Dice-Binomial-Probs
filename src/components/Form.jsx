import React, { useState } from 'react'
import { Grid, IconButton, TextField, Typography } from '@material-ui/core'
import { HelpBox, DiceD4, DiceD6, DiceD8, DiceD10, DiceD12, DiceD20 } from 'mdi-material-ui'

const Form = ({ formId, onSubmit }) => {

    // Gestion du nombre de face des dés

    const [diceValue, setDiceValue] = useState('')

    const handleOnChangeClickD4 = () => { setDiceFaceNumber(''); setDiceValue('d4'); setTrueDiceFaceNumber(4)}
    const handleOnChangeClickD6 = () => { setDiceFaceNumber(''); setDiceValue('d6'); setTrueDiceFaceNumber(6)}
    const handleOnChangeClickD8 = () => { setDiceFaceNumber(''); setDiceValue('d8'); setTrueDiceFaceNumber(8)}
    const handleOnChangeClickD10 = () => { setDiceFaceNumber(''); setDiceValue('d10'); setTrueDiceFaceNumber(10)}
    const handleOnChangeClickD12 = () => { setDiceFaceNumber(''); setDiceValue('d12'); setTrueDiceFaceNumber(12)}
    const handleOnChangeClickD20 = () => { setDiceFaceNumber(''); setDiceValue('d20'); setTrueDiceFaceNumber(20)}
    const handleOnChangeClickOther = () => { setTrueDiceFaceNumber(0); setDiceValue('?'); }

    const [diceFaceNumber, setDiceFaceNumber] = useState('')
    const [trueDiceFaceNumber, setTrueDiceFaceNumber] = useState(0)

    const handleOnChangeDiceFaceNumber = (e) => {
        const value = e.target.value
        if (value !== '') {
            setDiceFaceNumber(parseInt(value))
            setTrueDiceFaceNumber(parseInt(value))
        }
        
    }

    // Gestion des infos supplémentaires

    const [diceNumber, setDiceNumber] = useState('')

    const handleOnChangeDiceNumber = (e) => {
        setDiceNumber(e.target.value)
    }

    const [numberOfSuccess, setNumberOfSuccess] = useState('')


    const handleOnChangeNumberOfSuccess = (e) => {
        setNumberOfSuccess(e.target.value)
    }

    const [diceMinValue, setDiceMinValue] = useState('')


    const handleOnChangeDiceMinValue = (e) => {
        setDiceMinValue(e.target.value)
    }

    const [diceError, setDiceError] = useState(false)
    
    const handleOnSubmit = (e) => {
        e.preventDefault()
        e.stopPropagation()

        const values = {
            diceNumberOfFaces: trueDiceFaceNumber,
            diceNumber: parseInt(diceNumber),
            numberOfSuccess: parseInt(numberOfSuccess),
            diceMinValue: parseInt(diceMinValue)
        }

        if (!trueDiceFaceNumber) {
            setDiceError(true)
        } else {
            onSubmit(values)
        }
        
    }

    return (
        <form id={formId} onSubmit={handleOnSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h6' type='bold'> Sélection du dé </Typography>
                </Grid>
                <Grid item xs={1}>
                    <IconButton id='d4' onClick={handleOnChangeClickD4}><DiceD4 fontSize='large' color={diceValue === 'd4' ? 'secondary' : 'primary'} /></IconButton>
                </Grid>
                <Grid item xs={1}>
                    <IconButton id='d6' onClick={handleOnChangeClickD6} ><DiceD6 fontSize='large' color={diceValue === 'd6' ? 'secondary' : 'primary'} /></IconButton>
                </Grid>
                <Grid item xs={1}>
                    <IconButton id='d8' onClick={handleOnChangeClickD8}><DiceD8 fontSize='large' color={diceValue === 'd8' ? 'secondary' : 'primary'}/></IconButton>
                </Grid>
                <Grid item xs={1}>
                    <IconButton id='d10' onClick={handleOnChangeClickD10}><DiceD10 fontSize='large' color={diceValue === 'd10' ? 'secondary' : 'primary'} /></IconButton>
                </Grid>
                <Grid item xs={1}>
                    <IconButton id='d12' onClick={handleOnChangeClickD12}><DiceD12 fontSize='large' color={diceValue === 'd12' ? 'secondary' : 'primary'} /></IconButton>
                </Grid>
                <Grid item xs={1}>
                    <IconButton id='d20' onClick={handleOnChangeClickD20}><DiceD20 fontSize='large' color={diceValue === 'd20' ? 'secondary' : 'primary'} /></IconButton>
                </Grid>
                <Grid item xs={1}>
                    <IconButton id='?' onClick={handleOnChangeClickOther}><HelpBox fontSize='large' color={diceValue === '?' ? 'secondary' : 'primary'} /></IconButton>
                </Grid>
                <Grid item xs={5}>
                    <TextField
                        required={diceValue === '?'}
                        id="diceFaceNumber"
                        label="Nombre de faces sur le dé"
                        defaultValue={diceValue === '?' ? diceFaceNumber : ''}
                        onChange={handleOnChangeDiceFaceNumber}
                        type='number'
                        variant="outlined"
                        fullWidth
                        inputProps={{ min: 2 }}
                        disabled={diceValue !== '?'}
                    />
                </Grid>
                <Grid item xs={12}>
                    {diceError ? <Typography variant='body2' color='secondary'> Veuillez sélectionnner un dé </Typography> : null}
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h6' type='bold'> Informations suplémentaires </Typography>
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        required
                        id="diceNumber"
                        label="Nombre de dés à lancer"
                        defaultValue={diceNumber}
                        onChange={handleOnChangeDiceNumber}
                        type='number'
                        variant="outlined"
                        fullWidth
                        inputProps={{ min: 1 }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        required
                        id="numberOfSuccess"
                        label="Nombre de succès requis"
                        defaultValue={numberOfSuccess}
                        onChange={handleOnChangeNumberOfSuccess}
                        type='number'
                        variant="outlined"
                        fullWidth
                        inputProps={{ min: 0, max: diceNumber }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        required
                        id="diceMinValue"
                        label="Face minimale à faire sur le dé"
                        defaultValue={diceMinValue}
                        onChange={handleOnChangeDiceMinValue}
                        type='number'
                        variant="outlined"
                        fullWidth
                        inputProps={{ min: 1, max: trueDiceFaceNumber }}
                        disabled={!trueDiceFaceNumber}
                    />
                </Grid>
            </Grid>
        </form>
    )
}

export default Form