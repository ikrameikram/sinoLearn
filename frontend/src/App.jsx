import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard"; // Import du nouveau Dashboard

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Page Dashboard qui contient son propre Header */}
          <Route path="/dashboard" element={<dashboard />} />
          {/* Route par défaut */}
          <Route path="/" element={<dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
