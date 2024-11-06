import React, { FC, useEffect } from 'react'
import { useGetFriendsListQuery } from '../../redux/friendsApi';
import List from '../List/List';
import FriendsItem from '../FriendsItem/FriendsItem';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import s from './FriendsList.module.scss'

type FriendsListProps = {
  all: boolean;
  userId: string;
}

const FriendsList: FC<FriendsListProps> = ({ userId, all }) => {
  const { data, isSuccess, isError, error, refetch } = useGetFriendsListQuery(userId!);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <>
      {isSuccess && data?.data && (
        <>
          <div className={s.friends_list}>
            <h2>Friends {data.data.acceptedFriends?.length || 0}:</h2>
            <List
              items={data.data.acceptedFriends || []}
              renderItem={(item: string) => (
                <FriendsItem
                  key={item}
                  item={item}
                  accepted={true}
                  requested={false}
                  userId={userId}
                  refetch={refetch}
                />
              )}
            />
          </div>
          {all && (
            <div className={s.friends_list}>
              <h2>Friend requests {data.data.requestedFriends?.length || 0}:</h2>
              <List
                items={data.data.requestedFriends || []}
                renderItem={(item: string) => (
                  <FriendsItem
                    key={item}
                    item={item}
                    accepted={false}
                    requested={true}
                    userId={userId}
                    refetch={refetch}
                  />
                )}
              />
            </div>
          )}
        </>
      )}
      {isError && (
        <p>
          {typeof (error as FetchBaseQueryError).data === 'object' &&
          (error as FetchBaseQueryError).data !== null
            ? ((error as FetchBaseQueryError).data as { message?: string }).message || 'Something went wrong'
            : 'Something went wrong'}
        </p>
      )}
    </>
  );
};

export default FriendsList;
