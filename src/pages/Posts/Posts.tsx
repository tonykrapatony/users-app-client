import React, { FC } from 'react'
import PostList from '../../components/Post/PostList/PostList'
import s from './Posts.module.scss'


const Posts: FC = () => {
  return (
    <div className={s.posts_page}>
      <PostList userId={undefined} all={true}/>
    </div>
  )
}

export default Posts