import * as yup from 'yup';

const validationSchema = () => {
  return yup.object({
    text: yup
      .string()
      .trim()
      .required('Enter your comment'),
  });
};

export default validationSchema;
