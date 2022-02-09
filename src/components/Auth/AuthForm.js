import { useState, useContext } from 'react';
import useInput from '../../hooks/use-input';

import classes from './AuthForm.module.css';

import LoadingSpinner from '../UI/LoadingSpinner';
import { AuthContext } from '../../store/auth-context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const API_KEY = process.env.REACT_APP_AUTH_KEY;
const URL_REGISTRATION = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
const URL_LOGIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;

const AuthForm = () => {
  const authContext = useContext(AuthContext);
  const history = useHistory();

  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    setError(null);
  };

  let formIsValid = false;

  if (enteredEmailIsValid && enteredPasswordIsValid) {
    formIsValid = true;
  } else {
    formIsValid = false;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);

    fetch(`${!isLogin ? URL_REGISTRATION : URL_LOGIN}`, {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          history.push('/')
          return response.json();
        } else {
          return response.json().then((data) => {
            console.log(data);
            throw new Error('Authentication failed');
          });
        }
      })
      .then((data) => authContext.login(data.idToken))
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });

    resetEnteredEmail();
    resetEnteredPassword();
  };

  let authError = 'Пользователь не найден или неправильно введен пароль';

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
          {error && <p className={classes.error_text}>{authError}</p>}
          {isLoading && <LoadingSpinner />}

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
