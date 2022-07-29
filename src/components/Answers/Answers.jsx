import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl, myFetch } from '../../utils';
import css from './Answers.module.css';

function Answers({ id_a, user_id, title_a, body_a, like_a, edit_tst_a, add_tst_a }) {
  //   const [questions, setQuestions] = useState([]);
  //   const { id_q } = useParams();
  //   const getQuestion = async () => {
  //     const fetchQuest = await myFetch(`${baseUrl}/questions`);
  //     setQuestions(fetchQuest);
  //   };
  //   useEffect(() => {
  //     getQuestion();
  //   }, []);
  return (
    <div className={css.answers_container}>
      <div className={css.answers_left_side}>
        <p>votes {like_a}</p>
      </div>
      <div className={css.answers_middle_side}>
        <p>{body_a}</p>
      </div>
      <div className={css.answers_right_side}>
        {edit_tst_a ? (
          <p>Edited {edit_tst_a.split('T')[0]} </p>
        ) : (
          <p>Created {add_tst_a.split('T')[0]} </p>
        )}
      </div>
    </div>
  );
}

export default Answers;
