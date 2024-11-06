import React, { FC, useEffect } from 'react'
import s from './UserSettings.module.scss'
import { useGetUserQuery, useGetUsersQuery } from '../../redux/usersApi';
import { RootState } from '../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import renderError from '../../helpers/renderError';
import { useForm } from 'react-hook-form';
import UserSettingsItem from './UserSettingsItem';
import DeleteAccount from './DeleteAccount';
import ChangePassword from './ChangePassword/ChangePassword';
import Avatar from './Avatar/Avatar';

type UserSettingsProps = {}

const UserSettings: FC<UserSettingsProps> = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const {data, isLoading, isSuccess, isError, error, refetch: refetchUser} = useGetUserQuery(userId!);
  const {refetch: refetchUsers} = useGetUsersQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>
  } else if (isError) {
    return <>{renderError(error)}</>
  }
  return (
    <div className={s.settings_page}>
      {isSuccess && <>
        <h1>Profile settings</h1>
        <Avatar userId={userId} avatar={data?.user.photo} refetch={refetchUser} refetchUsers={refetchUsers}/>
        <h2>Personal information:</h2>
        <div className={s.settings_list}>
          <UserSettingsItem 
            userId={userId}
            label='First name'
            value={data.user.firstName}
            name='firstName'
            refetchUser={refetchUser}
            refetchUsers={refetchUsers}
          />
          <UserSettingsItem 
            userId={userId}
            label='Last name'
            value={data.user.lastName}
            name='lastName'
            refetchUser={refetchUser}
            refetchUsers={refetchUsers}
          />
          <UserSettingsItem 
            userId={userId}
            label='Email'
            value={data.user.email}
            name='email'
            refetchUser={refetchUser}
            refetchUsers={refetchUsers}
          />
          <UserSettingsItem 
            userId={userId}
            label='Phone'
            value={`${data.user.phone || 'empty'}`}
            name='phone'
            refetchUser={refetchUser}
            refetchUsers={refetchUsers}
          />                  
        </div>
        <ChangePassword 
            userId={userId!}
        />
        <DeleteAccount 
            userId={userId!}
        />
      </>}
    </div>
  )
}

export default UserSettings