import React, { FC } from 'react'
import { IUser } from '../../types/types'

import s from './User.module.scss'
import FriendsList from '../../components/Friends/FriendsList';

type UserInfoProps = {
  user: IUser;
}

const UserInfo: FC<UserInfoProps> = ({ user }) => {
  return (
    <div className={s.user_info}>
      <h2>User information</h2>
      <div className={s.user_info_list}>
        <img src={`${user.photo ? user.photo : '/assets/images/svg/avatar_icon.svg'}`} alt="user avatr" width={100} height={100}/>
        <p>{user.firstName} {user.lastName}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>
      <FriendsList all={false} userId={user._id}/>
    </div>
  )
}

export default UserInfo