import { useState } from "react";
import axios from "axios"; // 1. Import direct

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "etudiant",
    bio: "",
    target_hsk_level: 1,
  });

  const [errors, setErrors] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(null);

    try {
      // 2. Appel DIRECT avec URL complète et Headers manuels
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register", // URL complète
        formData, // Les données
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Succès :", response.data);

      // 3. IMPORTANT : Sauvegarder le token reçu pour plus tard
      localStorage.setItem("ACCESS_TOKEN", response.data.access_token);

      alert("Compte créé !");
      // Ici, vous pourriez rediriger vers le dashboard
      // window.location.href = "/dashboard";
    } catch (err) {
      if (err.response && err.response.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        console.error(err);
      }
    }
  };

  // ... (Le reste du code JSX pour le formulaire reste identique à avant)
  // Voulez-vous que je remette le JSX du formulaire ici ?
  return (
    <form onSubmit={handleSubmit}>
      {/* Exemple pour un champ */}
      <input
        type="text"
        placeholder="Nom"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <button type="submit">S'inscrire</button>
    </form>
  );
}
