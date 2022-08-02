import React from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl, deleteFetchAuth } from '../../utils';
import css from '../Question/Question.module.css';
import toast, { Toaster } from 'react-hot-toast';

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
  const history = useHistory();

  //----------------------------------------------------------Dlete Hanler

  const deleteAnswer = async () => {
    const fetchResult = await deleteFetchAuth(`${baseUrl}/answers/${id_a}`, token);
    const notify = () =>
      toast.success('Atsakymas sėkmingai ištrintas.', {
        duration: 2000,
        position: 'top-center',
      });
    fetchResult === 'Answer successfully deleted' &&
      notify() &&
      setTimeout(() => {
        reload();
      }, 2000);
  };
  const editAnswer = async () => {
    history.push(`/edit/answer/${id_a}`);
  };

  useEffect(() => {}, []);
  return (
    <div className={css.question_container}>
      <Toaster />
      <div className={css.question_left_side}>
        <p className={css.votes}> votes {like_a} </p>
      </div>
      <div className={css.question_middle_side}>
        <p>{body_a}</p>
        <button onClick={editAnswer}>Edit</button>
        <button onClick={deleteAnswer}>Delete</button>
      </div>
      {isUserLoggedIn && (
        <div className={css.question_right_side}>
          {<p> Add {add_time_a} </p>}
          {edited_a ? <p>Edited </p> : ''}
        </div>
      )}
    </div>
  );
}

export default PrivateAnswers;
