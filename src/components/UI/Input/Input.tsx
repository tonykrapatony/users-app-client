import React, { FC, useState } from 'react'
import s from './Input.module.scss'

type InputProps = {
  label?: string;
  name: string;
  type: 'text' | 'password';
  error?: string;
  register: any; 
}

const Input: FC<InputProps> = ({ label, name, type, error, register }) => {
  const [show, setShow] = useState<boolean>(false);

  const showToggler = () => {
    setShow(!show);
  }

  return (
    <div className={s.input_container}>
      <div className={s.input}>
        {label && <label 
          className={`${error && s.error}`} 
          htmlFor={name}
        >
            {label}
        </label>}
        <input 
          className={`${error && s.error}`} 
          name={name}
          id={name}
          type={`${show ? 'text' : type}`} 
          {...register(name)} 
        />
        
          {type === 'password' && show && 
            <div className={s.icon} onClick={showToggler}>
              <svg enableBackground="new 0 0 32 32" id="Editable-line" version="1.1" viewBox="0 0 32 32" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <path d="  M16,7C9.934,7,4.798,10.776,3,16c1.798,5.224,6.934,9,13,9s11.202-3.776,13-9C27.202,10.776,22.066,7,16,7z" fill="none" id="XMLID_13_" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
                <circle cx="16" cy="16" fill="none" id="XMLID_14_" r="5" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
                <line fill="none" id="XMLID_15_" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2" x1="3" x2="29" y1="3" y2="29"/>
              </svg>
            </div>
          }
          {type === 'password' && !show && 
            <div className={s.icon} onClick={showToggler}>
              <svg enableBackground="new 0 0 32 32" id="Editable-line" version="1.1" viewBox="0 0 32 32" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <path d="  M16,7C9.934,7,4.798,10.776,3,16c1.798,5.224,6.934,9,13,9s11.202-3.776,13-9C27.202,10.776,22.066,7,16,7z" fill="none" id="XMLID_10_" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
                <circle cx="16" cy="16" fill="none" id="XMLID_12_" r="5" stroke="#000000" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="2"/>
              </svg>
            </div>
          }
        </div>
      {error && <span className={s.error_msg}>{error}</span>}
    </div>

  )
}

export default Input