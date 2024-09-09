import axios from 'axios';

// Créez une instance Axios
const api = axios.create({
  baseURL: 'http://localhost:5000', // URL de votre backend
  withCredentials: true, // Si vous utilisez des cookies pour l'authentification
});

// Définir un type pour les données d'inscription
interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  professionalAddress: string;
  city: string;
  postalCode: string;
  specialty?: string; // Optionnel
  companyName?: string; // Optionnel
}

// Fonction pour envoyer les données d'inscription
const handleSignup = async (signupData: SignupData) => {
  try {
    const response = await api.post('/auth/signup', signupData);
    console.log("Réponse de l'inscription:", response.data);
  } catch (error) {
    console.error(
      "Erreur lors de l'inscription:",
      error.response?.data || error.message,
    );
  }
};

// Exemple de données d'inscription
const signupData: SignupData = {
  firstName: 'imen',
  lastName: 'Feri',
  email: 'islem@example.com',
  password: 'password15',
  phoneNumber: '1234567890',
  professionalAddress: '123 Main St',
  city: 'City',
  postalCode: '12345',
  specialty: 'Cardiology',
  companyName: 'HealthCare Inc.',
};

// Appel de la fonction pour tester l'inscription
handleSignup(signupData);
