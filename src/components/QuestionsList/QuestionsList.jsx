import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { baseUrl, myFetch } from '../../utils';
import Question from '../Question/Question';
import css from './QuestionsList.module.css';
import cssM from '../PrivateQuestionsLits/PrivateQuestionList.module.css';
import { useHistory } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';

function QuestionsList() {
  const { token, isUserLoggedIn, user_id } = useAuthCtx();
  const [questions, setQuestions] = useState([]);
  const history = useHistory();

  const getQuestions = async () => {
    const fetchResult = await myFetch(`${baseUrl}/questions`);

    // const fetchResult2 = await myFetch(`${baseUrl}/questions/${id_q}/answers`);

    // console.log(fetchResult);
    setQuestions(fetchResult);
  };
  //---------------------------------------Reload votes children
  function reloadVotes() {
    getQuestions();
  }
  //---------------------------------------
  function clickHandler() {
    history.push(`/add/private/questions/${user_id}`);
  }
  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <div className={css.questionsList_container}>
      QuestionsList
      <div className={cssM.button_container}>
        <button onClick={clickHandler}>Add new question</button>
      </div>
      <div className={css.antrastes}>
        <p>Filtruoti klausimus:</p>
        <p>Rūšiuoti pagal:</p>
      </div>
      <div className={css.all_buttons_container}>
        <div className={css.button_container}>
          <button>Atsakyti klausimai </button>
          <button>Neatsakyti klausimai </button>
        </div>
        <div className={css.button_container}>
          <button>Atsakymų skaičių </button>
          <button>Datą </button>
        </div>
      </div>
      {questions.map((qObj) => (
        <Question key={qObj.id_q} {...qObj} reload={reloadVotes} allArr={questions} />
      ))}
    </div>
  );
}

export default QuestionsList;
