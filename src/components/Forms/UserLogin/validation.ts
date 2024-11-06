import * as yup from 'yup';

const validationSchema = () => {
  return yup.object({
    email: yup
      .string()
      .trim()
      .required('Enter email')
      .email('Enter correct email'),
    password: yup
      .string()
      .trim()
      .required('Enter password')
  });
};

export default validationSchema;
