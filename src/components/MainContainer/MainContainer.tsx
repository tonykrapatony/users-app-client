import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import s from './MainContainer.module.scss'
import Footer from '../Footer/Footer'

export default function MainContainer() {
  return (
    <section className={s.main_container}>
      <Header />
      <div className={s.container}>
        <Outlet />        
      </div>
      <Footer />
    </section>
  )
}
