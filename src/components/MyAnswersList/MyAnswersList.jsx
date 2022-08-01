import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl, getFetchAuth, myFetch } from '../../utils';
import Answers from '../Answers/Answers';
import PrivateAnswers from '../PrivateAnswers/PrivateAnswers';

import css from './MyAnswersList.module.css';

function MyAnswersList() {
  const [answers, setAnswers] = useState([]);
  const { token, isUserLoggedIn, user_id } = useAuthCtx();
  //   const [questions, setQuestions] = useState([]);
  //   const { user_id } = useParams();
  console.log('user_id ', user_id);

  //   const getQuestions = async () => {
  //     const fetchQuest = await myFetch(`${baseUrl}/questions/${id_q}`);

  //     setQuestions(fetchQuest);

  //     // console.log('func', resu);
  //   };
  const getAnswers = async () => {
    const fetchResult = await getFetchAuth(`${baseUrl}/private/answers/${user_id}`, token);
    setAnswers(fetchResult);
  };
  console.log('MyAnswers', answers);
  //   console.log('uzh func', questions);

  //---------------------------------------Reload answers children
  function reload() {
    getAnswers();
  }
  //---------------------------------------
  useEffect(() => {
    getAnswers();
    // getQuestions();
  }, []);

  return (
    <div className={css.answersList_container}>
      {/* <h3>{questions.length ? questions[0].title_q : 'Lauding.......'}</h3>

      <p>{questions.length ? questions[0].body_q : 'Lauding.......'}</p> */}
      <div className={css.line}></div>
      {answers.length > 0 ? (
        answers.map((aObj) => <PrivateAnswers key={aObj.id_a} {...aObj} reload={reload} />)
      ) : (
        <p className={css.nulisIrasu}>Jūs dar neparšėte nei vieno atsakymo!</p>
      )}
    </div>
  );
}

export default MyAnswersList;
