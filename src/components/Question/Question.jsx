import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl, editFetchAuth, fetchLikes, myFetch } from '../../utils';
import css from './Question.module.css';

function Question({
  id_q,

  title_q,
  body_q,
  like_q,
  edit_tst_q,
  add_tst_q,
  reload,
  edited_q,
  add_time_q,
  add_time_mili_q,
  likes_counter_q,
  allArr,
}) {
  //-----------------USER_ID ish conteksto!!!!!!!!
  const { user_id, token, isUserLoggedIn } = useAuthCtx();
  //   console.log('tokenas', token, isUserLoggedIn);
  const history = useHistory();
  const [answers, setAnswers] = useState([]);
  //   const [like, setLike] = useState('');

  //---------------------------------------------------I atsakymus
  function handler() {
    history.push(`/answers/${id_q}`);
  }
  //---------------------------------------------------Atsakymu parsiuntimas
  const getAnswers = async () => {
    const fetchResult = await myFetch(`${baseUrl}/questions/${id_q}/answers`);

    setAnswers(fetchResult);
  };
  //---------------------------------------------------Like
  async function likesUp() {
    const likesArr = await myFetch(`${baseUrl}/questions/likes/${user_id}/${id_q}`);
    console.log('ka siuncia', user_id, id_q);
    console.log('likesArr likesUp', likesArr);
    // const kaiDarNiekasNeLaikinoArr = likesArr.filter((likeObj) => likeObj.like_q === null);
    // console.log('kaiDarNiekasNeLaikinoArr', kaiDarNiekasNeLaikinoArr);
    console.log('Ar nepakitp likesArr', likesArr);
    const arUserisJauPalaikinesArr = likesArr.filter((likesObj) => likesObj.user_id === +user_id);
    console.log('arUserisJauPalaikinesArr', arUserisJauPalaikinesArr);

    !arUserisJauPalaikinesArr.length && sukuriamLaika();
    // console.log(arUserisJauPalaikinesArr[0].like_q);
    if (arUserisJauPalaikinesArr.length) {
      arUserisJauPalaikinesArr[0].like_q ? console.log('Tu jau laikinai') : laikinam();
    }

    // !likesArr.length
    //   ? sukuriamLaika()
    //   : likesArr[0].like_q
    //   ? console.log('Tu jau laikinai')
    //   : laikinam();
  }

  async function sukuriamLaika() {
    const rezultatasLaikinam = await editFetchAuth(
      `${baseUrl}/questions/likes/${user_id}/${id_q}`,
      token
    );

    console.log('RezultatasLaikinam', rezultatasLaikinam);
    rezultatasLaikinam.affectedRows === 1 && likesUpNumber();
  }
  async function laikinam() {
    const rezultatasLaikinam = await editFetchAuth(
      `${baseUrl}/questions/likes/dislikes/${user_id}/${id_q}`,
      token
    );
    console.log('RezultatasLaikinam po disliko', rezultatasLaikinam);
    rezultatasLaikinam.affectedRows === 1 && likesUpNumber();
  }

  async function likesUpNumber() {
    const body = {
      id_q: id_q,
    };
    const fetchResult = await fetchLikes(`${baseUrl}/questions/likes`, token, body);
    console.log('fetchResult', fetchResult);
    reload();
  }

  // async function likesUp() {
  //   const body = {
  //     id_q: id_q,
  //   };
  //   const fetchResult = await fetchLikes(`${baseUrl}/questions/likes`, token, body);
  //   console.log('fetchResult', fetchResult);
  //   reload();
  // }
  //-------------------------------------------------dislike

  async function likesDown() {
    const likesArr = await myFetch(`${baseUrl}/questions/likes/${user_id}/${id_q}`);
    console.log('ka siuncia', user_id, id_q);
    console.log('likesArr likesUp', likesArr);
    // const kaiDarNiekasNeLaikinoArr = likesArr.filter((likeObj) => likeObj.like_q === null);
    // console.log('kaiDarNiekasNeLaikinoArr', kaiDarNiekasNeLaikinoArr);
    console.log('Ar nepakitp likesArr', likesArr);
    const arUserisJauPalaikinesArr = likesArr.filter((likesObj) => likesObj.user_id === +user_id);
    console.log('arUserisJauPalaikinesArr', arUserisJauPalaikinesArr);

    !arUserisJauPalaikinesArr.length && sukuriamDisLaika();
    // console.log(arUserisJauPalaikinesArr[0].like_q);
    if (arUserisJauPalaikinesArr.length) {
      !arUserisJauPalaikinesArr[0].like_q ? console.log('Tu jau DIS laikinai') : disLaikinam();
    }

    // !likesArr.length
    //   ? sukuriamLaika()
    //   : likesArr[0].like_q
    //   ? console.log('Tu jau laikinai')
    //   : laikinam();
  }

  async function sukuriamDisLaika() {
    const rezultatasLaikinam = await editFetchAuth(
      `${baseUrl}/questions/likes/2/${user_id}/${id_q}`,
      token
    );

    console.log('RezultatasLaikinam', rezultatasLaikinam);
    rezultatasLaikinam.affectedRows === 1 && likesDownNumber();
  }
  async function disLaikinam() {
    const rezultatasLaikinam = await editFetchAuth(
      `${baseUrl}/questions/likes/2/dislikes/${user_id}/${id_q}`,
      token
    );
    console.log('RezultatasLaikinam po disliko', rezultatasLaikinam);
    rezultatasLaikinam.affectedRows === 1 && likesDownNumber();
  }

  async function likesDownNumber() {
    const body = {
      id_q: id_q,
    };
    const fetchResult = await fetchLikes(`${baseUrl}/questions/dislikes`, token, body);
    console.log('fetchResult', fetchResult);
    reload();
  }
  //   async function likesDown() {
  //     const body = {
  //       id_q: id_q,
  //     };
  //     const fetchResult = await fetchLikes(`${baseUrl}/questions/dislikes`, token, body);
  //     console.log('fetchResult', fetchResult);
  //     reload();
  //   }
  //----------------------------------------------------------
  useEffect(() => {
    getAnswers();
  }, []);
  return (
    <div className={css.question_container}>
      <div className={css.question_left_side}>
        {isUserLoggedIn && <i className='fa fa-caret-up' aria-hidden='true' onClick={likesUp}></i>}

        <p className={css.votes}> votes {like_q} </p>
        {isUserLoggedIn && (
          <i className='fa fa-caret-down' aria-hidden='true' onClick={likesDown}></i>
        )}

        <p className={css.answers}>answers {answers.length}</p>
      </div>
      <div className={css.question_middle_side} onClick={handler}>
        <h3>{title_q}</h3>
        <p>{body_q}</p>
      </div>

      <div className={css.question_right_side}>
        {<p> Add {add_time_q} </p>}
        {isUserLoggedIn && edited_q ? <p>Edited </p> : ''}{' '}
      </div>
    </div>
  );
}

export default Question;
