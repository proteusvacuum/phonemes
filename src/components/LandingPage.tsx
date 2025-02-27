import React from 'react';
import { BookOpen, Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language } from '../types';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const { setLanguage } = useLanguage();

  const handleLanguageSelect = (language: Language) => {
    setLanguage(language);
    onStart();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <BookOpen size={64} className="text-indigo-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Learning to Read</h1>
          <p className="text-center text-gray-600 mb-8">A phonics-based approach to reading</p>
          
          <div className="space-y-4">
            <button
              onClick={() => handleLanguageSelect('english')}
              className="w-full flex items-center justify-between bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              <span className="flex items-center">
                <Languages className="mr-2" size={20} />
                English
              </span>
              <span>→</span>
            </button>
            
            <button
              onClick={() => handleLanguageSelect('french')}
              className="w-full flex items-center justify-between bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              <span className="flex items-center">
                <Languages className="mr-2" size={20} />
                Français
              </span>
              <span>→</span>
            </button>
          </div>
        </div>
        
        <div className="bg-gray-50 px-8 py-4">
          <p className="text-sm text-gray-500 text-center">
            Learn to read through phonemes, words, and sentences
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;