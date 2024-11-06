import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import s from './Friends.module.scss'
import FriendsList from '../../components/Friends/FriendsList'


const Friends: FC = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);

  return (
    <div className={s.friends_page}>
      <h1>My friends</h1>
      <FriendsList all={true} userId={userId!}/>
    </div>
  )
}

export default Friends