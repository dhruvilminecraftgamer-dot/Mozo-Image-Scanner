import React from 'react';
import { Page } from '../App';

interface HeaderProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
}

const NavLink: React.FC<{
  onClick: () => void;
  isActive: boolean;
  children: React.ReactNode;
}> = ({ onClick, isActive, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive
        ? 'bg-indigo-600 text-white'
        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`}
  >
    {children}
  </button>
);

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  return (
    <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              <span className="text-white text-xl font-bold">Mozo Image Scanner</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink onClick={() => onNavigate(Page.Home)} isActive={currentPage === Page.Home}>
                Home
              </NavLink>
              <NavLink onClick={() => onNavigate(Page.Scan)} isActive={currentPage === Page.Scan}>
                Scan Image
              </NavLink>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;