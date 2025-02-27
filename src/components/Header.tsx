import React, { useState } from 'react';
import { BookOpen, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';

interface HeaderProps {
  onLanguageChange: (language: Language) => void;
  onHome: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLanguageChange, onHome }) => {
  const { language, setLanguage } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLanguageClick = (newLanguage: Language) => {
    if (newLanguage === language) {
      setIsDropdownOpen(false);
      return;
    }

    console.log('Changing language from', language, 'to', newLanguage);
    setLanguage(newLanguage);
    onLanguageChange(newLanguage);
    setIsDropdownOpen(false);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <button 
          onClick={onHome}
          className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          <BookOpen className="mr-2" size={24} />
          <span className="font-bold text-xl">
            {language === 'english' ? 'Learning to Read' : 'Apprendre à Lire'}
          </span>
        </button>
        
        <div className="flex items-center">
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center text-gray-700 hover:text-indigo-600 transition-colors p-2 rounded-md hover:bg-gray-50"
              aria-expanded={isDropdownOpen}
              aria-haspopup="true"
            >
              <Languages className="mr-1" size={20} />
              <span>{language === 'english' ? 'English' : 'Français'}</span>
            </button>
            
            {isDropdownOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-20 border border-gray-200"
                role="menu"
                aria-orientation="vertical"
              >
                <div className="py-1">
                  <button
                    onClick={() => handleLanguageClick('english')}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      language === 'english' 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    role="menuitem"
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageClick('french')}
                    className={`block px-4 py-2 text-sm w-full text-left ${
                      language === 'french' 
                        ? 'bg-indigo-50 text-indigo-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    role="menuitem"
                  >
                    Français
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;