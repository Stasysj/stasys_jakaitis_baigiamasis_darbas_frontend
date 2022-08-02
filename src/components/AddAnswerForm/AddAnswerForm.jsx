import css from '../AddQuestionForm/AddQuestionForm.module.css';
import { useFormik } from 'formik';
import React from 'react';

import * as Yup from 'yup';
import { baseUrl, editFetchAuth, myFetchAuth } from '../../utils';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useAuthCtx } from '../../store/authContext';

// -----------------------------
const initValues = {
  body_a: '',
};
// -------------------------------
function AddAnswerForm() {
  const { token, user_id } = useAuthCtx();
  const history = useHistory();
  const { id_q } = useParams();
  const [error, SetError] = useState('');

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      body_a: Yup.string().min(4, 'Maziausiai 4 simboliai').max(250).required('Privalomas laukas'),
    }),
    onSubmit: async (values) => {
      values.add_time_a = new Date().toLocaleString('sv-SE');
      values.add_time_mili_a = Date.parse(new Date());
      values.user_id = user_id;

      SetError('');
      const fetchResult = await myFetchAuth(`${baseUrl}/questions/${id_q}/answers`, token, values);
      const obj = {
        id_q: id_q,
      };

      // eslint-disable-next-line no-unused-vars
      const rezultCountAnswers = await editFetchAuth(
        `${baseUrl}/questions/answers/count`,
        token,
        obj
      );

      if (fetchResult === undefined) {
        SetError('Nėra ryšio su serveriu!');
        return;
      }
      const notify = () =>
        toast.success('Atsakymas pridėtas,tuoj būsite peradresuoti į pagrindinį puslapį.', {
          duration: 2000,
          position: 'top-center',
        });
      fetchResult === 'Answer successfully added' &&
        notify() &&
        setTimeout(() => {
          history.replace('/');
        }, 2000);
    },
  });
  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <Toaster />
      <h1 className={css.title}>Add new answer.</h1>

      <label className={css.label}>
        <span className={css.span}>Answer</span>
        <textarea
          type='body_a'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.body_a}
          className={formik.touched.body_a && formik.errors.body_a ? css.errorInput : css.inputArea}
          name='body_a'
          rows='9'
          cols='40'
        />
      </label>
      <p className={css.errorMsg}>{formik.errors.body_a}</p>
      {error && <p className={css.errorMsg}>{error}</p>}
      <button className={css.btn} type='submit'>
        Add
      </button>
    </form>
  );
}

export default AddAnswerForm;
