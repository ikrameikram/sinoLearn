import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Récupération des données au chargement de la page
  useEffect(() => {
    // Récupérer le token stocké lors du login/register
    const token = localStorage.getItem("ACCESS_TOKEN");

    // Si pas de token, on redirige ou on affiche une erreur
    if (!token) {
      setError("Vous n'êtes pas connecté.");
      setLoading(false);
      return;
    }

    // Appel API avec les headers manuels
    axios.get("http://127.0.0.1:8000/api/user", {
      headers: {
        "Authorization": `Bearer ${token}`, // Indispensable pour Sanctum
        "Accept": "application/json",
      },
    })
    .then(({ data }) => {
      setUser(data); // Laravel renvoie l'user AVEC le profile imbriqué
      setLoading(false);
    })
    .catch((err) => {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setError("Session expirée. Veuillez vous reconnecter.");
        localStorage.removeItem("ACCESS_TOKEN"); // Nettoyage
      } else {
        setError("Erreur lors du chargement du profil.");
      }
      setLoading(false);
    });
  }, []);

  // 2. Fonction de Déconnexion
  const handleLogout = () => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    
    axios.post("http://127.0.0.1:8000/api/logout", {}, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
      },
    })
    .then(() => {
      // Nettoyer le navigateur et rediriger
      localStorage.removeItem("ACCESS_TOKEN");
      window.location.href = "/login"; // Ou utiliser useNavigate() si vous avez react-router
    });
  };

  // 3. Affichage conditionnel (Chargement / Erreur)
  if (loading) {
    return <div className="text-center mt-10">Chargement de vos données...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  // 4. Affichage du Profil (Si tout va bien)
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-xl overflow-hidden max-w-2xl w-full">
        
        {/* En-tête coloré */}
        <div className="bg-red-600 h-32 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold">Espace Étudiant</h1>
        </div>

        {/* Info Utilisateur (Table Users) */}
        <div className="px-8 py-6 relative">
          {/* Avatar (Placeholder) */}
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-4xl shadow-md absolute -top-12 border-4 border-white">
            🎓
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2 uppercase font-bold">
              {user.role}
            </span>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Info Profil (Table Profiles) */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Détails d'apprentissage
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Carte Niveau HSK */}
              <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                <p className="text-sm text-red-600 font-semibold">Objectif HSK</p>
                {/* On utilise ?. pour éviter le crash si profile est null */}
                <p className="text-2xl font-bold text-red-800">
                  Niveau {user.profile?.target_hsk_level ?? "Non défini"}
                </p>
              </div>

              {/* Carte Bio */}
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 col-span-1 md:col-span-2">
                <p className="text-sm text-gray-600 font-semibold mb-1">Votre Bio</p>
                <p className="text-gray-800 italic">
                  "{user.profile?.bio || "Aucune biographie renseignée."}"
                </p>
              </div>
            </div>
          </div>

          {/* Bouton Déconnexion */}
          <div className="mt-8 flex justify-end">
            <button
              onClick={handleLogout}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}