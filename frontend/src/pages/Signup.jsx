import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

import Header from "../components/Header";
import Footer from "../components/Footer";

import logoImg from "../assets/xie.png"; 

export default function Signup() {
  // --- ÉTATS DU FORMULAIRE ---
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  
  // États pour les cases à cocher
  const [goals, setGoals] = useState([]); 
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [newsletter, setNewsletter] = useState(false);

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoalChange = (goal) => {
    if (goals.includes(goal)) {
      setGoals(goals.filter((g) => g !== goal));
    } else {
      setGoals([...goals, goal]);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== passwordConfirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the Terms of Service to create an account.");
      return;
    }

    try {
      const payload = {
        username,
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        password,
        password_confirmation: passwordConfirmation,
        learning_goals: goals,
        newsletter: newsletter,
        terms_accepted: agreeTerms
      };

      const response = await api.post("/register", payload);

      if (response.data.access_token) {
        localStorage.setItem("ACCESS_TOKEN", response.data.access_token);
        navigate("/dashboard");
      } else {
        navigate("/login");
      }

    } catch (err) {
      console.error(err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Une erreur est survenue lors de l'inscription.");
      }
    }
  };

  const CheckIcon = () => (
    <svg className="w-6 h-6 text-green-500 mt-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  );

  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      <Header />
      <main className="flex-grow bg-gray-50 flex items-center justify-center py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          <div className="order-2 lg:order-1 flex flex-col items-start space-y-8 lg:sticky lg:top-28 pt-4">
            
            <div className="flex items-center gap-3 mb-2">
              <img 
                src={logoImg} 
                alt="SinoLearn Logo" 
                className="w-10 h-10 rounded-full object-cover" 
              />
              <span className="text-2xl font-bold text-gray-900">SinoLearn</span>
            </div>

            <div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Begin your Chinese <br/> learning adventure
              </h1>
              <p className="text-gray-500 text-lg leading-relaxed max-w-lg">
                Join thousands of learners worldwide mastering Chinese Mandarin with our comprehensive platform.
              </p>
            </div>

            <div className="space-y-6 pt-2">
              <div className="flex items-start gap-4">
                <CheckIcon />
                <div>
                  <h3 className="text-gray-900 font-bold text-lg">Interactive Lessons</h3>
                  <p className="text-gray-500">Learn with engaging video and audio content</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckIcon />
                <div>
                  <h3 className="text-gray-900 font-bold text-lg">HSK Test Preparation</h3>
                  <p className="text-gray-500">Access to 100+ audio and writing exercises</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckIcon />
                <div>
                  <h3 className="text-gray-900 font-bold text-lg">Community Support</h3>
                  <p className="text-gray-500">Detailed analytics of your learning curve</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 w-full bg-white rounded-[2rem] shadow-2xl border border-gray-100 p-8 md:p-12 relative overflow-hidden">
            
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-red-500 to-yellow-500"></div>

            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Create an account</h2>
              <p className="text-gray-500">It's free and takes less than a minute</p>
            </div>

            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded mb-6 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSignup} className="space-y-5">
              
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Username</label>
                <input
                  type="text"
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition bg-gray-50 focus:bg-white"
                  placeholder="CoolPanda88"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">First Name</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition bg-gray-50 focus:bg-white"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Last Name</label>
                  <input
                    type="text"
                    required
                    className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition bg-gray-50 focus:bg-white"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Email Address</label>
                <input
                  type="email"
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition bg-gray-50 focus:bg-white"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Phone Number</label>
                <input
                  type="tel"
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition bg-gray-50 focus:bg-white"
                  placeholder="+33 6 12 34 56 78"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Password</label>
                <input
                  type="password"
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition bg-gray-50 focus:bg-white"
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Confirm Password</label>
                <input
                  type="password"
                  required
                  className="w-full border border-gray-300 px-4 py-3 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none transition bg-gray-50 focus:bg-white"
                  placeholder="Repeat your password"
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
              </div>

              <div className="pt-4 pb-2">
                <label className="block text-sm font-bold text-gray-900 mb-3">
                  What's your learning goal? <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["HSK Prep", "Business", "Travel", "Personal"].map((goal) => (
                    <div key={goal} className="flex items-center p-3 border border-gray-200 rounded-lg hover:border-red-200 transition bg-gray-50 hover:bg-white">
                      <input
                        id={`goal-${goal}`}
                        type="checkbox"
                        value={goal}
                        checked={goals.includes(goal)}
                        onChange={() => handleGoalChange(goal)}
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded cursor-pointer"
                      />
                      <label htmlFor={`goal-${goal}`} className="ml-3 text-sm font-medium text-gray-700 cursor-pointer flex-grow">
                        {goal}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3 pt-2 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="flex items-start">
                  <input
                    id="terms"
                    type="checkbox"
                    required
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                    className="h-5 w-5 mt-0.5 text-red-600 focus:ring-red-500 border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-gray-600 leading-tight">
                    I agree to the <a href="#" className="text-red-600 font-bold hover:underline">Terms of Service</a> and <a href="#" className="text-red-600 font-bold hover:underline">Privacy Policy</a>
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    id="newsletter"
                    type="checkbox"
                    checked={newsletter}
                    onChange={(e) => setNewsletter(e.target.checked)}
                    className="h-5 w-5 mt-0.5 text-red-600 focus:ring-red-500 border-gray-300 rounded cursor-pointer"
                  />
                  <label htmlFor="newsletter" className="ml-3 text-sm text-gray-600 leading-tight">
                    Send me learning tips, news and special offers via email
                  </label>
                </div>
              </div>

              <button 
                type="submit" 
                className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition duration-200 shadow-lg shadow-red-600/20 mt-6"
              >
                Create Account
              </button>

            </form>

            <p className="mt-8 text-center text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-red-600 font-bold hover:underline">
                Sign in here
              </Link>
            </p>

          </div>

        </div>

      </main>

      <Footer />
      
    </div>
  );
}