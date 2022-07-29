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

    console.log(fetchResult);
    setQuestions(fetchResult);
  };
  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <div className={css.questionsList_container}>
      QuestionsList
      {questions.map((qObj) => (
        <Question key={qObj.id_q} {...qObj} />
      ))}
    </div>
  );
}

export default QuestionsList;
