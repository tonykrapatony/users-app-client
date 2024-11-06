import React, { FC } from 'react'
import s from './SecondaryButton.module.scss'

type SecondaryButtonProps = {
  text: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void; 
}

const SecondaryButton: FC<SecondaryButtonProps> = ({ text, type, onClick }) => {
  return (
    <button className={s.secondaryBtn} onClick={onClick} type={type}>
      <span>{text}</span>
    </button>
  )
}

export default SecondaryButton