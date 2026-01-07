import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../api/axios";
import trophyImg from "../assets/trophy.png"; 

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user"); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
 
    const storedRole = localStorage.getItem("USER_ROLE");
    if (storedRole) setRole(storedRole);
    const fetchUserData = async () => {
      try {
        const response = await api.get('/user');
        setUser(response.data);
      } catch (error) {
        console.error("Erreur chargement profil:", error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    if (!localStorage.getItem('ACCESS_TOKEN')) {
      navigate('/login');
    } else {
      fetchUserData();
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      <Header />

      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Hello, <span className="text-red-600">{user?.name}</span>! 👋
            </h1>
            <p className="text-gray-500">
               Rôle actuel : <span className="font-bold uppercase text-gray-800">{role}</span>
            </p>
          </div>
        </div>

        {role === 'admin' ? (
            <div className="space-y-8">
                <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl shadow-sm">
                    <h2 className="text-2xl font-bold text-red-800 mb-2">⚠️ Panneau d'Administration</h2>
                    <p className="text-red-700 mb-6">Vous avez les droits complets pour gérer la plateforme.</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <button className="bg-white p-6 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition text-left group">
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600">Gérer les Cours</h3>
                            <p className="text-gray-500 text-sm mt-1">Ajouter, modifier ou supprimer des leçons.</p>
                        </button>
                        <button className="bg-white p-6 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition text-left group">
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600">Utilisateurs</h3>
                            <p className="text-gray-500 text-sm mt-1">Voir la liste des étudiants inscrits.</p>
                        </button>
                        <button className="bg-white p-6 rounded-xl border border-red-100 shadow-sm hover:shadow-md transition text-left group">
                            <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-600">Statistiques</h3>
                            <p className="text-gray-500 text-sm mt-1">Vue d'ensemble de la plateforme.</p>
                        </button>
                    </div>
                </div>
            </div>

        ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-[#1F2937] rounded-3xl p-8 text-white relative overflow-hidden shadow-xl">
                        <div className="relative z-10">
                            <div className="inline-block bg-red-600 text-xs font-bold px-3 py-1 rounded-full mb-4">
                                CONTINUE LEARNING
                            </div>
                            <h2 className="text-2xl font-bold mb-2">Reprendre ma dernière leçon</h2>
                            <p className="text-gray-400 mb-6 max-w-md">
                                Continuez votre progression là où vous vous êtes arrêté.
                            </p>
                            <Link to="/lessons" className="inline-block bg-white text-gray-900 px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition">
                                Go to Lessons
                            </Link>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 pointer-events-none"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                            <p className="text-4xl font-bold text-red-600">12</p>
                            <p className="text-gray-500 text-sm">Leçons complétées</p>
                        </div>
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
                            <p className="text-4xl font-bold text-yellow-500">85%</p>
                            <p className="text-gray-500 text-sm">Score Moyen</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                        <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/lessons" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition group">
                                    <span className="text-gray-600 group-hover:text-red-600 font-medium">My Lessons</span>
                                    <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded">Access</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/hsk-prep" className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition group">
                                    <span className="text-gray-600 group-hover:text-red-600 font-medium">Mock Tests</span>
                                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">New</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        )}

      </main>
      <Footer />
    </div>
  );
}