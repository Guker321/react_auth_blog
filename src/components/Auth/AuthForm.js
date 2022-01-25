import { useState } from 'react';

import useInput from '../../hooks/use-input';

import classes from './AuthForm.module.css';

const AuthForm = (props) => {
  const [isLogin, setIsLogin] = useState(true);

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEnteredEmail,
  } = useInput((value) => value.trim().includes('@' && '.'));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetEnteredPassword,
  } = useInput((value) => value.trim().length > 7);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }
  console.log(formIsValid);

  const submitHandler = (event) => {
    event.preventDefault();

    resetEnteredEmail();
    resetEnteredPassword();
  };

  const emailInputClasses = emailHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const passwordInputClasses = passwordHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Вход' : 'Регистрация'}</h1>
      <form onSubmit={submitHandler}>
        <div className={`${emailInputClasses}`}>
          <label htmlFor='email'>Ваш E-mail</label>
          <input
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            type='email'
            id='email'
            required
          />
          {emailHasError && (
            <p className={classes.error_text}>Email Должен содержать @ и .</p>
          )}
        </div>
        <div className={`${passwordInputClasses}`}>
          <label htmlFor='password'>Ваш пароль</label>
          <input
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            type='password'
            id='password'
            required
          />
          {passwordHasError && (
            <p className={classes.error_text}>
              Длина пароля должна быть больше 7 символов
            </p>
          )}
        </div>
        <div className={classes.actions}>
          <button disabled={!formIsValid}>
            {isLogin ? 'Войти' : 'Создать нового пользователя'}
          </button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}>
            {isLogin
              ? 'Создать новый аккаунт'
              : 'Войти в уже созданный аккаунт'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
