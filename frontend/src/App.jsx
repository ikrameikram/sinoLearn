import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; 
import Dashboard from "./pages/Dashboard";
import Lessons from "./pages/Lessons";
import Exercise from "./pages/Exercise"; 

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
    
        <Route path="/lessons" element={<Lessons />} />
        <Route 
            path="/courses/:courseId/lessons/:lessonId/exercises" 
            element={<Exercise />} 
        />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;