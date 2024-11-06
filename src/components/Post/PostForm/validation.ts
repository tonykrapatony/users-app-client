import * as yup from 'yup';

const validationSchema = () => {
  return yup.object({
    title: yup
      .string()
      .trim()
      .required('Enter title'),
      content: yup
      .string()
      .trim()
      .required('Enter text')
  });
};

export default validationSchema;
