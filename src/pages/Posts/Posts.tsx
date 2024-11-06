import React, { FC } from 'react'
import PostList from '../../components/Post/PostList/PostList'
import s from './Posts.module.scss'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

type PostsProps = {}

const Posts: FC<PostsProps> = () => {
  return (
    <div className={s.posts_page}>
      <PostList userId={undefined} all={true}/>
    </div>
  )
}

export default Posts