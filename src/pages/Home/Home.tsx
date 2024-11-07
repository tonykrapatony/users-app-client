import React from 'react'
import s from './Home.module.scss'

export default function Home() {
  return (
    <div className={s.home_page}>
      <h1>Users app</h1>
      <div className={s.content}>
        <p>Is simple web application where you can create posts, comment and like them, and add other users as friends.</p>
        <p>It is not developed for commercial purposes.</p>
        <p>Please log in or register to start using it. </p>
        <p>Please do not leave important confidential personal data</p>
      </div>
    </div>
  )
}
