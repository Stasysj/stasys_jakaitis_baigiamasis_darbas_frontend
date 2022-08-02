import React from 'react';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl, editFetchAuth, fetchLikes, myFetch } from '../../utils';
import css from './Answers.module.css';

function Answers({
  id_a,
  user_id,
  title_a,
  body_a,
  like_a,
  edit_tst_a,
  add_tst_a,
  reload,
  edited_a,
  add_time_mili_a,
  add_time_a,
}) {
  const { token, isUserLoggedIn } = useAuthCtx();
  //---------------------------------------------------Like
  async function likesUp() {
    const likesArr = await myFetch(`${baseUrl}/answers/likes/${user_id}/${id_a}`);

    const arUserisJauPalaikinesArr = likesArr.filter((likesObj) => likesObj.user_id === +user_id);

    !arUserisJauPalaikinesArr.length && sukuriamLaika();

    if (arUserisJauPalaikinesArr.length) {
      arUserisJauPalaikinesArr[0].like_a ? console.log('Tu jau dislaikinai') : laikinam();
    }
  }

  async function sukuriamLaika() {
    const rezultatasLaikinam = await editFetchAuth(
      `${baseUrl}/answers/likes/${user_id}/${id_a}`,
      token
    );

    rezultatasLaikinam.affectedRows === 1 && likesUpNumber();
  }
  async function laikinam() {
    const rezultatasLaikinam = await editFetchAuth(
      `${baseUrl}/answers/likes/dislikes/${user_id}/${id_a}`,
      token
    );
    rezultatasLaikinam.affectedRows === 1 && likesUpNumber();
  }

  async function likesUpNumber() {
    const body = {
      id_a: id_a,
    };
    // eslint-disable-next-line no-unused-vars
    const fetchResult = await fetchLikes(`${baseUrl}/answers/likes`, token, body);
    reload();
  }

  //---------------------------------------------------dislike
  async function likesDown() {
    const likesArr = await myFetch(`${baseUrl}/answers/likes/${user_id}/${id_a}`);
    const arUserisJauPalaikinesArr = likesArr.filter((likesObj) => likesObj.user_id === +user_id);

    !arUserisJauPalaikinesArr.length && sukuriamDisLaika();
    if (arUserisJauPalaikinesArr.length) {
      !arUserisJauPalaikinesArr[0].like_a ? console.log('Tu jau DIS laikinai') : disLaikinam();
    }
  }

  async function sukuriamDisLaika() {
    const rezultatasLaikinam = await editFetchAuth(
      `${baseUrl}/answers/likes/2/${user_id}/${id_a}`,
      token
    );

    console.log('RezultatasLaikinam', rezultatasLaikinam);
    rezultatasLaikinam.affectedRows === 1 && likesDownNumber();
  }
  async function disLaikinam() {
    const rezultatasLaikinam = await editFetchAuth(
      `${baseUrl}/answers/likes/2/dislikes/${user_id}/${id_a}`,
      token
    );
    console.log('RezultatasLaikinam po disliko', rezultatasLaikinam);
    rezultatasLaikinam.affectedRows === 1 && likesDownNumber();
  }

  async function likesDownNumber() {
    const body = {
      id_a: id_a,
    };
    const fetchResult = await fetchLikes(`${baseUrl}/answers/dislikes`, token, body);
    console.log('fetchResult', fetchResult);
    reload();
  }

  return (
    <div className={css.answers_container}>
      <div className={css.answers_left_side}>
        {isUserLoggedIn && <i className='fa fa-caret-up' aria-hidden='true' onClick={likesUp}></i>}

        <p className={css.votes}>votes: {like_a}</p>
        {isUserLoggedIn && (
          <i className='fa fa-caret-down' aria-hidden='true' onClick={likesDown}></i>
        )}
      </div>
      <div className={css.answers_middle_side}>
        <p>{body_a}</p>
      </div>
      <div className={css.answers_right_side}>
        {<p> Add {add_time_a} </p>}
        {isUserLoggedIn && edited_a ? <p className={css.edited}>Edited </p> : ''}
      </div>
    </div>
  );
}

export default Answers;
