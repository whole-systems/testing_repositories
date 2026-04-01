import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignInMutation } from '@/api/authEndpoints';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LOCAL_STORAGE_USER_ENTITY } from '@/utils/shared/consts';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(4, 'Password must be at least 4 characters')
    .required('Password is required'),
});

export const useSignIn = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    validateOnChange: true,
    onSubmit: () => {},
  });

  // const error = useAppSelector(authError);
  const [login, { error, isLoading, isSuccess }] = useSignInMutation();
  const userEntity = localStorage.getItem(LOCAL_STORAGE_USER_ENTITY);

  React.useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (userEntity) {
      const parsedData = JSON.parse(userEntity);
      formik.setFieldValue('email', parsedData.email);
    }
  }, [userEntity]);

  const handleSubmit = React.useCallback(async () => {
    await login(formik.values);
  }, [login, formik]);

  return {
    handles: {
      handleSubmit,
    },
    data: {
      loading: isLoading,
      error,
      formik,
    },
  };
};
