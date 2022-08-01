import css from '../AddQuestionForm/AddQuestionForm.module.css';
import { useFormik } from 'formik';
import React from 'react';

import * as Yup from 'yup';
import { baseUrl, editFetchAuth, myFetch, myFetchAuth } from '../../utils';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useAuthCtx } from '../../store/authContext';

// -----------------------------
const initValues = {
  //   title_q: '',
  body_a: '',
  //   user_id: '',
};
// -------------------------------
function AddAnswerForm() {
  const { token, isUserLoggedIn, user_id } = useAuthCtx();
  const history = useHistory();
  const { id_q } = useParams();
  const [error, SetError] = useState('');

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      //   title_q: Yup.string().min(4, 'Maziausiai 4 simboliai').max(25).required('Privalomas laukas'),
      body_a: Yup.string().min(4, 'Maziausiai 4 simboliai').max(250).required('Privalomas laukas'),
      //   password: Yup.string().min(4, 'Maziausiai 4 simboliai').max(7).required(),
    }),
    onSubmit: async (values) => {
      values.add_time_a = new Date().toLocaleString('sv-SE');
      values.add_time_mili_a = Date.parse(new Date());
      values.user_id = user_id;
      console.log('values', values);

      SetError('');
      const fetchResult = await myFetchAuth(`${baseUrl}/questions/${id_q}/answers`, token, values);
      console.log('fetchResult', fetchResult);
      const obj = {
        id_q: id_q,
      };

      //   const fetccounthResult = await editFetchAuth(
      //     `${baseUrl}/questions/answers/count`,
      //     token,
      //     obj
      //   );
      //   console.log('fetccounthResult', fetccounthResult);

      if (fetchResult === undefined) {
        SetError('Nėra ryšio su serveriu!');
        return;
      }
      // if (fetchResult === 'user alredy exists') {
      //   SetError(fetchResult);
      //   return;
      // }
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

      {/* <label className={css.label}>
        <span className={css.span}>Title</span>
        <input
          type='title_q'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.title_q}
          className={formik.touched.title_q && formik.errors.title_q ? css.errorInput : css.input}
          name='title_q'
        />
      </label>
      <p className={css.errorMsg}>{formik.errors.title_q}</p> */}
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
      {/* <label className={css.label}>
        <span className={css.span}>Password</span>
        <input
          type='password'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className={formik.touched.password && formik.errors.password ? css.errorInput : css.input}
          name='password'
        />
      </label>
      <p className={css.errorMsg}>{formik.errors.password}</p> */}
      {error && <p className={css.errorMsg}>{error}</p>}
      <button className={css.btn} type='submit'>
        Add
      </button>
    </form>
  );
}

export default AddAnswerForm;
