
import React, { useState, useCallback } from 'react';
import HomePage from './pages/HomePage';
import ScanImagePage from './pages/ScanImagePage';
import Header from './components/Header';
import Footer from './components/Footer';

export enum Page {
  Home = 'home',
  Scan = 'scan',
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);

  const navigate = useCallback((page: Page) => {
    setCurrentPage(page);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case Page.Scan:
        return <ScanImagePage />;
      case Page.Home:
      default:
        return <HomePage onNavigate={() => navigate(Page.Scan)} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-gray-100 font-sans">
      <Header onNavigate={navigate} currentPage={currentPage} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;
