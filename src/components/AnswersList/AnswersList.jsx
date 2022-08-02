import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { baseUrl, myFetch } from '../../utils';
import Answers from '../Answers/Answers';

import css from './AnswersList.module.css';
import cssM from '../PrivateQuestionsLits/PrivateQuestionList.module.css';
import { useAuthCtx } from '../../store/authContext';

function AnswersList() {
  const { isUserLoggedIn } = useAuthCtx();
  const history = useHistory();
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { id_q } = useParams();
  console.log('id_q ', id_q);

  const getQuestions = async () => {
    const fetchQuest = await myFetch(`${baseUrl}/questions/${id_q}`);
    setQuestions(fetchQuest);
  };
  const getAnswers = async () => {
    const fetchResult = await myFetch(`${baseUrl}/questions/${id_q}/answers`);
    setAnswers(fetchResult);
  };

  //---------------------------------------Reload votes children
  function reloadVotes() {
    getAnswers();
  }
  //---------------------------------------
  function clickHandler() {
    history.push(`/add/private/answers/${id_q}`);
  }

  useEffect(() => {
    getAnswers();
    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={css.answersList_container}>
      {isUserLoggedIn && (
        <div className={cssM.button_container}>
          <button onClick={clickHandler}>Add new Answer</button>
        </div>
      )}

      <h3>{questions.length ? questions[0].title_q : 'Lauding.......'}</h3>

      <p>{questions.length ? questions[0].body_q : 'Lauding.......'}</p>
      <div className={css.line}></div>
      {answers.length === 0 && <p className={css.nulisIrasu}>Į šį klausimą dar niekas neatsakė.</p>}
      {answers.map((aObj) => (
        <Answers key={aObj.id_a} {...aObj} reload={reloadVotes} />
      ))}
    </div>
  );
}

export default AnswersList;
