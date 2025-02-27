import React from 'react';
import { usePhoneme } from '../context/PhonemeContext';
import { useLanguage } from '../context/LanguageContext';

const WordList: React.FC = () => {
  const { currentPhoneme } = usePhoneme();
  const { language } = useLanguage();

  if (!currentPhoneme) {
    return (
      <div className="mt-8 p-6 bg-gray-50 rounded-lg text-center">
        <p className="text-gray-500">
          {language === 'english'
            ? 'Select a phoneme to see example words'
            : 'Sélectionnez un phonème pour voir des exemples de mots'}
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        {language === 'english'
          ? `Words with the "${currentPhoneme.symbol}" sound:`
          : `Mots avec le son "${currentPhoneme.symbol}" :`}
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {currentPhoneme.examples.map((word) => (
          <div
            key={word}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <p className="text-xl font-medium text-center">{word}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordList;