import React from 'react'
import Navbar from './Navbar'

export const Layout = ({children}) => {
    const auth = true
  return (
    <React.Fragment>
        <Navbar auth={auth}/>
        <main>
          {children}
        </main>
    </React.Fragment>
  )
}
