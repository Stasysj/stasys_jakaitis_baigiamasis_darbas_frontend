import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { baseUrl, myFetch } from '../../utils';
import css from './Question.module.css';

function Question({ id_q, user_id, title_q, body_q, like_q, edit_tst_q, add_tst_q }) {
  const history = useHistory();
  const [answers, setAnswers] = useState([]);

  function handler() {
    history.push(`/answers/${id_q}`);
  }
  const getAnswers = async () => {
    const fetchResult = await myFetch(`${baseUrl}/questions/${id_q}/answers`);
    console.log('ddddddddddd', fetchResult);
    setAnswers(fetchResult);
    // setQuestions(fetchResult);
  };
  useEffect(() => {
    getAnswers();
  }, []);
  return (
    <div className={css.question_container}>
      <div className={css.question_left_side}>
        <p>votes {like_q}</p>
        <p>answers {answers.length}</p>
      </div>
      <div className={css.question_middle_side} onClick={handler}>
        <h3>{title_q}</h3>
        <p>{body_q}</p>
      </div>
      <div className={css.question_right_side}>
        {/* {edit_tst_q ? <p>Edited {edit_tst_q} </p> : <p>Created {add_tst_q} </p>} */}

        {edit_tst_q ? (
          <p>Edited {edit_tst_q.split('T')[0]} </p>
        ) : (
          //   <p>Created {add_tst_q.split('T')[0]} </p>
          <p>Created {add_tst_q.split('T')[0]} </p>
        )}
      </div>
    </div>
  );
}

export default Question;
