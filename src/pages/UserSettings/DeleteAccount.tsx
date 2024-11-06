import React, { FC, useEffect, useState } from 'react'
import { useDeleteUserMutation } from '../../redux/usersApi';
import SecondaryButton from '../../components/UI/SecondaryButton/SecondaryButton'
import s from './UserSettings.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Alert from '../../components/UI/Alert/Alert';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { logout } from '../../redux/authSlice';

type DeleteAccountProps = {
  userId: string;
}

const DeleteAccount: FC<DeleteAccountProps> = ({ userId }) => {
  const dispatch = useDispatch()
  const [deleteUser, { data, isSuccess, isError, error }] = useDeleteUserMutation();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const deleteUserHandler = async () => {
    await deleteUser(userId)
  }

  useEffect(() => {
    if (isSuccess || isError) {
      setShowAlert(true);

      const timer = setTimeout(() => {
        setShowAlert(false);
        dispatch(logout())
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
      <h2>Delete account:</h2>
      <div className={s.delete_account}>
        <SecondaryButton
          type='button'
          text='Delete'
          onClick={deleteUserHandler}
        />
      </div>
    </>
  )
}

export default DeleteAccount