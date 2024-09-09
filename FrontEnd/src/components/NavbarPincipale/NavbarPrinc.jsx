import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./NavbarPrinc.css";
import clock from "../../assets/images/clock.svg";
import doc from "../../assets/images/doc.svg";
import home from "../../assets/images/home.svg";
import calender from "../../assets/images/calender.svg";
import patient from "../../assets/images/patient.svg";
import colab from "../../assets/images/hand.svg";
import lettre from "../../assets/images/lettre.svg";
import CONFIG from "../../config";
import Mock from 'mockjs';

const NavbarPrinc = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
console.log('error',error)

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Token non trouvé.");
    }
    console.log('token',token)
    const response = await axios.get(`${CONFIG.API_BASE_URL}/auth/profile`, {
      withCredentials: true,
    })

    console.log("response", response.data);

    try{
      console.log("response",response)
    }catch(error){
      console.log("Error",error)    
    }
    
    // try {
      

    //   setUser({
    //     firstName: response.data.user.firstName,
    //     lastName: response.data.user.lastName,
    //     specialty: response.data.user.specialty,
    //   });
    //   setError(null);
    // } catch (error) {
    //   if (error.response && error.response.status === 401) {
    //     setError("Session expirée, veuillez vous reconnecter.");
    //     // localStorage.removeItem("token");
    //     // window.location.href = "/dashboard"; // Redirection vers la page de connexion
    //   } else {
    //     setError("Erreur lors de la récupération des données utilisateur.");
    //   }
    // }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <div className="navbarPrincipale">
      <h1>LOGO</h1>
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
          <img src={colab} alt="collab" className="nav-icon" />
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
              {user.firstName} {user.lastName}
            </h2>
            <p>{user.specialty}</p>
          </div>
        ) : (
          <p>{error}</p>
        )}
      </div>
    </div>
  );
};

export default NavbarPrinc;
