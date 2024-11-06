import React, { FC } from 'react'
import s from './CheckBox.module.scss'

type CheckBoxProps = {
  label: string;
  name: string;
  onChange?: () => void; 
}

const CheckBox: FC<CheckBoxProps> = ({ label, name, onChange}) => {
  return (
    <div className={s.checkbox}>
      <input type="checkbox" hidden name={name} id={name} onChange={onChange}/>
      <label htmlFor={name}>{label}</label>
    </div>
  )
}

export default CheckBox