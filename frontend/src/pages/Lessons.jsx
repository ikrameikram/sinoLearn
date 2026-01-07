import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // <--- Import Important
import Header from "../components/Header";
import Footer from "../components/Footer";
import api from "../api/axios";

// Imports des images
import ecouteIcon from "../assets/ecoute.png";
import writingIcon from "../assets/writing.png";
import conversationIcon from "../assets/conversation.png";
import readingIcon from "../assets/reading.png";

export default function Lessons() {
  
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // États Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate(); // <--- Hook pour naviguer

  const categories = [
    { title: "Pronunciation", desc: "Master tones and correct pronunciation", icon: ecouteIcon },
    { title: "Writing", desc: "Learn stroke order and character composition", icon: writingIcon },
    { title: "Conversation", desc: "Practice real-life dialogues and scenarios", icon: conversationIcon },
    { title: "Reading", desc: "Build vocabulary and reading comprehension", icon: readingIcon },
  ];

  const fetchLessons = async (page) => {
    setLoading(true);
    try {
      const response = await api.get(`/lessons?page=${page}`);
      
      const data = response.data;
      
      // Mapping des données
      const mappedLessons = data.data.map((lesson) => ({
        id: lesson.id,
        // On récupère l'ID du cours pour construire l'URL de l'exercice
        // IMPORTANT : Si lesson.course est null, on met 1 par défaut (fallback)
        courseId: lesson.course ? lesson.course.id : 1, 
        hskLevel: lesson.course ? `HSK ${lesson.course.hsk_level}` : "HSK 1", 
        status: "Start", 
        statusColor: "text-gray-600",
        title: lesson.title,
        desc: lesson.description || "No description available.",
        keyTopics: ["Vocabulary", "Grammar"], 
        skills: ["Reading", "Speaking"], 
        duration: "20 min"
      }));

      setLessons(mappedLessons);
      setCurrentPage(data.current_page);
      setTotalPages(data.last_page);

    } catch (error) {
      console.error("Erreur chargement leçons:", error);
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem('ACCESS_TOKEN')) {
      navigate('/login');
    } else {
      fetchLessons(currentPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [currentPage, navigate]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <main className="flex-grow flex flex-col">
        <section className="bg-gray-50 py-12 text-center">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-10">Categories</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((cat, index) => (
                <div key={index} className="bg-white border border-gray-200 p-6 rounded-2xl hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-center items-center text-center cursor-pointer">
                  <img src={cat.icon} alt={cat.title} className="w-12 h-12 object-contain mb-4" />
                  <h3 className="text-lg font-extrabold text-gray-900 mb-2">{cat.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-[#F0F9FF] py-16 flex-grow">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">All Lessons</h2>
            
            {lessons.length === 0 ? (
               <div className="text-center text-gray-500">Aucune leçon disponible pour le moment.</div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center mb-16">
                  {lessons.map((lesson) => (
                    <div key={lesson.id} className="bg-white border border-gray-200 rounded-3xl p-6 w-full max-w-md hover:shadow-xl transition-all duration-300 flex flex-col">
                      
                      <div className="flex justify-between items-center mb-4">
                        <div className="bg-yellow-100 text-yellow-800 font-extrabold px-3 py-1 rounded-lg text-xs tracking-wider border border-yellow-200">
                          {lesson.hskLevel}
                        </div>
                        <span className={`font-bold text-sm tracking-wide ${lesson.statusColor}`}>
                          {lesson.status}
                        </span>
                      </div>

                      <h3 className="text-lg font-extrabold text-gray-900 mb-2 leading-tight">
                        {lesson.title}
                      </h3>
                      <p className="text-gray-500 text-sm mb-5 leading-relaxed line-clamp-2">
                        {lesson.desc}
                      </p>

                      <div className="mb-5">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Key Topics</p>
                        <div className="flex flex-wrap gap-2">
                          {lesson.keyTopics.map((topic, i) => (
                            <span key={i} className="text-gray-800 bg-gray-50 px-2 py-1 rounded text-sm font-medium border border-gray-100">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="border-t border-gray-100 mt-auto mb-4"></div>

                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-gray-400 text-sm font-bold">
                          <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          {lesson.duration}
                        </div>
                        <button 
                          onClick={() => navigate(`/courses/${lesson.courseId}/lessons/${lesson.id}/exercises`)}
                          className="bg-gray-100 text-gray-600 px-5 py-2 rounded-xl text-sm font-bold hover:bg-gray-200 hover:text-gray-800 transition-colors"
                        >
                          Review
                        </button>

                      </div>
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center items-center gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-4 py-2 rounded-lg font-bold text-sm transition ${currentPage === 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200 shadow-sm"}`}
                    >
                      Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-10 h-10 rounded-lg font-bold text-sm flex items-center justify-center transition shadow-sm ${currentPage === page ? "bg-red-600 text-white border border-red-600" : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"}`}
                      >
                        {page}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-4 py-2 rounded-lg font-bold text-sm transition ${currentPage === totalPages ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-white text-gray-700 hover:bg-red-50 hover:text-red-600 border border-gray-200 shadow-sm"}`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
            
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}