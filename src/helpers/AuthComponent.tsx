import React, { FC } from 'react'

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