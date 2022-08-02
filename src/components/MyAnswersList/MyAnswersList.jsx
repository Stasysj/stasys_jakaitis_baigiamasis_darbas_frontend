import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl, getFetchAuth } from '../../utils';
import PrivateAnswers from '../PrivateAnswers/PrivateAnswers';

import css from './MyAnswersList.module.css';

function MyAnswersList() {
  const [answers, setAnswers] = useState([]);
  const { token, user_id } = useAuthCtx();
  const getAnswers = async () => {
    const fetchResult = await getFetchAuth(`${baseUrl}/private/answers/${user_id}`, token);
    setAnswers(fetchResult);
  };

  //---------------------------------------Reload answers children
  function reload() {
    getAnswers();
  }
  //---------------------------------------
  useEffect(() => {
    getAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={css.answersList_container}>
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
