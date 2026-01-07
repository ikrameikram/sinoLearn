import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Exercise() {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [score, setScore] = useState(0);               
  const [showResult, setShowResult] = useState(false); 
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null); 
  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const response = await api.get(`/courses/${courseId}/lessons/${lessonId}`);
        setExercises(response.data.exercises || []);
      } catch (error) {
        console.error("Erreur lors du chargement des exercices:", error);
      } finally {
        setLoading(false);
      }
    };
    if (!localStorage.getItem('ACCESS_TOKEN')) {
      navigate('/login');
    } else {
      fetchLessonData();
    }
  }, [courseId, lessonId, navigate]);


  const handleAnswer = (option) => {
    if (feedback) return;
    setSelectedOption(option);
    const currentEx = exercises[currentIndex];
    const correctAnswer = currentEx.content.correct; 

    if (option === correctAnswer) {
      setFeedback("correct");
      setScore((prev) => prev + 1);
    } else {
      setFeedback("incorrect");
    }
  };

  const handleNext = () => {
    setSelectedOption(null);
    setFeedback(null);
    
    if (currentIndex < exercises.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = async () => {
    setShowResult(true);
    try {
        await api.post(`/lessons/${lessonId}/complete`);
    } catch (err) {
        console.error("Erreur sauvegarde progression", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (exercises.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
         <Header />
         <div className="flex-grow flex flex-col items-center justify-center p-10 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Aucun exercice disponible</h2>
            <p className="text-gray-500 mb-6">Cette leçon ne contient pas encore d'exercices pratiques.</p>
            <button onClick={() => navigate('/lessons')} className="bg-red-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-red-700 transition">
              Retour aux leçons
            </button>
         </div>
         <Footer />
      </div>
    );
  }

  if (showResult) {
    const percentage = Math.round((score / exercises.length) * 100);
    
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="bg-white p-10 rounded-3xl shadow-xl text-center max-w-lg w-full border border-gray-100 animate-fade-in-up">
            
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Félicitations ! 🎉</h1>
            <div className="relative inline-block mb-6">
                <svg className="w-40 h-40 transform -rotate-90">
                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-100" />
                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className={percentage >= 50 ? "text-green-500" : "text-red-500"} strokeDasharray={440} strokeDashoffset={440 - (440 * percentage) / 100} />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-4xl font-bold text-gray-800">
                    {percentage}%
                </div>
            </div>

            <p className="text-gray-500 text-lg mb-8">
              Vous avez obtenu <span className="font-bold text-gray-900">{score}</span> bonnes réponses sur <span className="font-bold text-gray-900">{exercises.length}</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <button 
                 onClick={() => navigate('/lessons')}
                 className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-bold hover:bg-gray-200 transition"
               >
                 Retour aux leçons
               </button>
               <button 
                 onClick={() => { setShowResult(false); setCurrentIndex(0); setScore(0); }}
                 className="bg-red-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-700 shadow-lg shadow-red-200 transition"
               >
                 Recommencer
               </button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const currentExercise = exercises[currentIndex];
  const { question, options } = currentExercise.content; 

  return (
    <div className="flex flex-col min-h-screen bg-[#F0F9FF] font-sans">
      <Header />
      
      <main className="flex-grow flex flex-col items-center py-8 lg:py-12 px-4">
        <div className="w-full max-w-2xl mb-8 flex items-center gap-4">
            <button onClick={() => navigate('/lessons')} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="flex-grow bg-white rounded-full h-3 overflow-hidden shadow-sm border border-gray-100">
                <div 
                    className="bg-red-600 h-full transition-all duration-500 ease-out rounded-full"
                    style={{ width: `${((currentIndex + 1) / exercises.length) * 100}%` }}
                ></div>
            </div>
            <span className="font-bold text-gray-500 text-sm">{currentIndex + 1}/{exercises.length}</span>
        </div>
        <div className="bg-white w-full max-w-2xl rounded-[2rem] shadow-xl border border-gray-100 p-8 md:p-12 relative overflow-hidden">
            
            <div className="mb-6">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-yellow-200">
                    {currentExercise.type ? currentExercise.type.replace('_', ' ') : 'Exercice'}
                </span>
            </div>

            <h2 className="text-lg text-gray-500 mb-2 font-medium">{currentExercise.instruction}</h2>
            <h3 className="text-2xl md:text-3xl font-extrabold text-gray-900 mb-10 leading-tight">
                {question || "Question..."}
            </h3>

            <div className="grid grid-cols-1 gap-4 mb-8">
                {currentExercise.type === 'QCM' && options && options.length > 0 ? (
                    options.map((option, idx) => {
                        let buttonStyle = "border-gray-100 hover:border-red-200 hover:bg-gray-50 text-gray-700 bg-white";
                        
                        if (selectedOption === option) {
                            if (feedback === 'correct') {
                                buttonStyle = "bg-green-50 border-green-500 text-green-700 shadow-md";
                            } else if (feedback === 'incorrect') {
                                buttonStyle = "bg-red-50 border-red-500 text-red-700 shadow-md";
                            }
                        } else if (feedback === 'incorrect' && option === currentExercise.content.correct) {
                             buttonStyle = "bg-green-50 border-green-500 text-green-700 opacity-70";
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleAnswer(option)}
                                disabled={feedback !== null}
                                className={`p-5 rounded-2xl border-2 text-left font-bold text-lg transition-all duration-200 ${buttonStyle}`}
                            >
                                {option}
                            </button>
                        );
                    })
                ) : (
                    <div className="p-6 bg-gray-50 rounded-xl text-center text-gray-500 italic border border-gray-200">
                        Type d'exercice non supporté ou données incomplètes.
                    </div>
                )}
            </div>
            <div className="min-h-[4rem] flex items-center justify-between border-t border-gray-50 pt-6">
                
                <div className="flex-grow">
                    {feedback && (
                        <div className={`flex items-center gap-2 font-bold text-lg animate-fade-in ${feedback === 'correct' ? 'text-green-600' : 'text-red-600'}`}>
                            {feedback === 'correct' ? (
                                <><span>Correct!</span> 🎉</>
                            ) : (
                                <><span>Oups!</span> ❌</>
                            )}
                        </div>
                    )}
                </div>

                {(feedback || currentExercise.type !== 'QCM') && (
                    <button 
                        onClick={handleNext}
                        className="bg-red-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-200 flex items-center gap-2"
                    >
                        {currentIndex === exercises.length - 1 ? "Terminer" : "Suivant"}
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </button>
                )}
            </div>

        </div>
      </main>
      <Footer />
    </div>
  );
}