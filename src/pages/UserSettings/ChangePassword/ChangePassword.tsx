import React, { FC, useEffect, useState } from 'react'
import s from '../UserSettings.module.scss'
import Input from '../../../components/UI/Input/Input'
import { useForm } from 'react-hook-form'
import SecondaryButton from '../../../components/UI/SecondaryButton/SecondaryButton'
import { IChangePass } from '../../../types/types'
import { yupResolver } from '@hookform/resolvers/yup'
import { useChangePasswordMutation } from '../../../redux/usersApi'
import Alert from '../../../components/UI/Alert/Alert'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import validationSchema from './validation'

type ChangePasswordProps = {
  userId: string;
}

const ChangePassword: FC<ChangePasswordProps> = ({ userId }) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [changePassword, {data, isSuccess, isError, error}] = useChangePasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema())
  });

  const onSubmit = async (data: IChangePass) => {
    await changePassword({
      id: userId, 
      body: data
    })
  }

  useEffect(() => {
    if (isSuccess || isError) {
      setShowAlert(true);

      const timer = setTimeout(() => {
        setShowAlert(false);
        reset();
      }, 3000);

      return () => {
        clearTimeout(timer);
      }
    }
  }, [isSuccess, isError]);


  return (
    <>
      {showAlert && isSuccess && <Alert status={true} text={data.message} />}
      {showAlert && isError && 'data' in error && (
        <Alert
          status={false}
          text={typeof (error as FetchBaseQueryError).data === 'object' && (error as FetchBaseQueryError).data !== null
            ? ((error as FetchBaseQueryError).data as { message?: string }).message || 'Something went wrong'
            : 'Something went wrong'}
        />
      )}
      <h2>Change password:</h2>
      <form className={s.settings_list} onSubmit={handleSubmit(onSubmit)}>
        <Input
          label='Current password'
          name='password'
          type='password'
          register={register} 
          error={errors.password?.message}
        />  
        <Input
          label='New password'
          name='new_password'
          type='password'
          register={register} 
          error={errors.new_password?.message}
        />        
        <SecondaryButton 
          text='Change'
          type='submit'
        />     
      </form>
    </>
  )
}

export default ChangePassword