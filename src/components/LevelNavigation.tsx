import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePhoneme } from '../context/PhonemeContext';
import { useLanguage } from '../context/LanguageContext';

const LevelNavigation: React.FC = () => {
  const { currentLevel, setCurrentLevel, maxLevel, setCurrentPhoneme } = usePhoneme();
  const { language } = useLanguage();

  const handlePreviousLevel = () => {
    if (currentLevel > 1) {
      setCurrentLevel(currentLevel - 1);
      setCurrentPhoneme(null);
    }
  };

  const handleNextLevel = () => {
    if (currentLevel < maxLevel) {
      setCurrentLevel(currentLevel + 1);
      setCurrentPhoneme(null);
    }
  };

  return (
    <div className="flex justify-between items-center mt-8">
      <button
        onClick={handlePreviousLevel}
        disabled={currentLevel === 1}
        className={`
          flex items-center px-4 py-2 rounded-lg
          ${currentLevel === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
          }
        `}
      >
        <ChevronLeft size={20} className="mr-1" />
        {language === 'english' ? 'Previous' : 'Précédent'}
      </button>
      
      <div className="text-gray-700 font-medium">
        {language === 'english' ? 'Level' : 'Niveau'} {currentLevel} {language === 'english' ? 'of' : 'sur'} {maxLevel}
      </div>
      
      <button
        onClick={handleNextLevel}
        disabled={currentLevel === maxLevel}
        className={`
          flex items-center px-4 py-2 rounded-lg
          ${currentLevel === maxLevel
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
          }
        `}
      >
        {language === 'english' ? 'Next' : 'Suivant'}
        <ChevronRight size={20} className="ml-1" />
      </button>
    </div>
  );
};

export default LevelNavigation;