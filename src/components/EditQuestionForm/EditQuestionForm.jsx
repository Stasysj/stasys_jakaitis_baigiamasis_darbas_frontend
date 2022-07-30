import css from '../AddQuestionForm/AddQuestionForm.module.css';
import { useFormik } from 'formik';
import React from 'react';

import * as Yup from 'yup';
import { baseUrl, editFetchAuth, getFetchAuth, myFetch, myFetchAuth } from '../../utils';
import toast, { Toaster } from 'react-hot-toast';
import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';
import { useAuthCtx } from '../../store/authContext';
import { useEffect } from 'react';

// -----------------------------
let init = {
  title_q: '',
  body_q: '',
};

function EditQuestionForm() {
  const { token, isUserLoggedIn, user_id } = useAuthCtx();
  const history = useHistory();
  const { id_q } = useParams();
  const [error, SetError] = useState('');

  const [initValues, SetInitValue] = useState(init);

  //------------------Get question values
  const getQuestions = async () => {
    const formValue = await getFetchAuth(`${baseUrl}/questions/${id_q}`, token);
    console.log('values', formValue);
    init.title_q = formValue[0].title_q;
    init.body_q = formValue[0].body_q;

    // console.log(init);
    const initValue = {
      title_q: formValue[0].title_q,
      body_q: formValue[0].body_q,
    };
    // console.log(initValue);
    SetInitValue(initValue);
    // console.log('po setinimo');
  };

  //------------------------------
  //   console.log('ish state', initValues);

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
      const fetchResult = await editFetchAuth(`${baseUrl}/questions/${id_q}`, token, values);
      console.log('fetchResult', fetchResult);
      init.title_q = '';
      init.body_q = '';
      history.replace(`/private/questions/${user_id}`);
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
  useEffect(() => {
    getQuestions();
  }, []);
  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      {/* <Toaster /> */}
      <h1 className={css.title}>Edit question.</h1>

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

export default EditQuestionForm;