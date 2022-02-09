import { useContext } from 'react';

import { Link } from 'react-router-dom';
import { AuthContext } from '../../store/auth-context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const authContext = useContext(AuthContext);
  const { isLoggedIn } = authContext;

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>Blog</div>
      </Link>
      <nav>
        <ul>
          {isLoggedIn ? (
            <>
              <li>
                <button onClick={authContext.logout}>Logout</button>
              </li>
              <li>
                <Link to='/blog'>Blog</Link>
              </li>
              <li>
                <Link to='/new-post'>Add Post</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to='/auth'>Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
