import React from 'react'
import { Navigate } from 'react-router-dom'

const AuthGuard = ({children,auth}) => {
    const token = localStorage.getItem('token')
    if(!auth){
        return children
    }
  return token? children: <Navigate to="/login" replace/>
}


export default AuthGuard;