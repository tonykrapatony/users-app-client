import * as yup from 'yup';

const validationSchema = () => {
  return yup.object({
    firstName: yup
      .string()
      .trim()
      .required('Enter first name'),
    lastName: yup
      .string()
      .trim()
      .required('Enter last name'),
    email: yup
      .string()
      .trim()
      .required('Enter email')
      .email('Enter correct email'),
    phone: yup
      .string()
      .transform((originalValue) => (originalValue ? originalValue.trim() : undefined))
      .matches(/^\d+$/, ('Enter correct phone'))
      .min(7, 'Phone number must be at least 7 digits'),
    password: yup
      .string()
      .trim()
      .required('Enter required')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{1,}$/, ('Password is not secure')),
  });
};

export default validationSchema;
