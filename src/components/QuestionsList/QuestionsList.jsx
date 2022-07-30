import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { baseUrl, myFetch } from '../../utils';
import Question from '../Question/Question';
import css from './QuestionsList.module.css';

function QuestionsList() {
  const [questions, setQuestions] = useState([]);

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
  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <div className={css.questionsList_container}>
      QuestionsList
      {questions.map((qObj) => (
        <Question key={qObj.id_q} {...qObj} reload={reloadVotes} allArr={questions} />
      ))}
    </div>
  );
}

export default QuestionsList;