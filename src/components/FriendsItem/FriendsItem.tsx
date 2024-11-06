import React, { FC } from 'react'
import { useGetUserQuery } from '../../redux/usersApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import FriendRemove from './FriendRemove';
import FriendAccept from './FriendAccept';
import s from './FriendsItem.module.scss'

type FriendsItemProps = {
  accepted: boolean;
  requested: boolean;
  item: string;
  userId: string;
  refetch: () => void;
}

const FriendsItem: FC<FriendsItemProps> = ({ item, accepted, userId, requested, refetch}) => {
  const {data, isSuccess, isError, error} = useGetUserQuery(item);
  const userID = useSelector((state: RootState) => state.auth.userId);

  return (
    <>
      {isSuccess && <div className={s.friends_item}>
        <Link to={`../users/${item}`}>
          <img className={s.avatar} src={`${data.user.photo ? data.user.photo : '/assets/images/svg/avatar_icon.svg'}`} alt="avatar icon" width={80} height={80} />
          <p>{data.user.firstName} {data.user.lastName}</p>
        </Link>
        {accepted && userId === userID && <FriendRemove toUserId={item} fromUserId={userId} refetch={refetch} />}
        {requested && userId === userID && <FriendAccept toUserId={userId} fromUserId={item} refetch={refetch} />}
      </div>}
      {isError && <p>{typeof (error as FetchBaseQueryError).data === 'object' && (error as FetchBaseQueryError).data !== null
      ? ((error as FetchBaseQueryError).data as { message?: string }).message || 'Something went wrong'
      : 'Something went wrong'}</p>}
    </>
  )
}

export default FriendsItem