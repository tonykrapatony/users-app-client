import React, { FC, useEffect, useState } from 'react'
import s from './PostLikes.module.scss'
import { useGetPostsQuery, useLikePostMutation } from '../../../redux/postsApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import PostLikesListItem from './PostLikesListItem';
import List from '../../List/List';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import Alert from '../../UI/Alert/Alert';

type PostLikesProps = {
  postId: string;
  likes: number;
  likesUsers: string[];
  postUserId: string | undefined;
}

const PostLikes: FC<PostLikesProps> = ({ postId, likes, likesUsers, postUserId }) => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [likePost, {isSuccess, isError, error}] = useLikePostMutation();
  const {refetch: refetchrPosts} = useGetPostsQuery(undefined);
  const {refetch: refetchrUserPosts} = useGetPostsQuery(postUserId);
  const [showAlert, setShowAlert] =useState<boolean>(false);

  const likeHandler = async () => {

    await likePost({
      id: postId,
      body: {
        userId: userId!
      }
    })
  }

  useEffect(() => {
    setShowAlert(true);
    if (isError) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      }
    }
    if (isSuccess) {
      refetchrPosts();
      refetchrUserPosts();
    }
  }, [isSuccess, isError]);

  return (
    <div className={ s.likes_container } >
      {showAlert && isError && 'data' in error && (
        <Alert
          status={false}
          text={typeof (error as FetchBaseQueryError).data === 'object' && (error as FetchBaseQueryError).data !== null
            ? ((error as FetchBaseQueryError).data as { message?: string }).message || 'Something went wrong'
            : 'Something went wrong'}
        />
      )}
      {likesUsers.includes(userId) ?
        <img src="/assets/images/svg/filled_like_icon.svg" alt="like icon" width={30} height={30} onClick={likeHandler}/>
        :
        <img src="/assets/images/svg/like_icon.svg" alt = "like icon" width = { 30} height = { 30} onClick={likeHandler} />
      }
      <p className={s.likes_count}>{likes}</p>
      <div className={s.likes_info}>
          <List items={likesUsers} renderItem={(user: string) => <PostLikesListItem key={user} user={user}/>}/>
      </div>
    </div>
  )
}

export default PostLikes