import { FC, useEffect, useState } from 'react'

import { IPost } from '../../../types/types';
import List from '../../List/List';
import PostListItem from './PostListItem';
import s from './PostList.module.scss'
import Spinner from '../../UI/Spinner/Spinner';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { useGetPostsQuery } from '../../../redux/postsApi';


type PostListProps = {
  userId: string | undefined;
  all: boolean;
}

const PostList: FC<PostListProps> = ({ userId, all }) => {
  const {data, isLoading, isError, error} = useGetPostsQuery(userId);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    if (data) {
      setPosts(data.articles)
    }
  }, [data])
  
  if (isLoading) {
    return <Spinner />
  }
  return (
    <div className={s.posts_container}>
      <h2>Post List</h2>
      <div className={s.posts_list}>
        {all ? 
          <>
            <List items={posts} renderItem={(post: IPost) => <PostListItem key={post._id} post={post} postUserId={undefined}/>}/>
          </> :
          <>
            <List items={posts} renderItem={(post: IPost) => <PostListItem key={post._id} post={post} postUserId={userId}/>}/>
          </>
        }
      {isError && all && <p>{typeof (error as FetchBaseQueryError).data === 'object' && (error as FetchBaseQueryError).data !== null
      ? ((error as FetchBaseQueryError).data as { message?: string }).message || 'Something went wrong'
      : 'Something went wrong'}</p>}
      </div>
    </div>
  )
}

export default PostList