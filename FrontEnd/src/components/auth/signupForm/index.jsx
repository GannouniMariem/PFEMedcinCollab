//
import React, { useState } from "react";
import axios from "axios";
import InputComponent from "../../InputComponent/InputComponent";
import SelectComponent from "../../SelectComponent/SelectComponent";
import ButtonComponent from "../../ButtonComponent/ButtonComponent";
import "./signupForm.css";
import CONFIG from "../../../config";

function SignupForm() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [raisonSociale, setRaisonSociale] = useState("");
  const [numeroTelephone, setNumeroTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [adresseProfessionnelle, setAdresseProfessionnelle] = useState("");
  const [ville, setVille] = useState("");
  const [codePostal, setCodePostal] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const specialiteOptions = [
    { value: "Docteur", label: "Docteur" },
    { value: "Patient", label: "Patient" },
    { value: "Collaborateur", label: "Collaborateur" },
    { value: "Admin", label: "Admin" },
    { value: "manager", label: "Manager" },
  ];

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Validation simple
    if (!prenom || !nom || !email || !specialite) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      const response = await axios.post(
        `${CONFIG.API_BASE_URL}/auth/signup`,
        {
          firstName: prenom,
          lastName: nom,
          specialty: specialite,
          companyName: raisonSociale,
          phoneNumber: numeroTelephone,
          email,
          professionalAddress: adresseProfessionnelle,
          city: ville,
          postalCode: codePostal,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Réponse du serveur:", response.data);
      setSuccessMessage(
        "Inscription réussie ! Vous pouvez maintenant vous connecter."
      );

      // Réinitialiser les champs du formulaire
      setPrenom("");
      setNom("");
      setSpecialite("");
      setRaisonSociale("");
      setNumeroTelephone("");
      setEmail("");
      setAdresseProfessionnelle("");
      setVille("");
      setCodePostal("");
    } catch (error) {
      console.error(
        "Erreur lors de l'inscription:",
        error.response ? error.response.data : error.message
      );
      setError(
        "Erreur lors de l'inscription. Veuillez vérifier vos informations."
      );
    }
  };

  return (
    <form className="inscription-form" onSubmit={handleFormSubmit}>
      <h2>Créez un compte</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
      {error && <div className="error-message">{error}</div>}
      <div className="input-part">
        <InputComponent
          label="Prénom"
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
        />
        <InputComponent
          label="Nom"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
      </div>
      <div className="input-part">
        <SelectComponent
          label="Spécialité"
          options={specialiteOptions}
          value={specialite}
          onChange={(e) => setSpecialite(e.target.value)}
        />
        <InputComponent
          label="Raison Sociale"
          placeholder="Raison Sociale"
          value={raisonSociale}
          onChange={(e) => setRaisonSociale(e.target.value)}
        />
      </div>
      <div className="input-part">
        <InputComponent
          label="Numéro de téléphone"
          placeholder="Numéro de téléphone"
          value={numeroTelephone}
          onChange={(e) => setNumeroTelephone(e.target.value)}
        />
        <InputComponent
          label="Email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="input-part">
        <InputComponent
          label="Adresse Professionnelle"
          placeholder="Adresse Professionnelle"
          value={adresseProfessionnelle}
          onChange={(e) => setAdresseProfessionnelle(e.target.value)}
        />
        <div className="input-ville-code-postal">
          <InputComponent
            placeholder="Ville"
            value={ville}
            onChange={(e) => setVille(e.target.value)}
          />
          <InputComponent
            placeholder="Code postal"
            value={codePostal}
            onChange={(e) => setCodePostal(e.target.value)}
          />
        </div>
      </div>
      <ButtonComponent button="Créer un compte" type="submit" />
    </form>
  );
}

export default SignupForm;
