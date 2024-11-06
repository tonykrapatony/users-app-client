import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { useGetUserQuery } from '../../redux/usersApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import PostList from '../../components/Post/PostList/PostList';
import UserInfo from './UserInfo';
import s from './User.module.scss'


const User: FC = () => {
  const location  = useLocation();
  const userId = location.pathname.split('/').pop() || '';
  const {data, isSuccess, isError, error} = useGetUserQuery(userId);

  return (
    <div className={s.user_page}>
      {isSuccess && <>
        <h1>{data.user.firstName} {data.user.lastName}</h1>
        <UserInfo user={data.user}/>
        <PostList userId={userId} all={false}/>
      </>}
      {isError && <span>{typeof (error as FetchBaseQueryError).data === 'object' && (error as FetchBaseQueryError).data !== null
          ? ((error as FetchBaseQueryError).data as { message?: string }).message || 'Something went wrong'
          : 'Something went wrong'}</span>}
    </div>
  )
}

export default User