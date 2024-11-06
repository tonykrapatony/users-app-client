import React, { FC, useEffect, useState } from 'react'
import { useRequestFriendMutation } from '../../redux/friendsApi';
import Alert from '../UI/Alert/Alert';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

type FriendRequestProps = {
  fromUserId: string;
  toUserId: string;
  refetch: () => void;
}

const FriendRequest: FC<FriendRequestProps> = ({ fromUserId, toUserId, refetch}) => {
  const [requestFriend, {data, isSuccess, isError, error}] = useRequestFriendMutation();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const requestHandler = async () => {
    await requestFriend({
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
      <button onClick={requestHandler}>
        <img src="/assets/images/svg/person_add_icon.svg" alt="person add icon" width={30} height={30}/>
      </button>
    </>
  )
}

export default FriendRequest