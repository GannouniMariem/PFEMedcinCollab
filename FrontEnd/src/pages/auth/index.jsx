import React from 'react'
import SignupForm from '../../components/auth/signupForm';
import { logo } from '../../assets/images';

export const Auth = () => {
  return (
    <div className="bodyInscription">
      <SignupForm />
      <img src={logo} alt="logoImage" className="logoImage" />
    </div>
  )
}
