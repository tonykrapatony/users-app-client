import React, { FC } from 'react'
import s from './Textarea.module.scss'

type TextareaProps = {
  label: string;
  name: string;
  error?: string;
  register: any; 
}

const Textarea: FC<TextareaProps> = ({ label, name, error, register }) => {

  return (
    <div className={s.textarea_container}>
      <div className={s.textarea}>
        <label 
          className={`${error && s.error}`} 
          htmlFor={name}
        >
          {label}
        </label>
        <textarea 
          cols="30" 
          rows="10"
          className={`${error && s.error}`} 
          name={name}
          id={name}
          {...register(name)}
        >
        </textarea> 
        </div>
      {error && <span className={s.error_msg}>{error}</span>}
    </div>

  )
}

export default Textarea