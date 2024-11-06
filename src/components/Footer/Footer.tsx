import React from 'react'
import s from './Footer.module.scss'

export default function Footer() {
  return (
    <footer className={s.footer}>
      <p>Developed by Ihor Vynohradnyi: </p>
      <a href="https://github.com/tonykrapatony/">
        <img src="/assets/images/svg/github_icon.svg" alt="" />
      </a>
      <a href="https://www.linkedin.com/in/ihor-vynohradnyi-b97b37153/">
        <img src="/assets/images/svg/linkedin_icon.svg" alt="" />
      </a>
    </footer>
  )
}
