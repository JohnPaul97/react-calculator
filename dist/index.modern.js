import React, { useState, useEffect } from 'react';
import { Switch, Grid, TextField, FormControlLabel, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';

var INITIAL_RESULT = 0;
var DEFAULTS = {
  backgroundColor: '#7e7e7e',
  buttonColor: '#46403D',
  resultLabel: 'result',
  expressionLabel: 'expression'
};

var Calculator = function Calculator(props) {
  var backgroundColor = props.backgroundColor,
      buttonColor = props.buttonColor,
      resultLabel = props.resultLabel,
      expressionLabel = props.expressionLabel,
      classes = makeStyles(function (theme) {
    var _root;

    return {
      root: (_root = {
        padding: '10px',
        margin: '10px',
        width: '50%',
        backgroundColor: backgroundColor || DEFAULTS.backgroundColor,
        borderRadius: '10px',
        border: "1px solid black",
        flexGrow: 0
      }, _root["width"] = '300px', _root),
      button: {
        padding: theme.spacing(1),
        textAlign: "center",
        color: theme.palette.text.primary,
        backgroundColor: buttonColor || DEFAULTS.buttonColor,
        margin: "5px"
      },
      resultField: {
        padding: theme.spacing(1),
        backgroundColor: backgroundColor || DEFAULTS.backgroundColor
      },
      padding: {
        padding: 'top 10px'
      }
    };
  })(),
      audio = new Audio("https://storage.cloud.google.com/johnpaul-bucket/click2.mp3");
  var CustomSwitch = withStyles({
    switchBase: {
      color: backgroundColor || DEFAULTS.backgroundColor,
      '&$checked': {
        color: buttonColor || DEFAULTS.buttonColor
      },
      '&$checked + $track': {
        backgroundColor: buttonColor || DEFAULTS.buttonColor
      }
    },
    checked: {},
    track: {}
  })(Switch);

  var _useState = useState(INITIAL_RESULT),
      expression = _useState[0],
      setExpression = _useState[1];

  var _useState2 = useState(INITIAL_RESULT),
      result = _useState2[0],
      setResult = _useState2[1];

  var _useState3 = useState(true),
      isPlayingAudio = _useState3[0],
      setIsPlayingAudio = _useState3[1];

  var playsAudio = function playsAudio() {
    if (isPlayingAudio) {
      audio.play();
    }
  };

  var handleIsPlayingAudio = function handleIsPlayingAudio() {
    setIsPlayingAudio(!isPlayingAudio);
  };

  var handleOnClick = function handleOnClick(button) {
    playsAudio();
    var newExpr = expression !== 0 ? "" + expression + button : button;
    setExpression(newExpr);
  };

  useEffect(function () {
    updateResult();
  }, [expression]);

  var handleReset = function handleReset() {
    playsAudio();
    setExpression(INITIAL_RESULT);
    setResult(INITIAL_RESULT);
  };

  var handleEqualOnClick = function handleEqualOnClick() {
    playsAudio();
    setExpression(result);
  };

  var updateResult = function updateResult() {
    var newResult = null;

    try {
      newResult = eval(expression);
    } catch (err) {
      newResult = 'error';
    }

    setResult(newResult);
  };

  var handleResultOnchange = function handleResultOnchange(e) {
    var value = e.target.value;
    value === '' ? setExpression(0) : setExpression(value);
  };

  function calculatorButton(value) {
    return /*#__PURE__*/React.createElement(Button, {
      className: classes.button,
      onClick: function onClick() {
        return handleOnClick(value);
      }
    }, value);
  }

  function resetButton() {
    return /*#__PURE__*/React.createElement(Button, {
      className: classes.button,
      onClick: function onClick() {
        return handleReset();
      }
    }, "C");
  }

  function equalButton() {
    return /*#__PURE__*/React.createElement(Button, {
      className: classes.button,
      onClick: function onClick() {
        return handleEqualOnClick();
      }
    }, "=");
  }

  return /*#__PURE__*/React.createElement("div", {
    className: classes.root
  }, /*#__PURE__*/React.createElement(Grid, {
    container: true,
    spacing: 0
  }, /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/React.createElement(TextField, {
    className: classes.resultField,
    id: "outlined-helperText",
    label: resultLabel || DEFAULTS.resultLabel,
    variant: "outlined",
    value: result
  })), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 12
  }, /*#__PURE__*/React.createElement(TextField, {
    className: classes.resultField,
    id: "outlined-helperText",
    label: expressionLabel || DEFAULTS.expressionLabel,
    variant: "outlined",
    onChange: handleResultOnchange,
    value: expression
  })), /*#__PURE__*/React.createElement(FormControlLabel, {
    control: /*#__PURE__*/React.createElement(CustomSwitch, {
      checked: isPlayingAudio,
      onChange: handleIsPlayingAudio,
      name: "radio-audio"
    }),
    label: "Play audio"
  }), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 12
  }, calculatorButton('('), resetButton(), calculatorButton(')')), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 12
  }, calculatorButton(7), calculatorButton(8), calculatorButton(9), calculatorButton('*')), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 12
  }, calculatorButton(4), calculatorButton(5), calculatorButton(6), calculatorButton('-')), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 12
  }, calculatorButton(3), calculatorButton(2), calculatorButton(1), calculatorButton('+')), /*#__PURE__*/React.createElement(Grid, {
    item: true,
    xs: 12
  }, calculatorButton(0), calculatorButton('.'), calculatorButton('/'), equalButton())));
};

export default Calculator;
//# sourceMappingURL=index.modern.js.map
