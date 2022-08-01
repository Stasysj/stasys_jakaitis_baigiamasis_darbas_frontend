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
import EditQuestionPage from './pages/EditQuestionPage/EditQuestionPage';
import EditAnswerPage from './pages/EditAnswerPage/EditAnswerPage';
import AddAnswerPage from './pages/AddAnswerPage/AddAnswerPage';
import ProtectedRoute from './components/ProtectedRoute';

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
        {/* Privati info */}
        {/* <ProtectedRoute> */}
        <Route path={'/private/questions/:user_id'}>
          <MyQuestionsPage />
        </Route>
        <Route path={'/add/private/questions/:user_id'}>
          <AddQuestionPage />
        </Route>

        <Route path={'/private/answers/:user_id'}>
          <MyAnswerPage />
        </Route>

        <Route path={'/questions/:id_q'}>
          <EditQuestionPage />
        </Route>
        <Route path={'/edit/answer/:id_a'}>
          <EditAnswerPage />
        </Route>

        <Route path={'/add/private/answers/:id_q'}>
          <AddAnswerPage />
        </Route>
        {/* </ProtectedRoute> */}

        <Route path='*'>
          <h2>404 Not found</h2>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
