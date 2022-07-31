import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl, deleteFetchAuth, editFetchAuth, fetchLikes, myFetch } from '../../utils';
import css from '../Question/Question.module.css';

function PrivateQuestions({
  id_q,
  user_id,
  title_q,
  body_q,
  like_q,
  edit_tst_q,
  add_tst_q,
  reload,
  likes_counter_q,
  allArr,
  edited_q,
  add_time_q,
}) {
  const { token, isUserLoggedIn } = useAuthCtx();
  //   console.log('tokenas', token, isUserLoggedIn);
  const history = useHistory();
  const [answers, setAnswers] = useState([]);
  //   const [like, setLike] = useState('');

  //---------------------------------------------------I atsakymus
  //   function handler() {
  //     history.push(`/answers/${id_q}`);
  //   }
  //---------------------------------------------------Atsakymu parsiuntimas
  const getAnswers = async () => {
    const fetchResult = await myFetch(`${baseUrl}/questions/${id_q}/answers`);
    // console.log('ddddddddddd', fetchResult);
    setAnswers(fetchResult);
  };
  //---------------------------------------------------Like
  //   async function likesUp() {
  //     // const arNesikartojaId = allArr.find((obj) => obj.id_q === id_q).likes_counter_q.split('z');

  //     // console.log('objektas', arNesikartojaId);
  //     // console.log(typeof user_id);
  //     // console.log(arNesikartojaId, user_id);
  //     // console.log('boolian', arNesikartojaId.includes(user_id));
  //     // if (arNesikartojaId.includes(user_id.toString())) {
  //     //   console.log('Tu jau laikinai');
  //     //   return;
  //     // }
  //     //--------
  //     const body = {
  //       id_q: id_q,
  //       //   user_id: user_id,
  //     };
  //     const fetchResult = await fetchLikes(`${baseUrl}/questions/likes`, token, body);
  //     // const fetchResults = await fetchLikes(`${baseUrl}/questions/dis/counts`, token, body);
  //     console.log('fetchResult', fetchResult);
  //     reload();
  //   }
  //-------------------------------------------------dislike
  //   async function likesDown() {
  //     const body = {
  //       id_q: id_q,
  //       //   user_id: user_id,
  //     };
  //     const fetchResult = await fetchLikes(`${baseUrl}/questions/dislikes`, token, body);
  //     console.log('fetchResult', fetchResult);
  //     reload();
  //   }
  //----------------------------------------------------------Dlete Hanler

  const deleteQuestion = async () => {
    const fetchResultQuestion = await deleteFetchAuth(`${baseUrl}/questions/${id_q}`, token);
    console.log('istrynem klausimus');
    console.log('q id---', id_q);
    const fetchResultQuestionAnswers = await deleteFetchAuth(
      `${baseUrl}/answers/all/${id_q}`,
      token
    );

    // setAnswers(fetchResult);
    reload();
  };
  const editQuetion = async () => {
    history.push(`/questions/${id_q}`);
  };

  useEffect(() => {
    getAnswers();
  }, []);
  return (
    <div className={css.question_container}>
      <div className={css.question_left_side}>
        {/* {isUserLoggedIn && <i className='fa fa-caret-up' aria-hidden='true' onClick={likesUp}></i>} */}

        <p className={css.votes}> votes {like_q} </p>
        {/* {isUserLoggedIn && (
          <i className='fa fa-caret-down' aria-hidden='true' onClick={likesDown}></i>
        )} */}

        <p className={css.answers}>answers {answers.length}</p>
      </div>
      <div className={css.question_middle_side}>
        <h3>{title_q}</h3>
        <p>{body_q}</p>
        <button onClick={editQuetion}>Edit</button>
        <button onClick={deleteQuestion}>Delete</button>
      </div>
      {isUserLoggedIn && (
        <div className={css.question_right_side}>
          {<p> Add {add_time_q} </p>}
          {edited_q ? <p>Edited </p> : ''}
        </div>
      )}
    </div>
  );
}

export default PrivateQuestions;
