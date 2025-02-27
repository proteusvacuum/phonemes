import React from 'react';
import PhonemeGrid from './PhonemeGrid';
import PhonemeView from './PhonemeView';
import LevelNavigation from './LevelNavigation';
import { useLanguage } from '../context/LanguageContext';

const PhonemeLearnPage: React.FC = () => {
  const { language } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {language === 'english' ? 'Phoneme Learning' : 'Apprentissage des Phonèmes'}
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column: Phoneme grid and navigation */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <PhonemeGrid />
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <LevelNavigation />
          </div>
        </div>

        {/* Right column: Phoneme view */}
        <div className="bg-white rounded-xl shadow-md">
          <PhonemeView />
        </div>
      </div>
    </div>
  );
};

export default PhonemeLearnPage;