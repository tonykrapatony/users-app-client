import * as yup from 'yup';

const validationSchema = () => {
  return yup.object({
    firstName: yup
      .string()
      .trim()
      .transform((originalValue) => (originalValue ? originalValue.trim() : undefined)),
    lastName: yup
      .string()
      .trim()
      .transform((originalValue) => (originalValue ? originalValue.trim() : undefined)),
    email: yup
      .string()
      .trim()
      .transform((originalValue) => (originalValue ? originalValue.trim() : undefined))
      .email('Enter correct email'),
    phone: yup
      .string()
      .transform((originalValue) => (originalValue ? originalValue.trim() : undefined))
      .matches(/^\d+$/, 'Enter correct phone')
      .min(7, 'Phone number must be at least 7 digits'),
  });
};

export default validationSchema;
