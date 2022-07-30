import React from 'react';
import AddAnswerForm from '../../components/AddAnswerForm/AddAnswerForm';
import AddQuestionForm from '../../components/AddQuestionForm/AddQuestionForm';
import css from '../AddQuestionPage/AddQuestionPage.module.css';

function AddAnswerPage() {
  return (
    <div className='container'>
      <div className='container_img'></div>
      <div className='container_form'>
        <AddAnswerForm />
      </div>
    </div>
  );
}

export default AddAnswerPage;
