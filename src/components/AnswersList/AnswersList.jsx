import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl, myFetch } from '../../utils';
import Answers from '../Answers/Answers';
import css from './AnswersList.module.css';

function AnswersList() {
  const [answers, setAnswers] = useState([]);
  const { id_q } = useParams();
  console.log('id_q ', id_q);

  const getAnswers = async () => {
    const fetchResult = await myFetch(`${baseUrl}/questions/${id_q}/answers`);
    console.log(fetchResult);
    setAnswers(fetchResult);
    // setQuestions(fetchResult);
  };
  useEffect(() => {
    getAnswers();
  }, []);

  return (
    <div className={css.answersList_container}>
      {answers.map((aObj) => (
        <Answers key={aObj.id_a} {...aObj} />
      ))}
    </div>
  );
}

export default AnswersList;
