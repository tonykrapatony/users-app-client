import React, { FC, useEffect, useState } from 'react'
import s from './CommentsForm.module.scss'
import Textarea from '../../UI/Textarea/Textarea'
import SecondaryButton from '../../UI/SecondaryButton/SecondaryButton'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store'
import { useGetUserQuery } from '../../../redux/usersApi'
import { yupResolver } from '@hookform/resolvers/yup'
import validationSchema from './validation'
import { useAddCommentMutation } from '../../../redux/commentsApi'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import Alert from '../../UI/Alert/Alert'


type CommentsFormProps = {
  postId: string;
  refetch: () => void;
}

const CommentsForm: FC<CommentsFormProps> = ({ postId, refetch }) => {
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [addComment, {data, isSuccess, isError, error}] = useAddCommentMutation()
  const [showAlert, setShowAlert] =useState<boolean>(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema())
  });

  const onSubmit = async (e: {text: string}) => {
    await addComment({
      text: e.text,
      articleId: postId,
      userId:userId,
      date: new Date().toLocaleString()
    })
  }

  useEffect(() => {
    setShowAlert(true);

    const timer = setTimeout(() => {
      if (isError) {
        setShowAlert(false);
      }
      if (isSuccess) {
        reset();
        refetch();
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
    }
  }, [isSuccess, isError])
  
  return (
    <form className={s.commetn_field} onSubmit={handleSubmit(onSubmit)}>
      {showAlert && isError && 'data' in error && (
        <Alert
          status={false}
          text={typeof (error as FetchBaseQueryError).data === 'object' && (error as FetchBaseQueryError).data !== null
            ? ((error as FetchBaseQueryError).data as { message?: string }).message || 'Something went wrong'
            : 'Something went wrong'}
        />
      )}
      <div className={s.input_group}>
        <Textarea 
          label='Comment'
          name='text' 
          register={register}
          error={errors.text?.message}  
        />
      </div>
      <SecondaryButton type='submit' text='Add comment'/>
    </form>
  )
}

export default CommentsForm