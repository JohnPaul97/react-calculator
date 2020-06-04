import React, { useState, useEffect } from 'react';
import { Button, TextField, Grid, Switch, FormControlLabel}  from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const INITIAL_RESULT = 0;

const DEFAULTS = {
    backgroundColor: '#7e7e7e',
    buttonColor: '#46403D',
    resultLabel: 'result',
    expressionLabel: 'expression',
}

const Calculator = props => {
    const { backgroundColor, buttonColor, resultLabel, expressionLabel } = props,
        classes = makeStyles(theme => ({
            root: {
                padding: '10px',
                margin: '10px',
                width: '50%',
                backgroundColor: backgroundColor || DEFAULTS.backgroundColor,
                borderRadius: '10px',
                border: `1px solid black`,
                flexGrow: 0,
                width: '300px'
            },
            button: {
                padding: theme.spacing(1),
                textAlign: "center",
                color: theme.palette.text.primary,
                backgroundColor: buttonColor || DEFAULTS.buttonColor,
                margin: "5px"
            },
            resultField: {
                padding: theme.spacing(1),
                backgroundColor: backgroundColor || DEFAULTS.backgroundColor,
            },
            padding: {
                padding: 'top 10px'
            }
        }))()
        , audio = new Audio("https://storage.cloud.google.com/johnpaul-bucket/click2.mp3");

    const CustomSwitch = withStyles({
        switchBase: {
            color: backgroundColor || DEFAULTS.backgroundColor,
            '&$checked': {
                color: buttonColor || DEFAULTS.buttonColor,
            },
            '&$checked + $track': {
                backgroundColor: buttonColor || DEFAULTS.buttonColor,
            },
        },
        checked: {},
        track: {},
    })(Switch);

    const [expression, setExpression] = useState(INITIAL_RESULT);
    const [result, setResult] = useState(INITIAL_RESULT);
    const [isPlayingAudio, setIsPlayingAudio] = useState(true);

    const playsAudio = () => {
        if (isPlayingAudio) {
            audio.play();
        }
    }

    const handleIsPlayingAudio = () => {
        setIsPlayingAudio(!isPlayingAudio);
    }

    const handleOnClick = (button) => {
        playsAudio();
        const newExpr = expression !== 0 ? `${expression}${button}` : button;
        setExpression(newExpr);
    }

    //callback for set expression hook
    useEffect(() => {
        updateResult();
    }, [expression]);

    const handleReset = () => {
        playsAudio();
        setExpression(INITIAL_RESULT);
        setResult(INITIAL_RESULT);
    }

    const handleEqualOnClick = () => {
        playsAudio();
        setExpression(result);
    }

    const updateResult = () => {
        let newResult = null;

        try {
            newResult = eval(expression);
        }
        catch (err) {
            newResult = 'error';
        }

        setResult(newResult);
    }

    const handleResultOnchange = (e) => {
        const { value } = e.target;

        value === '' ? setExpression(0) : setExpression(value);
    }

    function calculatorButton(value) {
        return <Button className={classes.button} onClick={() => handleOnClick(value)}>{value}</Button>;
    }

    function resetButton() {
        return <Button className={classes.button} onClick={() => handleReset()}>C</Button>;
    }

    function equalButton() {
        return <Button className={classes.button} onClick={() => handleEqualOnClick()}>=</Button>;
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs={12}>
                    <TextField
                        className={classes.resultField}
                        id="outlined-helperText"
                        label={resultLabel || DEFAULTS.resultLabel}
                        variant="outlined"
                        value={result}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        className={classes.resultField}
                        id="outlined-helperText"
                        label={expressionLabel || DEFAULTS.expressionLabel}

                        variant="outlined"
                        onChange={handleResultOnchange} value={expression}
                    />
                </Grid>
                <FormControlLabel control={<CustomSwitch checked={isPlayingAudio} onChange={handleIsPlayingAudio} name="radio-audio" />}
                        label="Play audio">
                    </FormControlLabel>
                <Grid item xs={12}>
                    {calculatorButton('(')}
                    {resetButton()}
                    {calculatorButton(')')}
                </Grid>

                <Grid item xs={12}>
                    {calculatorButton(7)}
                    {calculatorButton(8)}
                    {calculatorButton(9)}
                    {calculatorButton('*')}
                </Grid>

                <Grid item xs={12}>
                    {calculatorButton(4)}
                    {calculatorButton(5)}
                    {calculatorButton(6)}
                    {calculatorButton('-')}
                </Grid>
                <Grid item xs={12}>
                    {calculatorButton(3)}
                    {calculatorButton(2)}
                    {calculatorButton(1)}
                    {calculatorButton('+')}
                </Grid>
                <Grid item xs={12}>
                    {calculatorButton(0)}
                    {calculatorButton('.')}
                    {calculatorButton('/')}
                    {equalButton()}
                </Grid>
            </Grid>
        </div>
    )
};

export default Calculator;