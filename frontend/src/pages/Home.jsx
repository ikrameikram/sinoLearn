import Header from "../components/Header";
import Footer from "../components/Footer";
import Hero from "../components/Hero"; 
import { Link } from "react-router-dom";

import icon1 from "../assets/1.png";
import icon2 from "../assets/2.png";
import icon3 from "../assets/3.png";
import icon4 from "../assets/4.png";
import icon5 from "../assets/5.png";
import icon6 from "../assets/6.png";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header />
      <main className="flex-grow"> 
        
        <Hero />
        <section className="bg-[#F5F5F5] py-24 lg:py-32">
          <div className="w-full px-8 lg:px-32">
            
            <div className="text-center max-w-3xl mx-auto mb-24">
              <div className="inline-block bg-[#EAB308] text-black font-bold px-3 py-1 rounded-lg text-sm mb-6 shadow-sm">
                Complete Learning Platform
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Everything you need <br/> to master Chinese
              </h2>
              <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                From interactive lessons to HSK mock tests, we provide all the tools for your language learning journey.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 max-w-7xl mx-auto">
              <div className="bg-white border border-gray-200 p-8 lg:p-10 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 aspect-square flex flex-col justify-center items-start group">
                <img src={icon1} alt="Icon" loading="lazy" width="56" height="56" className="w-14 h-14 object-contain mb-8 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Interactive Lessons</h3>
                <p className="text-gray-500 leading-relaxed text-base">Multimedia lessons with text, audio, and video content.</p>
              </div>
              <div className="bg-white border border-gray-200 p-8 lg:p-10 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 aspect-square flex flex-col justify-center items-start group">
                <img src={icon2} alt="Icon" loading="lazy" width="56" height="56" className="w-14 h-14 object-contain mb-8 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4">HSK Preparation</h3>
                <p className="text-gray-500 leading-relaxed text-base">Mock tests for all HSK levels with instant feedback.</p>
              </div>
              <div className="bg-white border border-gray-200 p-8 lg:p-10 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 aspect-square flex flex-col justify-center items-start group">
                <img src={icon3} alt="Icon" loading="lazy" width="56" height="56" className="w-14 h-14 object-contain mb-8 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Community Forum</h3>
                <p className="text-gray-500 leading-relaxed text-base">Connect with fellow learners and native speakers.</p>
              </div>
              <div className="bg-white border border-gray-200 p-8 lg:p-10 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 aspect-square flex flex-col justify-center items-start group">
                <img src={icon4} alt="Icon" loading="lazy" width="56" height="56" className="w-14 h-14 object-contain mb-8 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Live Chat Support</h3>
                <p className="text-gray-500 leading-relaxed text-base">Real-time messaging with teachers and tutors.</p>
              </div>
              <div className="bg-white border border-gray-200 p-8 lg:p-10 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 aspect-square flex flex-col justify-center items-start group">
                <img src={icon5} alt="Icon" loading="lazy" width="56" height="56" className="w-14 h-14 object-contain mb-8 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Progress Tracking</h3>
                <p className="text-gray-500 leading-relaxed text-base">Visual dashboards showing your progress and badges.</p>
              </div>
              <div className="bg-white border border-gray-200 p-8 lg:p-10 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300 aspect-square flex flex-col justify-center items-start group">
                <img src={icon6} alt="Icon" loading="lazy" width="56" height="56" className="w-14 h-14 object-contain mb-8 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-2xl font-extrabold text-gray-900 mb-4">Adaptive Learning</h3>
                <p className="text-gray-500 leading-relaxed text-base">AI-powered system that adapts to your learning style.</p>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white py-24 lg:py-32">
          <div className="w-full px-8 lg:px-32">
            <div className="bg-[#DC2626] rounded-[2.5rem] p-12 lg:p-24 text-center shadow-2xl shadow-red-900/10 max-w-6xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-10 leading-tight">
                <span className="text-[#EAB308]">Start</span> your Chinese learning <br /> journey today
              </h2>
              <p className="text-white text-lg md:text-xl mb-14 max-w-3xl mx-auto opacity-90 leading-relaxed font-medium">
                Join thousands of learners worldwide. Get access to interactive courses, <br className="hidden md:inline"/> HSK prep materials, and community features.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-8 lg:gap-12">
                <Link to="/signup" className="w-64 bg-white text-[#DC2626] py-5 rounded-2xl font-bold text-lg hover:bg-gray-50 transition transform hover:-translate-y-1 shadow-lg flex justify-center">Start Learning now</Link>
                <Link to="/about" className="w-64 bg-[#DC2626] text-white border-2 border-white py-5 rounded-2xl font-bold text-lg hover:bg-white/10 transition transform hover:-translate-y-1 flex justify-center">Learn more</Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}