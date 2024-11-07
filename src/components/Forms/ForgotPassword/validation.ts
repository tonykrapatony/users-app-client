import * as yup from 'yup';

const validationSchema = () => {
  return yup.object({
    email: yup
      .string()
      .trim()
      .required('Enter email')
      .email('Enter correct email'),
  });
};

export default validationSchema;
