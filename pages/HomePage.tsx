import React from 'react';

interface HomePageProps {
  onNavigate: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="relative text-center py-20 md:py-32 rounded-lg overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center filter blur-sm" 
        style={{backgroundImage: "url('https://picsum.photos/1600/900?grayscale&blur=2')"}}
      ></div>
      <div className="absolute inset-0 bg-gray-900 bg-opacity-70"></div>
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
          Unlock Insights from Your Images
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Leverage the power of Mozo Image Scanner to understand, analyze, and get detailed descriptions for any image. Simple, fast, and insightful.
        </p>
        <button
          onClick={onNavigate}
          className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition-transform transform hover:scale-105 duration-300 ease-in-out shadow-lg"
        >
          Scan Your First Image
        </button>
      </div>
    </div>
  );
};

export default HomePage;