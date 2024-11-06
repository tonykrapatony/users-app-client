import React, { FC, useEffect } from 'react'
import { useGetUsersQuery } from '../../redux/usersApi'
import { IUser } from '../../types/types';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import List from '../../components/List/List';
import UserItem from './UsersItem';
import Spinner from '../../components/UI/Spinner/Spinner';
import s from './Users.module.scss'

const Users: FC = () => {
  const {data, isSuccess, isLoading, isError, error, refetch} = useGetUsersQuery(undefined);

  useEffect(() => {
    refetch();
  }, [])

  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className={s.users_page}>
      <h1>Users List</h1>
      <div className={s.users_list}>
        {isSuccess && <List items={data.users} renderItem={(user: IUser) => <UserItem key={user._id} refetch={refetch} user={user}/>}/>}
      </div>
      {isError && <p>{typeof (error as FetchBaseQueryError).data === 'object' && (error as FetchBaseQueryError).data !== null
      ? ((error as FetchBaseQueryError).data as { message?: string }).message || 'Something went wrong'
      : 'Something went wrong'}</p>}
    </div>
  )
}

export default Users
