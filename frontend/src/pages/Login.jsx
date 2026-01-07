import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post("/login", { email, password });
      localStorage.setItem("ACCESS_TOKEN", response.data.access_token);
      if (response.data.user && response.data.user.role) {
         localStorage.setItem("USER_ROLE", response.data.user.role);
      }

      navigate("/dashboard");
      
    } catch (err) {
      console.error(err);
      setError("Identifiants incorrects. Veuillez réessayer.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      
      <Header /> 

      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border border-gray-200">
          
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
            Connexion <span className="text-red-600">SinoLearn</span>
          </h1>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Mot de passe</label>
              <input
                type="password"
                required
                className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700 transition duration-200 shadow-md"
            >
              Se connecter
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Pas encore de compte ?{" "}
            <Link to="/signup" className="text-red-600 font-bold hover:underline">
              Créer un compte
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}