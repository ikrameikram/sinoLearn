import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../assets/xie.png"; 
const DEFAULT_AVATAR = "https://ui-avatars.com/api/?name=User&background=random";
export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [userRole, setUserRole] = useState("user");
  const dropdownRef = useRef(null);
  useEffect(() => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    const role = localStorage.getItem("USER_ROLE");
    if (token) {
      setIsLoggedIn(true);
      if (role) setUserRole(role);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const handleLogout = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("USER_ROLE");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="bg-white py-4 shadow-sm sticky top-0 z-50">
      <div className="w-full px-8 lg:px-32 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
          <img src={logoImg} alt="Logo SinoLearn" className="h-10 w-10 rounded-full object-cover" />
          <span className="font-bold text-2xl text-gray-900">SinoLearn</span>
        </Link>
        <div className="flex items-center gap-6">
          {isLoggedIn ? (
            <>
              <div className="hidden md:flex items-center gap-6 text-sm font-bold text-gray-600">
                {userRole === 'admin' && (
                    <Link to="/dashboard" className="text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-lg hover:bg-red-100 transition">
                      Admin Panel
                    </Link>
                )}
                
                <Link to="/lessons" className="hover:text-red-600 transition">My Lessons</Link>
                <Link to="/dashboard" className="hover:text-red-600 transition">My Progression</Link>
              </div>

              <div className="hidden md:block h-6 w-px bg-gray-200"></div>
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setShowDropdown(!showDropdown)} className="flex items-center gap-2 focus:outline-none relative">
                  <img src={DEFAULT_AVATAR} alt="Profile" className="h-10 w-10 rounded-full border-2 border-gray-100 hover:border-red-200 transition object-cover"/>
                  {userRole === 'admin' && (
                    <span className="absolute -bottom-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded border border-white">
                      ADMIN
                    </span>
                  )}
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                        <span className="text-xs font-bold text-gray-400 uppercase">Rôle : {userRole}</span>
                    </div>
                    <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-red-600 font-medium transition" onClick={() => setShowDropdown(false)}>
                      My Profile
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold transition flex items-center gap-2">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="hidden md:flex items-center gap-6 mr-4">
                <Link to="/about" className="text-gray-600 font-medium hover:text-red-600 transition">About</Link>
                <Link to="/hsk-prep" className="text-gray-600 font-medium hover:text-red-600 transition">HSK Prep</Link>
              </div>
              <div className="flex items-center gap-3">
                <Link to="/login" className="bg-white text-gray-700 border border-gray-300 px-5 py-2 rounded-lg font-bold hover:bg-gray-50 transition text-sm">Sign In</Link>
                <Link to="/signup" className="bg-red-600 text-white px-5 py-2 rounded-lg font-bold hover:bg-red-700 transition shadow-sm text-sm">Start Learning</Link>
              </div>
            </>
          )}

        </div>
      </div>
    </header>
  );
}