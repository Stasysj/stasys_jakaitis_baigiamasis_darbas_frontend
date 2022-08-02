import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl, deleteFetchAuth, myFetch } from '../../utils';
import toast, { Toaster } from 'react-hot-toast';
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
  number_a,
}) {
  const { token, isUserLoggedIn } = useAuthCtx();
  const history = useHistory();
  const [answers, setAnswers] = useState([]);

  //---------------------------------------------------Atsakymu parsiuntimas
  const getAnswers = async () => {
    const fetchResult = await myFetch(`${baseUrl}/questions/${id_q}/answers`);
    setAnswers(fetchResult);
  };

  //----------------------------------------------------------Dlete Hanler

  const deleteQuestionAndAnswers = async () => {
    // eslint-disable-next-line no-unused-vars
    const fetchResultQuestion = await deleteFetchAuth(`${baseUrl}/questions/${id_q}`, token);

    // eslint-disable-next-line no-unused-vars
    const fetchResultQuestionAnswers = await deleteFetchAuth(
      `${baseUrl}/answers/all/${id_q}`,
      token
    );

    reload();
  };
  const deleteQuestion = async () => {
    const fetchResultQuestion = await deleteFetchAuth(`${baseUrl}/questions/${id_q}`, token);

    const notify = () =>
      toast.success('Klausimas sėkmingai ištrintas.', {
        duration: 2000,
        position: 'top-center',
      });
    fetchResultQuestion === 'Question successfully deleted' &&
      notify() &&
      setTimeout(() => {
        reload();
      }, 2000);
  };

  const editQuetion = async () => {
    history.push(`/questions/${id_q}`);
  };

  useEffect(() => {
    getAnswers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className={css.question_container}>
      <Toaster />
      <div className={css.question_left_side}>
        <p className={css.votes}> votes {like_q} </p>
        <p className={css.answers}>answers {answers.length}</p>
      </div>
      <div className={css.question_middle_side}>
        <h3>{title_q}</h3>
        <p>{body_q}</p>
        <button onClick={editQuetion}>Edit</button>
        <button onClick={number_a ? deleteQuestionAndAnswers : deleteQuestion}>Delete</button>
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
