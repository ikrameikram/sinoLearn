import { Link } from "react-router-dom";
import trophyImg from "../assets/trophy.png";

export default function Hero() {
  return (
    <section className="bg-[#F0F9FF] py-20 lg:py-32 overflow-hidden">
      <div className="w-full px-8 lg:px-32">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
            <div className="inline-block bg-[#EAB308] text-black font-bold px-3 py-1 rounded-lg text-sm mb-8 shadow-sm">
              HSK 1 to 6 Certification Ready
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-8 leading-tight">
              Master Chinese.<br/>
              The smart Way.
            </h1>
            <p className="text-lg text-[#A3A3A3] mb-10 max-w-xl leading-relaxed">
              Learning Mandarin is hard for non-native speakers. We make it accessible. Our interactive platform bridges the gap between beginner basics and HSK mastery.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto mb-16">
              <Link to="/signup" className="bg-[#C4161C] text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition shadow-lg text-center shadow-red-200">
                Get Started
              </Link>
              <Link to="/courses" className="bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition text-center">
                Explore Courses
              </Link>
            </div>
            <div className="w-full border-t border-gray-200 pt-10 flex flex-row">
              <div className="pr-10 border-r border-gray-300"> 
                <p className="font-bold text-3xl text-gray-900 mb-1">10,000+</p>
                <p className="text-gray-500 text-sm font-medium">Active Learners</p>
              </div>
              <div className="px-10 border-r border-gray-300"> 
                <p className="font-bold text-3xl text-gray-900 mb-1">4.8/5</p>
                <p className="text-gray-500 text-sm font-medium">Student Rating</p>
              </div>
              <div className="pl-10"> 
                <p className="font-bold text-3xl text-gray-900 mb-1">97%</p>
                <p className="text-gray-500 text-sm font-medium">Pass Rate</p>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-5/12 relative">
            <div className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 relative z-10 transform rotate-2 hover:rotate-0 transition duration-500 mt-8 lg:mt-0">
              <div className="absolute -top-5 -right-7 z-20 transform rotate-12">
                 <div className="bg-[#EAB308] text-gray-900 font-bold rounded-xl px-8 py-1.5 text-sm flex items-center gap-3 group shadow-md cursor-default">
                   <img src={trophyImg} alt="Trophy Icon" className="h-8 w-auto transform transition-transform duration-300 origin-bottom drop-shadow-sm" />
                   <span className="text-base whitespace-nowrap">7 days streak !</span>
                 </div>
              </div>
              <div className="flex justify-end mb-8 mt-5">
                <div className="bg-[#EAB308] text-black font-bold rounded-lg px-3 py-1 text-sm shadow-sm opacity-80">HSK 3</div>
              </div>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-bold text-gray-700 mb-2"><span>Vocabulary</span><span className="text-gray-500">820/1000</span></div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5"><div className="bg-[#C4161C] h-2.5 rounded-full" style={{ width: "82%" }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold text-gray-700 mb-2"><span>Grammar</span><span className="text-gray-500">45/50</span></div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5"><div className="bg-[#EAB308] h-2.5 rounded-full" style={{ width: "90%" }}></div></div>
                </div>
                <div className="mb-4">
                  <div className="flex justify-between text-sm font-bold text-gray-700 mb-2"><span>Listening</span><span className="text-gray-500">71/80</span></div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5"><div className="bg-[#C4161C] h-2.5 rounded-full" style={{ width: "88%" }}></div></div>
                </div>
              </div>
              <div className="flex items-center gap-3 pt-6 mt-6 border-t border-gray-50">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-400"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#C4161C]"></div>
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-[#EAB308]"></div>
                </div>
                <span className="text-sm font-medium text-gray-600">Join <span className="font-bold text-gray-900">234 learners</span> online now</span>
              </div>
            </div>
            <div className="absolute top-6 -right-6 w-full h-full bg-[#C4161C] rounded-3xl opacity-5 -z-0"></div>
          </div>

        </div>
      </div>
    </section>
  );
}