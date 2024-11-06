import React, { FC } from 'react'
import s from './Alert.module.scss'

type AlertProps = {
  status: boolean;
  text: string;
}

const Alert: FC<AlertProps> = ({ status, text }) => {
  return (
    <div className={`${s.alert} ${status ? s.success : s.error}`}>
      <span>{text}</span>
    </div>
  )
}

export default Alert