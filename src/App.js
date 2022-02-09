import { Switch, Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';

import Layout from './components/Layout/Layout';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import BlogPage from './pages/BlogPage';
import NewPostPage from './pages/NewPostPage';
import { AuthContext } from './store/auth-context';

function App() {
  const authContext = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
        {!authContext.isLoggedIn && (
          <Route path='/auth'>
            <AuthPage />
          </Route>
        )}
        {authContext.isLoggedIn && (
          <>
            <Route path='/new-post' exact>
              <NewPostPage />
            </Route>
            <Route path='/blog' exact>
              <BlogPage />
            </Route>
          </>
        )}
        <Route path='*'>
          <Redirect to='/' />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
