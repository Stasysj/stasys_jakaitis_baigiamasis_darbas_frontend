import React from 'react';
import AddQuestionForm from '../../components/AddQuestionForm/AddQuestionForm';
import css from './AddQuestionPage.module.css';

function AddQuestionPage() {
  return (
    <div className='container'>
      <div className='container_img'></div>
      <div className='container_form'>
        <AddQuestionForm />
      </div>
    </div>
  );
}

export default AddQuestionPage;
