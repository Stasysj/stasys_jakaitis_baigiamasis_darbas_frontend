import css from '../AddQuestionForm/AddQuestionForm.module.css';
import { useFormik } from 'formik';
import React from 'react';

import * as Yup from 'yup';
import { baseUrl, editFetchAuth, getFetchAuth } from '../../utils';
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
  const { token, user_id } = useAuthCtx();
  const history = useHistory();
  const { id_q } = useParams();
  const [error, SetError] = useState('');

  const [initValues, SetInitValue] = useState(init);

  //------------------Get question values
  const getQuestions = async () => {
    const formValue = await getFetchAuth(`${baseUrl}/questions/${id_q}`, token);
    init.title_q = formValue[0].title_q;
    init.body_q = formValue[0].body_q;

    const initValue = {
      title_q: formValue[0].title_q,
      body_q: formValue[0].body_q,
    };
    SetInitValue(initValue);
  };

  //------------------------------

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      title_q: Yup.string().min(4, 'Maziausiai 4 simboliai').max(25).required('Privalomas laukas'),
      body_q: Yup.string().min(4, 'Maziausiai 4 simboliai').max(250).required('Privalomas laukas'),
    }),
    onSubmit: async (values) => {
      values.user_id = user_id;

      SetError('');
      // eslint-disable-next-line no-unused-vars
      const fetchResult = await editFetchAuth(`${baseUrl}/questions/${id_q}`, token, values);
      init.title_q = '';
      init.body_q = '';
      history.replace(`/private/questions/${user_id}`);
    },
  });
  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
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
      {error && <p className={css.errorMsg}>{error}</p>}
      <button className={css.btn} type='submit'>
        SIGN UP
      </button>
    </form>
  );
}

export default EditQuestionForm;
