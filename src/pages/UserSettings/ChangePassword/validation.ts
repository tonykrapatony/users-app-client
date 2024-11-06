import * as yup from 'yup';

const validationSchema = () => {
  return yup.object({
    password: yup
      .string()
      .trim()
      .required('Enter your current password')
      .transform((originalValue) => (originalValue ? originalValue.trim() : undefined))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{1,}$/, 'Password is not secure'),
    new_password: yup
      .string()
      .trim()
      .required('Enter new password')
      .transform((originalValue) => (originalValue ? originalValue.trim() : undefined))
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{1,}$/, 'Password is not secure')    
      .notOneOf([yup.ref('password')], 'New password must be different from the current password'),
  });
};

export default validationSchema;
