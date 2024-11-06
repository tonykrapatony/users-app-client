import { FC, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import validationSchema from './validation'
import { useUserRegistrationMutation } from '../../../redux/authApi'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { useDispatch } from 'react-redux'
import { setUser } from '../../../redux/authSlice'
import { IRegistration } from '../../../types/types'
import PrimaryButton from '../../UI/PrimaryButton/PrimaryButton'
import Input from '../../UI/Input/Input'
import s from './UserRegistration.module.scss'


type UserRegistrationProps = {
  setForm: (formType: string) => void;
  setShowModal: (showModal: boolean) => void;
}

const UserRegistration: FC<UserRegistrationProps> = ({ setForm, setShowModal }) => {
  const [userRegistration, {data, isSuccess, isError, error}] = useUserRegistrationMutation();
  const dispatch = useDispatch();
  const [showAlert, setShowAlert] =useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IRegistration>({
    resolver: yupResolver(validationSchema()),
  });

  const onSubmit: SubmitHandler<IRegistration> = async (user) => {
    await userRegistration(user);
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
      dispatch(setUser({ token,  userId, refreshToken}));
      reset();

      const timer = setTimeout(() => {
        setShowModal(false);
        setShowAlert(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      }
    }
  }, [isSuccess, isError, dispatch, setShowModal, setShowAlert, reset])


  return (
    <div className={s.registration_form}>
      <p className={s.title}>User Registration</p>
      <p className={`${isSuccess ? 'text-green' : isError ? 'text-red' : ''}`}>
        {showAlert && isSuccess && 'Registration is successful'}
        {showAlert && isError && 'data' in error && (
            (error as FetchBaseQueryError).data === 'object' && (error as FetchBaseQueryError).data !== null
              ? ((error as FetchBaseQueryError).data as { message?: string }).message || 'Something went wrong'
              : 'Something went wrong'
        )}
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.input_group}>
          <Input
            label='First name*'
            name='firstName'
            type='text'
            register={register}
            error={errors.firstName?.message}
          />
          <Input
            label='Last name*'
            name='lastName'
            type='text'
            register={register}
            error={errors.lastName?.message}
          />
          <Input
            label='Email*'
            name='email'
            type='text'
            register={register}
            error={errors.email?.message}
          />
          <Input
            label='Phone'
            name='phone'
            type='text'
            register={register}
            error={errors.phone?.message}
          />
          <Input
            label='Password*'
            name='password'
            type='password'
            register={register}
            error={errors.password?.message}
          />
        </div>
        <PrimaryButton text='Submit' type='submit' />
        <p className={s.switch}>Already have an account? <span onClick={() => setForm('login')}>Login</span></p>
      </form>
    </div>
  )
}

export default UserRegistration