import React, { FC, useEffect, useState } from 'react'
import { useDeleteFriendMutation } from '../../redux/friendsApi';
import Alert from '../UI/Alert/Alert';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

type FriendRemoveProps = {
  fromUserId: string;
  toUserId: string;
  refetch: () => void;
}

const FriendRemove: FC<FriendRemoveProps> = ({ fromUserId, toUserId, refetch}) => {
  const [deleteFriend, {data, isSuccess, isError, error}] = useDeleteFriendMutation();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const deleteHandler = async () => {
    await deleteFriend({
      fromUserId: fromUserId,
      toUserId: toUserId,
    })
    refetch();
  }

  useEffect(() => {
    if (isSuccess || isError) {
      setShowAlert(true);

      const timer = setTimeout(() => {
        setShowAlert(false);
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
      <button onClick={deleteHandler}>
        <img src="/assets/images/svg/person_remove_icon.svg" alt="" width={30} height={30}/>
      </button>
    </>
  )
}

export default FriendRemove