import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl, fetchLikes, myFetch } from '../../utils';
import css from './Answers.module.css';

function Answers({ id_a, user_id, title_a, body_a, like_a, edit_tst_a, add_tst_a, reload }) {
  const { token, isUserLoggedIn } = useAuthCtx();
  //   const [questions, setQuestions] = useState([]);
  //   const { id_q } = useParams();
  //   const getQuestion = async () => {
  //     const fetchQuest = await myFetch(`${baseUrl}/questions`);
  //     setQuestions(fetchQuest);
  //   };
  //   useEffect(() => {
  //     getQuestion();
  //   }, []);
  //---------------------------------------------------Like
  async function likesUp() {
    const body = {
      id_a: id_a,
      //   user_id: user_id,
    };
    const fetchResult = await fetchLikes(`${baseUrl}/answers/likes`, token, body);
    // const fetchResults = await fetchLikes(`${baseUrl}/questions/dis/counts`, token, body);
    console.log('fetchResult', fetchResult);
    reload();
  }
  //---------------------------------------------------dislike
  async function likesDown() {
    const body = {
      id_a: id_a,
      //   user_id: user_id,
    };
    const fetchResult = await fetchLikes(`${baseUrl}/answers/dislikes`, token, body);
    console.log('fetchResult', fetchResult);
    reload();
  }
  return (
    <div className={css.answers_container}>
      <div className={css.answers_left_side}>
        {isUserLoggedIn && <i className='fa fa-caret-up' aria-hidden='true' onClick={likesUp}></i>}

        <p className={css.votes}>votes {like_a}</p>
        {isUserLoggedIn && (
          <i className='fa fa-caret-down' aria-hidden='true' onClick={likesDown}></i>
        )}
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
