import { useState } from 'react';

const useInput = (validateValue) => {
  const [enteredValue, setEnteredValue] = useState('');
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHanvler = (event) => {
    setEnteredValue(event.target.value);
  };

  const inputBluerHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue('');
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    hasError: hasError,
    isValid: valueIsValid,
    valueChangeHandler: valueChangeHanvler,
    inputBlurHandler: inputBluerHandler,
    reset: reset,
  };
};

export default useInput;
