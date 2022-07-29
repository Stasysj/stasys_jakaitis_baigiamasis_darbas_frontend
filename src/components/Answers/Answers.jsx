import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl, myFetch } from '../../utils';
import css from './Answers.module.css';

function Answers({ id_a, user_id, title_a, body_a, like_a, edit_tst_a, add_tst_a }) {
  return (
    <div className={css.question_container}>
      <div className={css.question_left_side}>
        <p>votes {}</p>
        <p>answers {}</p>
      </div>
      <div className={css.question_middle_side}>
        <h3>title_q{}</h3>
        <p>body_q{}</p>
      </div>
      <div className={css.question_right_side}>
        {/* {edit_tst_q ? <p>Edited {edit_tst_q} </p> : <p>Created {add_tst_q} </p>} */}

        {/* {edit_tst_q ? (
          <p>Edited {edit_tst_q.split('T')[0]} </p>
        ) : (
          <p>Created {add_tst_q.split('T')[0]} </p>
        )} */}
      </div>
    </div>
  );
}

export default Answers;
