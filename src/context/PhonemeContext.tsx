import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Phoneme, PhonemeData, ProgressionData, Language } from '../types';
import { useLanguage } from './LanguageContext';

// Import JSON data
import englishPhonemesData from '../data/english-phonemes.json';
import frenchPhonemesData from '../data/french-phonemes.json';
import englishProgressionData from '../data/english-progression.json';
import frenchProgressionData from '../data/french-progression.json';

interface PhonemeContextType {
  phonemes: Phoneme[];
  currentLevel: number;
  currentPhoneme: Phoneme | null;
  availablePhonemes: Phoneme[];
  setCurrentLevel: (level: number) => void;
  setCurrentPhoneme: (phoneme: Phoneme | null) => void;
  getPhonemesByLevel: (level: number) => Phoneme[];
  maxLevel: number;
}

const PhonemeContext = createContext<PhonemeContextType | undefined>(undefined);

export const PhonemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const [phonemes, setPhonemes] = useState<Phoneme[]>([]);
  const [progression, setProgression] = useState<ProgressionData>({ stages: [] });
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [currentPhoneme, setCurrentPhoneme] = useState<Phoneme | null>(null);
  const [availablePhonemes, setAvailablePhonemes] = useState<Phoneme[]>([]);

  // Load phonemes and progression based on selected language
  useEffect(() => {
    try {
      console.log('Loading phonemes for language:', language);
      
      const phonemesData: PhonemeData = language === 'english' 
        ? englishPhonemesData as PhonemeData 
        : frenchPhonemesData as PhonemeData;
      
      const progressionData: ProgressionData = language === 'english'
        ? englishProgressionData as ProgressionData
        : frenchProgressionData as ProgressionData;
      
      console.log('Loaded phonemes:', phonemesData.phonemes.length);
      console.log('Loaded progression:', progressionData.stages.length);
      
      setPhonemes(phonemesData.phonemes);
      setProgression(progressionData);
      setCurrentLevel(1);
      setCurrentPhoneme(null);
    } catch (error) {
      console.error('Error loading phonemes:', error);
    }
  }, [language]);

  // Update available phonemes when level changes
  useEffect(() => {
    try {
      const phonemesForCurrentLevel = getPhonemesByLevel(currentLevel);
      console.log('Available phonemes for level', currentLevel, ':', phonemesForCurrentLevel.length);
      setAvailablePhonemes(phonemesForCurrentLevel);
    } catch (error) {
      console.error('Error updating available phonemes:', error);
    }
  }, [currentLevel, phonemes, progression]);

  // Get phonemes for a specific level
  const getPhonemesByLevel = (level: number): Phoneme[] => {
    const stage = progression.stages.find(s => s.level === level);
    if (!stage) {
      console.warn('No stage found for level:', level);
      return [];
    }
    
    const filteredPhonemes = phonemes.filter(phoneme => stage.phonemes.includes(phoneme.symbol));
    console.log('Filtered phonemes for level', level, ':', filteredPhonemes.length);
    return filteredPhonemes;
  };

  const maxLevel = progression.stages.length;

  const value = {
    phonemes,
    currentLevel,
    currentPhoneme,
    availablePhonemes,
    setCurrentLevel,
    setCurrentPhoneme,
    getPhonemesByLevel,
    maxLevel
  };

  return (
    <PhonemeContext.Provider value={value}>
      {children}
    </PhonemeContext.Provider>
  );
};

function usePhoneme(): PhonemeContextType {
  const context = useContext(PhonemeContext);
  if (context === undefined) {
    throw new Error('usePhoneme must be used within a PhonemeProvider');
  }
  return context;
}

export { usePhoneme };