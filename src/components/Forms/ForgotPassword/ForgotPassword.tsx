import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import validationSchema from './validation'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { IUpdateUser } from '../../../types/types'
import Input from '../../UI/Input/Input'
import PrimaryButton from '../../UI/PrimaryButton/PrimaryButton'
import s from './ForgotPassword.module.scss'
import { useForgotPasswordMutation } from '../../../redux/authApi'


type ForgotPasswordProps = {
  setForm: (formType: string) => void;
}


const ForgotPassword: FC<ForgotPasswordProps> = ({ setForm }) => {
  const [showAlert, setShowAlert] =useState<boolean>(false);
  const [forgotPassword, {data, isSuccess, isError, error}] = useForgotPasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema()),
  });

  const onSubmit = async (data: IUpdateUser) => {
    await forgotPassword(data);
  };

  useEffect(() => {
    setShowAlert(true);
    if (isError) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      }
    }
    if (isSuccess) {
      const timer = setTimeout(() => {
        setShowAlert(false);
        setForm('login');
      }, 3000);

      return () => {
        clearTimeout(timer);
      }
    }
  }, [isSuccess, isError])


  return (
    <div className={s.login_form}>
      <p className={s.title}>Forgot password</p>
      <p>Enter your email and we will send you a new one.</p>
      <p className={`w-full text-center ${isSuccess ? 'text-green' : isError ? 'text-red' : ''}`}>
        {showAlert && isSuccess && data.message}
        {showAlert && isError && 'data' in error && (
            typeof (error as FetchBaseQueryError).data === 'object' && (error as FetchBaseQueryError).data !== null
              ? ((error as FetchBaseQueryError).data as { message?: string }).message || 'Something went wrong'
              : 'Something went wrong'
        )}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.input_group}>
          <Input
            label='Email'
            name='email'
            type='text'
            register={register}
            error={errors.email?.message}
          />
        </div>
        <PrimaryButton text='Submit' type='submit'/>
        <p className={s.switch}>Remember your password? <span onClick={() => setForm('login')}>Login</span></p>
      </form>
    </div>
  )
}

export default ForgotPassword