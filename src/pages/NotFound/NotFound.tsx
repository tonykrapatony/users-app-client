import React from 'react'
import { Link } from 'react-router-dom'
import s from './NotFound.module.scss'

export default function NotFound() {
  return (
    <div className={s.not_found}>
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/">Go to home page</Link>
    </div>
  )
}
