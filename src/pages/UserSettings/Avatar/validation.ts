import * as yup from 'yup';

const validationSchema = () => {
  return yup.object({
    photo: yup
      .mixed()
      .required('Photo is required')
      .test('fileExists', 'Photo is required', (value) => {
        const fileList = value as FileList;
        return fileList && fileList.length > 0;
      })
      .test('fileType', 'Only jpeg or png formats are allowed', (value) => {
        const fileList = value as FileList;
        return fileList && fileList.length > 0 && ['image/jpeg', 'image/png'].includes(fileList[0]?.type);
      }),
  });
};

export default validationSchema;
