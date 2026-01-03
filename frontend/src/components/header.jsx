import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function header({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    axios.post("http://127.0.0.1:8000/api/logout", {}, {
      headers: { "Authorization": `Bearer ${token}`, "Accept": "application/json" }
    })
    .then(() => {
      localStorage.removeItem("ACCESS_TOKEN");
      navigate("/login"); // Redirige vers login après déconnexion
    })
    .catch(() => {
      localStorage.removeItem("ACCESS_TOKEN");
      navigate("/login");
    });
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link to="/dashboard" className="text-2xl font-bold text-red-600">SinoLearn 🎓</Link>
      </div>

      <div className="flex items-center gap-6">
        {user && (
          <div className="text-right hidden md:block">
            <p className="text-sm font-bold text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500 uppercase">{user.role}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition"
        >
          Déconnexion
        </button>
      </div>
    </nav>
  );
}