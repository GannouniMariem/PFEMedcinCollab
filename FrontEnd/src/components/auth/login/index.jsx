//

import React, { useState } from "react";
import InputComponent from "../../InputComponent/InputComponent";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import { useNavigate } from "react-router-dom";
import "./loginForm.css";
import { login } from "../../../api/auth";
import { accountServices } from "../../../services/auth";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleConnexion = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email et mot de passe sont requis.");
      return;
    }

    login({email,password})
    .then((res)=>{
      console.log(res)
      accountServices.logIn(res.data.token)
      setEmail("");
      setPassword("");
      setError("");

      navigate("/");
    }).catch((error)=>{
      console.error("Erreur lors de la connexion:", error);
      setError(
        "Erreur lors de la connexion. Veuillez vérifier vos informations."
      );
    })

  };

  return (
      <div className="connexion-block">
        <div className="inputPart">
          <InputComponent
            className="labelInput"
            label="Email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
          <InputComponent
            className="labelInput"
            label="Password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <ButtonComponent button="Se connecter" onClick={handleConnexion} />
        {error && <p className="error-message">{error}</p>}
      </div>
  );
}

export default LoginForm;
