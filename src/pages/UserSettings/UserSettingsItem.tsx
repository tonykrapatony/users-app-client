import React, { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import validationSchema from './validation';
import { useUpdateUserMutation } from '../../redux/usersApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { IUpdateUser } from '../../types/types';
import Alert from '../../components/UI/Alert/Alert';
import Input from '../../components/UI/Input/Input';
import s from './UserSettings.module.scss'

type UserSettingsItemProps = {
  userId: string | undefined;
  label: string;
  value?: string;
  name: 'phone' | 'firstName' | 'lastName' | 'email' | 'password';
  refetchUser: () => void;
  refetchUsers: () => void;
}

const UserSettingsItem: FC<UserSettingsItemProps> = ({ userId, label, value, name, refetchUser, refetchUsers }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [updateUser, { data, isSuccess, isError, error }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: yupResolver(validationSchema())
  });

  const onSubmit = async (e: IUpdateUser) => {
    await updateUser({ id: userId!, body: e });
    refetchUser();
    refetchUsers();
  }

  useEffect(() => {
    if (isSuccess || isError) {
      setShowAlert(true);

      const timer = setTimeout(() => {
        setShowAlert(false);
        setEdit(false);
        reset();
      }, 3000);

      return () => {
        clearTimeout(timer);
      }
    }
  }, [isSuccess, isError]);

  const editToggler = () => {
    setEdit(!edit);
  }

  const restFieldHandler = () => {
    reset();
    setEdit(false);
  }

  return (
    <form className={s.settings_item} onSubmit={handleSubmit(onSubmit)}>
      {showAlert && isSuccess && <Alert status={true} text={data.message} />}
      {showAlert && isError && 'data' in error && (
        <Alert
          status={false}
          text={typeof (error as FetchBaseQueryError).data === 'object' && (error as FetchBaseQueryError).data !== null
            ? ((error as FetchBaseQueryError).data as { message?: string }).message || 'Something went wrong'
            : 'Something went wrong'}
        />
      )}
      <div className={s.value}>
        <p className={s.label}>{label}: </p>
        <p>{value}</p>
        <button type='button' onClick={editToggler}>
          <img src="/assets/images/svg/edit_icon.svg" alt="edit icon" width={25} height={25} />
        </button>
      </div>
      {edit && <div className={s.edit_block}>
        <Input
          name={name}
          type={'text'}
          register={register}
          error={errors[name]?.message ? String(errors[name]?.message) : undefined}
        />
        <div className={s.actions}>
          <button type='submit' className={s.action_item}>
            <img src="/assets/images/svg/save_icon.svg" alt="save icon" width={30} height={30} />
          </button>
          <div className={s.action_item} onClick={restFieldHandler}>
            <img src="/assets/images/svg/reset_icon.svg" alt="reset icon" width={30} height={30} />
          </div>
        </div>
      </div>}
    </form>
  )
}

export default UserSettingsItem