import React from 'react';
import { usePhoneme } from '../context/PhonemeContext';
import { Phoneme } from '../types';
import { useLanguage } from '../context/LanguageContext';

const PhonemeGrid: React.FC = () => {
  const { availablePhonemes, currentPhoneme, setCurrentPhoneme, currentLevel, maxLevel } = usePhoneme();
  const { language } = useLanguage();

  const handlePhonemeClick = (phoneme: Phoneme) => {
    setCurrentPhoneme(currentPhoneme?.symbol === phoneme.symbol ? null : phoneme);
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-gray-700">
          {language === 'english' ? 'Level' : 'Niveau'} {currentLevel} {language === 'english' ? 'of' : 'sur'} {maxLevel}
        </h2>
        <p className="text-gray-600">
          {language === 'english' 
            ? 'Click on a phoneme to see example words' 
            : 'Cliquez sur un phonème pour voir des exemples de mots'}
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
        {availablePhonemes.map((phoneme) => (
          <button
            key={phoneme.symbol}
            onClick={() => handlePhonemeClick(phoneme)}
            className={`
              h-16 flex items-center justify-center rounded-lg font-bold text-xl
              transition-all transform hover:scale-105
              ${currentPhoneme?.symbol === phoneme.symbol
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-800 border-2 border-gray-200 hover:border-indigo-300'
              }
            `}
          >
            {phoneme.symbol}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PhonemeGrid;