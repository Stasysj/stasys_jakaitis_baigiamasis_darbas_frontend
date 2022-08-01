import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { baseUrl, myFetch } from '../../utils';
import Question from '../Question/Question';
import css from './QuestionsList.module.css';
import cssM from '../PrivateQuestionsLits/PrivateQuestionList.module.css';
import { useHistory } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';

function QuestionsList() {
  const { token, isUserLoggedIn, user_id } = useAuthCtx();
  const [questions, setQuestions] = useState([]);
  const [rykiavimasData, setRykiavimasData] = useState(true);
  const [rykiavimasAtsakymus, setRykiavimasAtsakymus] = useState(true);
  const [rykiavimasBalsai, setRykiavimasBalsai] = useState(true);

  const history = useHistory();

  const getQuestions = async () => {
    const fetchResult = await myFetch(`${baseUrl}/questions`);

    // const fetchResult2 = await myFetch(`${baseUrl}/questions/${id_q}/answers`);

    console.log('QUsetion list fetch data', fetchResult);
    setQuestions(fetchResult);
  };
  //---------------------------------------Reload votes children
  function reloadVotes() {
    getQuestions();
  }
  //---------------------------------------
  function clickHandler() {
    history.push(`/add/private/questions/${user_id}`);
  }
  //------------------------------------------------------Filtrai---------
  //----------------------------------------------------------------------
  function filtrasAtsakyti() {
    // getQuestions();
    // const arrCopy = [...questions];
    // setQuestions(arrCopy);
    const arrAtsakyti = questions.filter((qObj) => qObj.number_a > 0);
    console.log('atsakyti', arrAtsakyti);

    setQuestions(arrAtsakyti);
    // console.log('ArrCopy po atsakyti', arrCopy);
  }
  function filtrasNEatsakyti() {
    // getQuestions();
    // const arrCopy = [...questions];
    // setQuestions(arrCopy);
    const arrNeatsakyti = questions.filter((qObj) => qObj.number_a === 0);
    console.log('neNeatsakyti', arrNeatsakyti);
    setQuestions(arrNeatsakyti);
    // console.log('ArrCopy po NE atsakyti', arrCopy);
  }
  //-------------------------------------------------------
  //---------------------------------------------Rusiavimas

  function rusiuotiPagalAts() {
    setRykiavimasAtsakymus((prev) => !prev);
    // console.log(rykiavimas);

    const arrCopy = [...questions];
    rykiavimasAtsakymus
      ? arrCopy.sort((a, b) => a.number_a - b.number_a)
      : arrCopy.sort((a, b) => b.number_a - a.number_a);
    setQuestions(arrCopy);
  }
  function rusiuotiPagalData() {
    setRykiavimasData((prev) => !prev);
    console.log(rykiavimasData);
    const arrCopy = [...questions];

    rykiavimasData
      ? arrCopy.sort((a, b) => a.add_time_mili_q - b.add_time_mili_q)
      : arrCopy.sort((a, b) => b.add_time_mili_q - a.add_time_mili_q);
    setQuestions(arrCopy);
  }
  function rusiuotiPagalBalsus() {
    setRykiavimasBalsai((prev) => !prev);
    const arrCopy = [...questions];

    rykiavimasBalsai
      ? arrCopy.sort((a, b) => a.like_q - b.like_q)
      : arrCopy.sort((a, b) => b.like_q - a.like_q);
    setQuestions(arrCopy);
  }
  // ------------------------------------------------------
  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <div className={css.questionsList_container}>
      {isUserLoggedIn && (
        <div className={cssM.button_container}>
          <button className={cssM.button} onClick={clickHandler}>
            Add new question
          </button>
        </div>
      )}
      <div className={css.antrastes}>
        <p className={css.title}>Filtruoti klausimus:</p>
        <p className={css.title}>Rūšiuoti pagal:</p>
      </div>
      <div className={css.all_buttons_container}>
        <div className={css.button_container}>
          <button onClick={filtrasAtsakyti}>Atsakyti </button>
          <button onClick={filtrasNEatsakyti}>Neatsakyti</button>
          <button onClick={getQuestions}>Visi</button>
        </div>
        <div className={css.button_container}>
          <button onClick={rusiuotiPagalAts}>Atsakymų skaičių </button>
          <button onClick={rusiuotiPagalData}>Datą </button>
          <button onClick={rusiuotiPagalBalsus}>Balsus </button>
        </div>
      </div>
      {questions.map((qObj) => (
        <Question key={qObj.id_q} {...qObj} reload={reloadVotes} allArr={questions} />
      ))}
    </div>
  );
}

export default QuestionsList;
