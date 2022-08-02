import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
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
    const likesArr = await myFetch(`${baseUrl}/answers/likes/${user_id}/${id_a}`);
    console.log('ka siuncia', user_id, id_a);
    console.log('likesArr likesUp', likesArr);

    console.log('Ar nepakitp likesArr', likesArr);
    const arUserisJauPalaikinesArr = likesArr.filter((likesObj) => likesObj.user_id === +user_id);
    console.log('arUserisJauPalaikinesArr', arUserisJauPalaikinesArr);

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

    console.log('RezultatasLaikinam', rezultatasLaikinam);
    rezultatasLaikinam.affectedRows === 1 && likesUpNumber();
  }
  async function laikinam() {
    const rezultatasLaikinam = await editFetchAuth(
      `${baseUrl}/answers/likes/dislikes/${user_id}/${id_a}`,
      token
    );
    console.log('RezultatasLaikinam po disliko', rezultatasLaikinam);
    rezultatasLaikinam.affectedRows === 1 && likesUpNumber();
  }

  async function likesUpNumber() {
    const body = {
      id_a: id_a,
    };
    const fetchResult = await fetchLikes(`${baseUrl}/answers/likes`, token, body);
    console.log('fetchResult', fetchResult);
    reload();
  }

  //   async function likesUp() {
  //     const body = {
  //       id_a: id_a,
  //       //   user_id: user_id,
  //     };
  //     const fetchResult = await fetchLikes(`${baseUrl}/answers/likes`, token, body);
  //     // const fetchResults = await fetchLikes(`${baseUrl}/questions/dis/counts`, token, body);
  //     console.log('fetchResult', fetchResult);
  //     reload();
  //   }
  //---------------------------------------------------dislike
  async function likesDown() {
    const likesArr = await myFetch(`${baseUrl}/answers/likes/${user_id}/${id_a}`);
    console.log('ka siuncia', user_id, id_a);
    console.log('likesArr likesUp', likesArr);
    // const kaiDarNiekasNeLaikinoArr = likesArr.filter((likeObj) => likeObj.like_q === null);
    // console.log('kaiDarNiekasNeLaikinoArr', kaiDarNiekasNeLaikinoArr);
    console.log('Ar nepakitp likesArr', likesArr);
    const arUserisJauPalaikinesArr = likesArr.filter((likesObj) => likesObj.user_id === +user_id);
    console.log('arUserisJauPalaikinesArr', arUserisJauPalaikinesArr);

    !arUserisJauPalaikinesArr.length && sukuriamDisLaika();
    // console.log(arUserisJauPalaikinesArr[0].like_q);
    if (arUserisJauPalaikinesArr.length) {
      !arUserisJauPalaikinesArr[0].like_a ? console.log('Tu jau DIS laikinai') : disLaikinam();
    }

    // !likesArr.length
    //   ? sukuriamLaika()
    //   : likesArr[0].like_q
    //   ? console.log('Tu jau laikinai')
    //   : laikinam();
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
  //   async function likesDown() {
  //     const body = {
  //       id_a: id_a,
  //       //   user_id: user_id,
  //     };
  //     const fetchResult = await fetchLikes(`${baseUrl}/answers/dislikes`, token, body);
  //     console.log('fetchResult', fetchResult);
  //     reload();
  //   }
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
