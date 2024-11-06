import React, { FC, MouseEvent, ReactNode } from 'react'
import s from './ModalWindow.module.scss'

type ModalWindowProps = {
  children: ReactNode;
  onClick?: () => void;
}

const ModalWindow: FC<ModalWindowProps> = ({ children, onClick }) => {
  const handleClickOutside = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClick) {
      onClick();
    }
  }

  return (
    <div className={s.modal_container} onClick={handleClickOutside}>
      <div className={s.modal_body}>
        <img src="/assets/images/svg/cross_icon.svg" alt="close icon" className={s.close} width={30} height={30} onClick={onClick}/>
        {children}
      </div>
    </div>
  )
}

export default ModalWindow