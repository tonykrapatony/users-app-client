import React, { FC, useEffect, useState } from 'react'
import { useAcceptFriendMutation } from '../../redux/friendsApi';
import Alert from '../UI/Alert/Alert';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

type FriendAcceptProps = {
  fromUserId: string;
  toUserId: string;
  refetch: () => void;
}

const FriendAccept: FC<FriendAcceptProps> = ({ fromUserId, toUserId, refetch}) => {
  const [acceptFriend, {data, isSuccess, isError, error}] = useAcceptFriendMutation();
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const acceptHandler = async () => {
    await acceptFriend({
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
      <button onClick={acceptHandler}>
        <img src="/assets/images/svg/accept_icon.svg" alt="" width={28} height={28}/>
      </button>
    </>
  )
}

export default FriendAccept