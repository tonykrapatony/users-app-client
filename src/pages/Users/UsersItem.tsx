import React, { FC, useEffect, useState } from 'react'
import { IUser } from '../../types/types'
import { Link } from 'react-router-dom'
import { useGetFriendsListQuery } from '../../redux/friendsApi'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import checkFriends from '../../helpers/checkFriends'
import FriendRequest from '../../components/FriendsItem/FriendRequest'
import FriendRemove from '../../components/FriendsItem/FriendRemove'
import s from './Users.module.scss'


type UserItemProps = {
  user: IUser
}

const UserItem: FC<UserItemProps> = ({ user }) => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const {data, isSuccess, refetch} = useGetFriendsListQuery(user._id);
  const [check, setCheck] = useState<boolean>(true);

  useEffect(() => {
    refetch()
  }, [])

  useEffect(() => {
    const acceptedFriends = data?.data?.acceptedFriends || [];
    const requestedFriends = data?.data?.requestedFriends || [];

    const res = checkFriends(acceptedFriends, requestedFriends, userId!);
    setCheck(res!);
  }, [data, isSuccess, userId])

  return (
    <div key={user._id} className={s.users_item}>
      <div className={s.user_avatar}>
        <img src={`${user.photo ? user.photo : '/assets/images/svg/avatar_icon.svg'}`} alt="avatar icon" width={80} height={80} />
      </div>
      <div className={s.user_info}>
        <Link to={`${user._id}`} className={s.name}>{user.firstName} {user.lastName}</Link>
        <Link to={`mailto:${user.email}`} className={s.contacts} target='_blank'>{user.email}</Link>
        <Link to={`tel:+${user.phone}`} className={s.contacts}>{user.phone}</Link>
      </div>
      {!check && userId !== user._id && <FriendRequest toUserId={user._id} fromUserId={userId!} refetch={refetch}/>}
      {check && userId !== user._id && <FriendRemove toUserId={user._id} fromUserId={userId!} refetch={refetch}/>}
    </div>
  )
}

export default UserItem;