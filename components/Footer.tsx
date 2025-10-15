import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800">
      <div className="container mx-auto py-4 px-4 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Mozo Image Scanner. Built with AI.</p>
      </div>
    </footer>
  );
};

export default Footer;