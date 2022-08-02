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
  body_a: '',
};

function EditAnswerForm() {
  const { token, user_id } = useAuthCtx();
  const history = useHistory();
  const { id_a } = useParams();
  const [error, SetError] = useState('');
  const [initValues, SetInitValue] = useState(init);

  //------------------Get question values
  const getQuestions = async () => {
    const formValue = await getFetchAuth(`${baseUrl}/answers/${id_a}`, token);
    init.body_a = formValue[0].body_a;

    const initValue = {
      body_a: formValue[0].body_a,
    };
    SetInitValue(initValue);
  };

  //------------------------------

  const formik = useFormik({
    initialValues: initValues,
    validationSchema: Yup.object({
      body_a: Yup.string().min(4, 'Maziausiai 4 simboliai').max(250).required('Privalomas laukas'),
    }),
    onSubmit: async (values) => {
      values.user_id = user_id;

      SetError('');
      // eslint-disable-next-line no-unused-vars
      const fetchResult = await editFetchAuth(`${baseUrl}/answers/${id_a}`, token, values);
      init.body_a = '';
      history.replace(`/private/answers/${user_id}`);
    },
  });
  useEffect(() => {
    getQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <form className={css.form} onSubmit={formik.handleSubmit}>
      <h1 className={css.title}>Edit answer.</h1>
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
        SIGN UP
      </button>
    </form>
  );
}

export default EditAnswerForm;
