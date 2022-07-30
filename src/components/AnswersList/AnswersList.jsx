import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl, myFetch } from '../../utils';
import Answers from '../Answers/Answers';

import css from './AnswersList.module.css';

function AnswersList() {
  const [answers, setAnswers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const { id_q } = useParams();
  console.log('id_q ', id_q);

  const getQuestions = async () => {
    const fetchQuest = await myFetch(`${baseUrl}/questions/${id_q}`);

    setQuestions(fetchQuest);

    // console.log('func', resu);
  };
  const getAnswers = async () => {
    const fetchResult = await myFetch(`${baseUrl}/questions/${id_q}/answers`);
    setAnswers(fetchResult);
  };
  console.log('uzh func', questions);

  //---------------------------------------Reload votes children
  function reloadVotes() {
    getAnswers();
  }
  //---------------------------------------
  useEffect(() => {
    getAnswers();
    getQuestions();
  }, []);

  return (
    <div className={css.answersList_container}>
      <h3>{questions.length ? questions[0].title_q : 'Lauding.......'}</h3>

      <p>{questions.length ? questions[0].body_q : 'Lauding.......'}</p>
      {answers.map((aObj) => (
        <Answers key={aObj.id_a} {...aObj} reload={reloadVotes} />
      ))}
    </div>
  );
}

export default AnswersList;