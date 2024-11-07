import React, { useState } from 'react'
import s from './Header.module.scss'
import { Link } from 'react-router-dom'
import PrimaryButton from '../UI/PrimaryButton/PrimaryButton'
import ModalWindow from '../UI/ModalWindow/ModalWindow'
import UserRegistration from '../Forms/UserRegistration/UserRegistration'
import UserLogin from '../Forms/UserLogin/UserLogin'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import ProfileDropdown from './ProfileDropdown/ProfileDropdown'
import ForgotPassword from '../Forms/ForgotPassword/ForgotPassword'


export default function Header() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [renderForm, setRenderForm] = useState<string>('');
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);

  const modalToggle = (form: string) => {
    setShowModal(!showModal);
    setRenderForm(form);
  }

  return (
    <>
      <header className={s.header} >
        <div className={s.logo}>
          <Link to="/">
            <img src="/assets/images/svg/logo.svg" alt="logo" width={60} height={60} />
          </Link>
        </div>
        {isAuth &&
          <nav>
            <Link to="/users">Users</Link>
            <Link to="/posts">Posts</Link>
            <ProfileDropdown />
          </nav>
        }
        {!isAuth && <PrimaryButton text='Sign In' onClick={() => modalToggle('register')}/>}
      </header>
      {showModal && <ModalWindow onClick={() => modalToggle('')}>
        {renderForm === 'register' && <UserRegistration setShowModal={setShowModal} setForm={setRenderForm}/>}
        {renderForm === 'login' && <UserLogin setShowModal={setShowModal} setForm={setRenderForm}/>}
        {renderForm === 'forgot' && <ForgotPassword setShowModal={setShowModal} setForm={setRenderForm}/>}
      </ModalWindow>}
    </>
  )
}
