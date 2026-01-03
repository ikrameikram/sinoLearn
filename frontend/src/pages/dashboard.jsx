import { useEffect, useState } from "react";
import axios from "axios";
import header from "../components/header";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (!token) {
      window.location.href = "/login";
      return;
    }

    axios.get("http://127.0.0.1:8000/api/user", {
      headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
    })
    .then(({ data }) => {
      setUser(data);
      setLoading(false);
    })
    .catch(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-10 text-center">Chargement du tableau de bord...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* APPEL DU HEADER ICI */}
      <header user={user} />

      <main className="max-w-7xl mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-gray-800">Tableau de bord</h2>
        <p className="text-gray-600 mt-2">Bienvenue dans votre espace d'apprentissage du Chinois.</p>
        
        {/* Contenu spécifique du Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-red-600 font-bold">Mon Niveau HSK</h3>
            <p className="text-2xl font-black mt-2">{user?.profile?.target_hsk_level || "1"}</p>
          </div>
          {/* Ajoutez d'autres cartes ici */}
        </div>
      </main>
    </div>
  );
}