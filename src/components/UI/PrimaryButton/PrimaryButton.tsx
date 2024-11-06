import React, { FC } from 'react'
import s from './PrimaryButton.module.scss'

type PrimaryButtonProps = {
  text: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void; 
}

const PrimaryButton: FC<PrimaryButtonProps> = ({ text, type, onClick }) => {
  return (
    <button className={s.primaryBtn} onClick={onClick} type={type}>
      <span>{text}</span>
    </button>
  )
}

export default PrimaryButton