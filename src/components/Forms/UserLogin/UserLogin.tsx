import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import validationSchema from './validation'
import { useLoginUserMutation } from '../../../redux/authApi'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { ILogin } from '../../../types/types'
import { setUser, toggleRememberMe } from '../../../redux/authSlice'
import { useDispatch } from 'react-redux'
import CheckBox from '../../UI/CheckBox/CheckBox'
import Input from '../../UI/Input/Input'
import PrimaryButton from '../../UI/PrimaryButton/PrimaryButton'
import s from './UserLogin.module.scss'


type UserLoginProps = {
  setForm: (formType: string) => void;
  setShowModal: (showModal: boolean) => void;
}


const UserLogin: FC<UserLoginProps> = ({ setForm, setShowModal }) => {
  const dispatch = useDispatch();
  const [loginUser, {isSuccess, data, isError, error}] = useLoginUserMutation();
  const [showAlert, setShowAlert] =useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema()),
  });

  const onSubmit = async (data: ILogin) => {
    await loginUser(data);
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
      const { token, userId, refreshToken } = data;
      dispatch(setUser({ token, refreshToken, userId }));
      reset();

      const timer = setTimeout(() => {
        setShowModal(false);
        setShowAlert(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      }
    }
  }, [isSuccess, isError])

  const rememberMeHandler = () => {
    dispatch(toggleRememberMe());
  }

  return (
    <div className={s.login_form}>
      <p className={s.title}>User Login</p>
      <p className={`w-full text-center ${isSuccess ? 'text-green' : isError ? 'text-red' : ''}`}>
        {showAlert && isSuccess && 'Login is successful'}
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
          <Input
            label='Password'
            name='password'
            type='password'
            register={register}
            error={errors.password?.message}
          />
          <CheckBox 
            label='Remember me'
            name='remember'
            onChange={rememberMeHandler}
          />
        </div>
        <PrimaryButton text='Submit' type='submit'/>
        <p className={s.switch}>Don't have an account? <span onClick={() => setForm('register')}>Register</span></p>
        <p className={s.switch}><span onClick={() => setForm('forgot')}>Forgot password?</span></p>
      </form>
    </div>
  )
}

export default UserLogin