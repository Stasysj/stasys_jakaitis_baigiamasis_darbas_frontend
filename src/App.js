import './App.css';

import { Route, Switch } from 'react-router';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';

function App() {
  return (
    <div className='App'>
      <h1>Egzaminas frontas</h1>

      <Switch>
        <Route exact path={'/'}>
          <HomePage />
        </Route>

        <Route path={'/login'}>
          <LoginPage />
        </Route>
        <Route path={'/register'}>
          <RegisterPage />
        </Route>
        <Route path='*'>
          <h2>404 Not found</h2>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
