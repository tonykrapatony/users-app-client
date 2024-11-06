import React, { FC } from 'react'
import { useGetUserQuery } from '../../../redux/usersApi';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

type PostLikesListItemProps = {
  user: string;
}

const PostLikesListItem: FC<PostLikesListItemProps> = ({ user }) => {
  const {isSuccess, data, isError, error} = useGetUserQuery(user);
  return (
    <>
      {isSuccess && <a href={`users/${user}`}>{data.user.firstName} {data.user.lastName}</a>}
      {isError && <span>{typeof (error as FetchBaseQueryError).data === 'object' && (error as FetchBaseQueryError).data !== null
            ? ((error as FetchBaseQueryError).data as { message?: string }).message || 'Something went wrong'
            : 'Something went wrong'}</span>}
    </>
  )
}

export default PostLikesListItem