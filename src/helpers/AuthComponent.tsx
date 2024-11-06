import React, { FC } from 'react'
import Spinner from '../components/UI/Spinner/Spinner';

type AuthComponentProps = {
  token: string | undefined;
  children: React.ReactNode;
}

const AuthComponent: FC<AuthComponentProps> = ({ token, children }) => {
  return (
    <>
      {token ? children : <p>Please sign in</p>}
    </>
  )
}

export default AuthComponent