import css from './AddQuestionForm.module.css';
import { useFormik } from 'formik';
import React from 'react';

import * as Yup from 'yup';
import { baseUrl, myFetch, myFetchAuth } from '../../utils';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useAuthCtx } from '../../store/authContext';

// -----------------------------
const initValues = {
  title_q: '',
  body_q: '',
  //   user_id: '',
};
// -------------------------------
function AddQuestionForm() {
  const { token, isUserLoggedIn, user_id } = useAuthCtx();
  const history = useHistory();
  const [error, SetError] = useState('');

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      title_q: Yup.string().min(4, 'Maziausiai 4 simboliai').max(25).required('Privalomas laukas'),
      body_q: Yup.string().min(4, 'Maziausiai 4 simboliai').max(250).required('Privalomas laukas'),
      //   password: Yup.string().min(4, 'Maziausiai 4 simboliai').max(7).required(),
    }),
    onSubmit: async (values) => {
      values.user_id = user_id;
      console.log('values', values);

      SetError('');
      const fetchResult = await myFetchAuth(`${baseUrl}/questions`, token, values);
      console.log('fetchResult', fetchResult);
      // if (fetchResult === 'no user created') {
      //   SetError(fetchResult);
      //   return;
      // }
      // if (fetchResult === 'user alredy exists') {
      //   SetError(fetchResult);
      //   return;
      // }
      // const notify = () =>
      //   toast.success('Registracija sėkminga,tuoj būsite peradresuoti i Login puslapį.', {
      //     duration: 4000,
      //     position: 'top-center',
      //   });
      // fetchResult === 'user created' &&
      //   notify() &&
      //   setTimeout(() => {
      //     history.replace('/login');
      //   }, 4000);
    },
  });
  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      {/* <Toaster /> */}
      <h1 className={css.title}>Add new question.</h1>

      <label className={css.label}>
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
      <p className={css.errorMsg}>{formik.errors.title_q}</p>
      <label className={css.label}>
        <span className={css.span}>Question</span>
        <textarea
          type='body_q'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.body_q}
          className={formik.touched.body_q && formik.errors.body_q ? css.errorInput : css.inputArea}
          name='body_q'
          rows='9'
          cols='40'
        />
      </label>
      <p className={css.errorMsg}>{formik.errors.body_q}</p>
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
        SIGN UP
      </button>
    </form>
  );
}

export default AddQuestionForm;
