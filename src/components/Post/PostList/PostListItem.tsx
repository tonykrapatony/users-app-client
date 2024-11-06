import React, { FC, useEffect, useState } from 'react'
import { IPost } from '../../../types/types'
import s from './PostList.module.scss'
import { useDeletePostMutation, useGetPostsQuery } from '../../../redux/postsApi'
import Alert from '../../UI/Alert/Alert'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import PostLikes from '../PostLikes/PostLikes'
import Comments from '../../Comments/Comments'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useGetUserQuery } from '../../../redux/usersApi'


type PostListItemProps = {
  post: IPost;
  postUserId: string | undefined;
}

const PostListItem: FC<PostListItemProps> = ({ post, postUserId }) => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [showComments, setShowComments] = useState<boolean>(false);
  const [deletePost, {isError, error}] = useDeletePostMutation();
  const { refetch: refetchUser} = useGetPostsQuery(userId);
  const { refetch: refetchAll} = useGetPostsQuery(undefined);
  const {isSuccess: isUser, data: user, isError: isUserError, error: userError} = useGetUserQuery(post.userId);
  const [showAlert, setShowAlert] =useState<boolean>(false);

  const deletePostHandler = async (id: string) => {
    await deletePost(id);
    await refetchUser();
    await refetchAll();
  }

  useEffect(() => {
    if (isError) {
      setShowAlert(true);

      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      }
    }
  }, [isError]);

  return (
    <div key={post._id} className={s.post_item}>
      {showAlert && isError && 'data' in error && (
        <Alert
          status={false}
          text={typeof (error as FetchBaseQueryError).data === 'object' && (error as FetchBaseQueryError).data !== null
            ? ((error as FetchBaseQueryError).data as { message?: string }).message || 'Something went wrong'
            : 'Something went wrong'}
        />
      )}
      <div className={s.post_info}>
        <h3>{post.title}</h3>
        <p>{post.content}</p>
        <>
        {isUser && <a href={`users/${user.user._id}`}>
          <img src={`${user.user.photo ? user.user.photo : '/assets/images/svg/avatar_icon.svg'}`} alt="avatar icon" width={20} height={20}/>
          <p>{user.user.firstName + ' ' + user.user.lastName}</p>
        </a>}
        {isUserError && <span>{typeof (userError as FetchBaseQueryError).data === 'object' && (userError as FetchBaseQueryError).data !== null
          ? ((userError as FetchBaseQueryError).data as { message?: string }).message || 'Something went wrong'
          : 'Something went wrong'}</span>}
        </>
        <span>{post.date}</span>
      </div>
      <div className={s.actions}>
        <div className={ s.actions_item } >
          <PostLikes postId={post._id} likes={post.likes} likesUsers={post.likesUsers} postUserId={postUserId}/>
        </div>
        <div className={s.actions_item} onClick={() => setShowComments(!showComments)}>
          <img src="/assets/images/svg/comment_icon.svg" alt="comment icon" width={30} height={30}/>
        </div>
        {post.userId === userId && <div className={s.actions_item} onClick={() => deletePostHandler(post._id)}>
          <img src="/assets/images/svg/delete_icon.svg" alt="delete icon" width={30} height={30}/>
        </div>}
      </div>
      {showComments && <Comments postId={post._id}/>}
    </div>
  )
}

export default PostListItem;