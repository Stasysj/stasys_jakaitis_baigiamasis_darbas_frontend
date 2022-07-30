import './Reset.css';
import './App.css';

import { Route, Switch } from 'react-router';
import HomePage from './pages/Home/HomePage';
import LoginPage from './pages/Login/LoginPage';
import RegisterPage from './pages/Register/RegisterPage';
import Header from './components/Header/Header';

import AnswersPage from './pages/AnswersPage/AnswersPage';
import PrivatePage from './pages/PrivatePage/PrivatePage';
import MyQuestionsPage from './pages/MyQuestionsPage/MyQuestionsPage';
import MyAnswerPage from './pages/MyAnswerPage/MyAnswerPage';
import AddQuestionPage from './pages/AddQuestionPage/AddQuestionPage';

function App() {
  return (
    <div className='App'>
      <Header />
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
        <Route path={'/answers/:id_q'}>
          <AnswersPage />
        </Route>

        <Route path={'/private/questions/:user_id'}>
          <MyQuestionsPage />
        </Route>
        <Route path={'/add/private/questions/:user_id'}>
          <AddQuestionPage />
        </Route>

        <Route path={'/private/answers/:user_id'}>
          <MyAnswerPage />
        </Route>

        <Route path='*'>
          <h2>404 Not found</h2>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
