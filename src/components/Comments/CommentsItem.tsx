import React, { FC, useEffect, useState } from 'react'
import { IComment } from '../../types/types'
import s from './Comments.module.scss'
import { useGetUserQuery } from '../../redux/usersApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { useDeleteCommentMutation } from '../../redux/commentsApi';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import Alert from '../UI/Alert/Alert';

type CommentsItemProps = {
  comment: IComment;
  refetch: () => void;
}

const CommentsItem: FC<CommentsItemProps> = ({ comment, refetch }) => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const userId = useSelector((state: RootState) => state.auth.userId);
  const {isSuccess, data, isError, error} = useGetUserQuery(comment.userId);
  const [deleteComment, {isSuccess: isDelete, isError: isDeleteError, error: deleteError}] = useDeleteCommentMutation();

  const deleteCommentHandler = async (id: string) => {
    await deleteComment(id);
  }

  useEffect(() => {
    if (isDeleteError) {
      setShowAlert(true);

      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
      }
    }
    if (isDelete) {
      refetch();
    }
  }, [isDelete, isDeleteError])

  return (
    <div className={s.comments_item} >
      {showAlert && isDeleteError && 'data' in deleteError && (
        <Alert
          status={false}
          text={typeof (deleteError as FetchBaseQueryError).data === 'object' && (deleteError as FetchBaseQueryError).data !== null
            ? ((deleteError as FetchBaseQueryError).data as { message?: string }).message || 'Something went wrong'
            : 'Something went wrong'}
        />
      )}
      <p>{comment.text}</p>
      {isSuccess && <a href={`users/${data.user._id}`}>
        <img src={`${data.user.photo ? data.user.photo : '/assets/images/svg/avatar_icon.svg'}`} alt="avatar icon" width={20} height={20}/>
        {data.user.firstName + ' ' + data.user.lastName}
      </a>}
      {isError && <p>{typeof (error as FetchBaseQueryError).data === 'object' && (error as FetchBaseQueryError).data !== null
          ? ((error as FetchBaseQueryError).data as { message?: string }).message || 'Something went wrong'
          : 'Something went wrong'}</p>}
      <span>{comment.date}</span>
      {comment.userId === userId && <div className={s.actions_item} onClick={() => deleteCommentHandler(comment._id)}>
          <img src="/assets/images/svg/delete_icon.svg" alt="delete icon" width={20} height={20}/>
      </div>}
    </div>
  )
}

export default CommentsItem