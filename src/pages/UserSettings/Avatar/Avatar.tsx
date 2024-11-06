import React, { FC, useEffect, useState } from 'react'
import s from '../UserSettings.module.scss'
import SecondaryButton from '../../../components/UI/SecondaryButton/SecondaryButton';
import { useForm } from 'react-hook-form';
import { useUpdateUserMutation } from '../../../redux/usersApi';
import avatarGenerator from '../../../helpers/avatarGenerator';
import Alert from '../../../components/UI/Alert/Alert';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from './validation';

type AvatarProps = {
  userId: string | undefined;
  avatar?: string;
  refetch: () => void;
  refetchUsers: () => void;
}

const Avatar: FC<AvatarProps> = ({ userId, avatar, refetch, refetchUsers }) => {
  const [updateUser, {data, isSuccess, isError, error}] = useUpdateUserMutation();
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema())
  });
  const onSubmit = async (e: any) => {
    const file = e.photo[0];
    let photo = await avatarGenerator(file);
    await updateUser({
      id: userId,
      body: {
        photo: photo
      }
    })
  }

  useEffect(() => {
    if (isSuccess || isError) {
      setShowAlert(true);

      const timer = setTimeout(() => {
        setShowAlert(false);
        reset();
        refetch();
        refetchUsers();
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
      <h2>Avatar:</h2>
      <form className={s.avatar} onSubmit={handleSubmit(onSubmit)}>
        <img src={`${avatar ? avatar : '/assets/images/svg/avatar_icon.svg'}`} alt="avatar icon" width={100} height={100} />
        <div className={s.file_input}>
          <input className={`${errors.photo?.message && s.error}`} type="file" id="photo" {...register('photo')} accept="image/png, image/jpeg"/>
          {errors.photo?.message && <span className={s.error_msg}>{errors.photo.message}</span>}
        </div>
        <SecondaryButton 
          text='Upload'
          type='submit'
        />
      </form>
    </>
  )
}

export default Avatar