import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl, deleteFetchAuth, getFetchAuth, myFetch } from '../../utils';
import css from '../Question/Question.module.css';

function PrivateAnswers({
  id_a,
  user_id,
  title_a,
  body_a,
  like_a,
  edit_tst_a,
  add_tst_a,
  reload,
  edited_a,
  likes_counter_q,
  allArr,
  add_time_a,
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
  // const getAnswers = async () => {
  //   const fetchResult = await getFetchAuth(`${baseUrl}/questions/${id_q}/answers`);
  //   // console.log('ddddddddddd', fetchResult);
  //   setAnswers(fetchResult);
  // };
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

  const deleteAnswer = async () => {
    const fetchResult = await deleteFetchAuth(`${baseUrl}/answers/${id_a}`, token);
    // setAnswers(fetchResult);
    reload();
  };
  console.log('edited_a', edited_a);
  const editAnswer = async () => {
    history.push(`/edit/answer/${id_a}`);
  };

  useEffect(() => {
    // getAnswers();
  }, []);
  return (
    <div className={css.question_container}>
      <div className={css.question_left_side}>
        <p className={css.votes}> votes {like_a} </p>

        {/* <p className={css.answers}>answers {answers.length}</p> */}
      </div>
      <div className={css.question_middle_side}>
        {/* <h3>{title_a}</h3> */}
        <p>{body_a}</p>
        <button onClick={editAnswer}>Edit</button>
        <button onClick={deleteAnswer}>Delete</button>
      </div>
      {isUserLoggedIn && (
        <div className={css.answers_right_side}>
          {<p> Add {add_time_a} </p>}
          {edited_a ? <p>Edited </p> : ''}
        </div>
      )}
    </div>
  );
}

export default PrivateAnswers;
