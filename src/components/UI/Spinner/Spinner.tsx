import React from 'react'
import s from './Spinner.module.scss'

export default function Spinner() {
  return (
    <div className={s.spinner_container}>
      <div className={s.spinner}></div>
    </div>
  )
}
