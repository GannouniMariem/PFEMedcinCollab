import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { calender, clock, doc, hand, home, lettre, patient } from '../assets/images'
import LoginForm from '../components/auth/login';
import { getLoggedUserData } from '../api/auth';

const Navbar = ({ auth }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('user not found');
  const token = localStorage.getItem('token')
  const loginState = localStorage.getItem('isLoggedIn')

  const getLoggedUser = () => {
    if (loginState && token) {
      getLoggedUserData().then((res) => {
        console.log("res", res)
      }).catch((error) => {
        console.log("error", error)
      })
    }
  }
  useEffect(() => {
    getLoggedUser()
  }, [])

  return (
    <div className="navbarPrincipale">
      <h1>LOGO</h1>
      {
        !token && auth ? <LoginForm /> : <>
          <div className="block2">
            <Link to="/home">
              <img src={home} alt="home" className="nav-icon" />
            </Link>
            <Link to="/calender">
              <img src={calender} alt="calender" className="nav-icon" />
            </Link>
            <Link to="/patients">
              <img src={patient} alt="patient" className="nav-icon" />
            </Link>
            <Link to="/collab">
              <img src={hand} alt="collab" className="nav-icon" />
            </Link>
            <Link to="/recommendation">
              <img src={lettre} alt="recommendation" className="nav-icon" />
            </Link>
            <Link to="/document">
              <img src={doc} alt="document" className="nav-icon" />
            </Link>
            <Link to="/time">
              <img src={clock} alt="time" className="nav-icon" />
            </Link>
          </div>
          <div className="userInfo">
            {user ? (
              <div>
                <h2>
                  {user?.firstName} {user?.lastName}
                </h2>
                <p>{user?.specialty}</p>
              </div>
            ) : (
              <p>{error}</p>
            )}
          </div>
        </>
      }
    </div>
  )
}

export default Navbar