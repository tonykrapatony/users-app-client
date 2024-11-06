import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useGetUserQuery } from '../../redux/usersApi'
import PostList from '../../components/Post/PostList/PostList'
import PostForm from '../../components/Post/PostForm/PostForm'
import renderError from '../../helpers/renderError'
import Spinner from '../../components/UI/Spinner/Spinner'
import s from './Profile.module.scss'

type ProfileProps = {}

const Profile: FC<ProfileProps> = () => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const {data, isLoading, isSuccess, isError, error} = useGetUserQuery(userId);

  if (isLoading) {
    return <Spinner />
  } else if (isError) {
    return <>{renderError(error)}</>
  }
  return (
    <div className={s.profile_page}>
      {isSuccess && <>
        <h1>Welcome {data.user.firstName} {data.user.lastName}</h1>
        <PostList userId={userId} all={false}/>
        <PostForm userId={userId} userName={`${data.user.firstName} ${data.user.lastName}`}/>
      </>}
    </div>
  )
}

export default Profile