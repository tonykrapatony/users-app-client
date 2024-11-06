import React, { FC } from 'react'
import s from './Comments.module.scss'
import CommentsForm from './CommentsForm/CommentsForm'
import { useGetPostCommetnsQuery } from '../../redux/commentsApi'
import List from '../List/List'
import { IComment } from '../../types/types'
import CommentsItem from './CommentsItem'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

type CommentsProps = {
  postId: string
}

const Comments: FC<CommentsProps> = ({ postId }) => {
  const { data, isSuccess, isError, error, refetch: refetchComments } = useGetPostCommetnsQuery(postId);

  return (
    <div className={s.commetns_container}>
      <p className={s.title}>Comments list:</p>
      <div className={s.commetns_list}>
        {isSuccess && data.comments.length > 0 && <List items={data.comments} renderItem={(comment: IComment) => <CommentsItem key={comment._id} comment={comment} refetch={refetchComments}/>} />}
        {isSuccess && data.comments.length <= 0  && <p>No comments yet</p>}
        {isError && <span>{typeof (error as FetchBaseQueryError).data === 'object' && (error as FetchBaseQueryError).data !== null
          ? ((error as FetchBaseQueryError).data as { message?: string }).message || 'Something went wrong'
          : 'Something went wrong'}</span>}
      </div>
      <p className={s.title}>Add comment:</p>
      <CommentsForm postId={postId} refetch={refetchComments}/>
    </div>
  )
}

export default Comments