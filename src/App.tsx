import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { PhonemeProvider } from './context/PhonemeContext';
import LandingPage from './components/LandingPage';
import PhonemeLearnPage from './components/PhonemeLearnPage';
import Header from './components/Header';
import { Language } from './types';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [key, setKey] = useState(0);

  const handleStart = () => {
    setShowLanding(false);
  };

  const handleHome = () => {
    setShowLanding(true);
  };

  const handleLanguageChange = (language: Language) => {
    console.log('Language change requested:', language);
    // Force re-render of providers when language changes
    setKey(prevKey => {
      console.log('Updating provider key from', prevKey, 'to', prevKey + 1);
      return prevKey + 1;
    });
  };

  useEffect(() => {
    console.log('Current provider key:', key);
  }, [key]);

  return (
    <LanguageProvider key={`lang-${key}`}>
      <PhonemeProvider key={`phoneme-${key}`}>
        <div className="min-h-screen bg-gray-50">
          {showLanding ? (
            <LandingPage onStart={handleStart} />
          ) : (
            <>
              <Header onLanguageChange={handleLanguageChange} onHome={handleHome} />
              <PhonemeLearnPage />
            </>
          )}
        </div>
      </PhonemeProvider>
    </LanguageProvider>
  );
}

export default App;