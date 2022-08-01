import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuthCtx } from '../../store/authContext';
import { baseUrl, myFetch } from '../../utils';
import PrivateQuestions from '../PrivateQuestions/PrivateQuestions';
// import Question from '../Question/Question';
import css from '../QuestionsList/QuestionsList.module.css';
import cssM from './PrivateQuestionList.module.css';

function PrivateQuestionsList() {
  const history = useHistory();
  const [questions, setQuestions] = useState([]);
  const { token, isUserLoggedIn, user_id } = useAuthCtx();

  const getQuestions = async () => {
    const fetchResult = await myFetch(`${baseUrl}/private/questions/${user_id}`);

    // const fetchResult2 = await myFetch(`${baseUrl}/questions/${id_q}/answers`);

    // console.log(fetchResult);
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

  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <>
      <div className={css.questionsList_container}>
        <div className={cssM.button_container}>
          <button className={cssM.button} onClick={clickHandler}>
            Add new question
          </button>
        </div>

        {questions.length > 0 ? (
          questions.map((qObj) => (
            <PrivateQuestions key={qObj.id_q} {...qObj} reload={reloadVotes} allArr={questions} />
          ))
        ) : (
          <p className={cssM.nulisIrasu}>Jūs dar neparšėte nei vieno klausimo!</p>
        )}
      </div>
    </>
  );
}

export default PrivateQuestionsList;
