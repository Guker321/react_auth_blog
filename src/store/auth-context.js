import React, { useState } from 'react';

export const AuthContext = React.createContext({
  authToken: '',
  isLoggedIn: false,
  login: (authToken) => {},
  logout: () => {},
});

const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token;

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem('tokenId', token);
  };
  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem('tokenId');
  };

  const authContextValue = {
    authToken: '',
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
