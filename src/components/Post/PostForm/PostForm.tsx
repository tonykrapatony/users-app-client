import React, { FC, useEffect, useState } from 'react'
import s from './PostForm.module.scss'
import Input from '../../UI/Input/Input'
import Textarea from '../../UI/Textarea/Textarea'
import { SubmitHandler, useForm } from 'react-hook-form'
import SecondaryButton from '../../UI/SecondaryButton/SecondaryButton'
import { useAddPostMutation, useGetPostsQuery } from '../../../redux/postsApi'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import Alert from '../../UI/Alert/Alert'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { yupResolver } from '@hookform/resolvers/yup'
import validationSchema from './validation'

type PostFormProps = {
  userName: string;
  userId: string;
}

interface IPostForm {
  title: string;
  content: string;
}

const PostForm: FC<PostFormProps> = ({ userId, userName }) => {
  const [addPost, {isSuccess, isError, error}] = useAddPostMutation();
  const {refetch: refetchrPosts} = useGetPostsQuery(null);
  const {refetch: refetchrUserPosts} = useGetPostsQuery(userId);
  const [showAlert, setShowAlert] =useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IPostForm>({
    resolver: yupResolver(validationSchema())
  });

  const onSubmit: SubmitHandler<IPostForm> = async (e) => {
    await addPost ({
      title: e.title,
      content: e.content,
      userId: userId,
      authorName: userName,
      date: new Date().toLocaleString()
    })
  }

  useEffect(() => {
    if (isSuccess || isError) {
      setShowAlert(true);

      const timer = setTimeout(() => {
        setShowAlert(false);
        reset();
        refetchrPosts();
        refetchrUserPosts();
      }, 3000);

      return () => {
        clearTimeout(timer);
      }
    }
  }, [isSuccess, isError]);

  return (
    <div className={s.post_form}>
      {showAlert && isSuccess && <Alert status={true} text='Post successfully added' />}
      {showAlert && isError && 'data' in error && (
        <Alert
          status={false}
          text={typeof (error as FetchBaseQueryError).data === 'object' && (error as FetchBaseQueryError).data !== null
            ? ((error as FetchBaseQueryError).data as { message?: string }).message || 'Something went wrong'
            : 'Something went wrong'}
        />
      )}
      <h2>Add post</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={s.input_group}>
          <Input
            label='Title'
            name='title' 
            type={'text'} 
            register={register} 
            error={errors.title?.message}
          />
          <Textarea 
            label='Text'
            name='content' 
            register={register}  
            error={errors.content?.message}
          />
        </div>
        <SecondaryButton text='Add post' type='submit'/>
      </form>
    </div>
  )
}

export default PostForm