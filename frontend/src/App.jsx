import { useEffect, useState } from "react";
import axios from "axios";
function App() {
  // État pour stocker la réponse du Backend Laravel
  const [message, setMessage] = useState("Connexion au serveur...");
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    // Test de l'appel vers ton API Laravel (Port 8000)
    axios
      .get("http://localhost:8000/api/hello")
      .then((response) => {
        // Si ça marche, on récupère le message du JSON
        setMessage(response.data.message);
        setStatus("success");
      })
      .catch((error) => {
        // Si ça échoue (serveur éteint ou erreur CORS)
        console.error("Erreur détectée:", error);
        setMessage("Erreur : Impossible de contacter Laravel sur le port 8000");
        setStatus("error");
      });
  }, []);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="p-10 bg-white rounded-2xl shadow-2xl text-center border-t-4 border-blue-600">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4">
          SinoLearn Project
        </h1>

        {/* Affichage dynamique selon l'état de la connexion */}
        <div
          className={`mt-4 p-4 rounded-lg font-medium ${
            status === "success"
              ? "bg-green-100 text-green-700"
              : status === "error"
              ? "bg-red-100 text-red-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {message}
        </div>

        <p className="mt-6 text-sm text-gray-500 italic">
          Frontend: <span className="font-mono">Port 5173</span> | Backend:{" "}
          <span className="font-mono">Port 8000</span>
        </p>
      </div>
    </div>
  );
}
export default App;
