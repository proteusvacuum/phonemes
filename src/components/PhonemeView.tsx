import React, { useState } from 'react';
import { usePhoneme } from '../context/PhonemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Volume2, Star, Sparkles, Music, Image as ImageIcon } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';

// Helper function to extract nouns that might have images
const extractImageableNouns = (sentence: string): string[] => {
  const lowercased = sentence.toLowerCase();
  const words = lowercased.replace(/[.,!?]/g, '').split(' ');
  const imageableNouns = ['yak', 'zebra', 'duck', 'bird', 'mouse', 'cow', 'lamb', 'dog', 'ball', 'tree', 'flower', 'star', 'moon', 'sun', 'book', 'toy'];
  return words.filter(word => imageableNouns.includes(word));
};

const PhonemeView: React.FC = () => {
  const { currentPhoneme } = usePhoneme();
  const { language } = useLanguage();
  const { speak } = useTextToSpeech();
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [playingComboIndex, setPlayingComboIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<{[key: string]: boolean}>({});

  if (!currentPhoneme) {
    return (
      <div className="w-full p-8 text-center text-gray-500 animate-pulse">
        <Sparkles className="w-12 h-12 mx-auto mb-4 text-indigo-300" />
        {language === 'english' 
          ? 'Pick a letter to start the fun!'
          : 'Choisis une lettre pour commencer !'}
      </div>
    );
  }

  const colors = [
    'bg-pink-100 text-pink-600 hover:bg-pink-200',
    'bg-purple-100 text-purple-600 hover:bg-purple-200',
    'bg-blue-100 text-blue-600 hover:bg-blue-200',
    'bg-green-100 text-green-600 hover:bg-green-200',
    'bg-yellow-100 text-yellow-600 hover:bg-yellow-200',
    'bg-orange-100 text-orange-600 hover:bg-orange-200'
  ];

  const handleSpeak = (text: string, index: number) => {
    setPlayingIndex(index);
    speak(text);
    setTimeout(() => setPlayingIndex(null), 1000);
  };

  const handleSpeakCombo = (text: string, index: number) => {
    setPlayingComboIndex(index);
    speak(text);
    setTimeout(() => setPlayingComboIndex(null), 1000);
  };

  const handleImageLoad = (noun: string) => {
    setLoadedImages(prev => ({ ...prev, [noun]: true }));
  };

  const handleImageError = (noun: string) => {
    // If Unsplash fails, try Pexels
    const img = document.querySelector(`img[data-noun="${noun}"]`) as HTMLImageElement;
    if (img && img.src.includes('unsplash')) {
      img.src = `https://api.pexels.com/v1/search?query=${noun}&per_page=1`;
    }
  };

  const getImageUrl = (noun: string) => {
    // Use DiceBear for consistent, cute avatars
    if (['bird', 'dog', 'cat', 'mouse', 'cow', 'lamb'].includes(noun)) {
      return `https://api.dicebear.com/7.x/bottts/svg?seed=${noun}`;
    }
    // Use a public placeholder service for objects
    return `https://placehold.co/400x400/random?text=${noun}`;
  };

  return (
    <div className="w-full p-6 bg-gradient-to-br from-white to-indigo-50 rounded-lg shadow-sm">
      {/* Large phoneme display */}
      <div className="relative flex items-center justify-center mb-8">
        <div className="absolute -inset-4 bg-gradient-to-r from-pink-200 via-purple-200 to-indigo-200 rounded-full animate-spin-slow opacity-70 blur-xl" />
        <div 
          className="relative text-7xl font-bold text-indigo-600 bg-white w-36 h-36 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300 shadow-lg border-4 border-indigo-200 cursor-pointer"
          onClick={() => handleSpeak(currentPhoneme.symbol, -1)}
        >
          {currentPhoneme.symbol}
          <Star className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-bounce" />
        </div>
      </div>

      {/* Sound Combinations */}
      {currentPhoneme.combinations && (
        <div className="mb-8">
          <h3 className="text-xl font-bold text-center text-indigo-700 mb-4">
            {language === 'english' ? 'Sound Combinations' : 'Combinaisons de Sons'}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {currentPhoneme.combinations.map((combo, index) => (
              <div
                key={index}
                onClick={() => handleSpeakCombo(combo.sound, index)}
                className={`${colors[index % colors.length]} p-4 rounded-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-md text-center group`}
              >
                <div className="text-2xl font-bold mb-1 flex items-center justify-center">
                  {combo.sound}
                  <Music 
                    className={`w-4 h-4 ml-2 transition-opacity ${
                      playingComboIndex === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'
                    }`}
                  />
                </div>
                <div className="text-sm opacity-75">{combo.example}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Example words with sentences */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-center text-indigo-700 mb-6">
          {language === 'english' ? 'Fun Examples!' : 'Exemples Amusants !'}
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {currentPhoneme.examples.map((example, index) => {
            const imageableNouns = extractImageableNouns(example.sentence);
            return (
              <div
                key={index}
                className={`group ${colors[index % colors.length]} p-5 rounded-xl transform transition-all duration-300 hover:scale-102 hover:-translate-y-1 hover:shadow-lg`}
              >
                {/* Word row */}
                <div className="flex items-center justify-between mb-3">
                  <div 
                    className="text-2xl font-bold cursor-pointer hover:opacity-75"
                    onClick={() => handleSpeak(example.word, index)}
                  >
                    {example.word}
                  </div>
                  <button
                    className={`transform transition-all duration-300 hover:scale-110 active:scale-95 ${
                      playingIndex === index ? 'animate-pulse text-indigo-600' : ''
                    }`}
                    onClick={() => handleSpeak(example.sentence, index)}
                  >
                    <Volume2 className="w-6 h-6" />
                  </button>
                </div>
                
                {/* Sentence and Images */}
                <div className="space-y-3">
                  <p 
                    className="text-base opacity-90 cursor-pointer hover:opacity-75"
                    onClick={() => handleSpeak(example.sentence, index)}
                  >
                    {example.sentence}
                  </p>
                  
                  {/* Image Grid */}
                  {imageableNouns.length > 0 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                      {imageableNouns.map((noun, imgIndex) => (
                        <div key={imgIndex} className="relative aspect-square rounded-lg overflow-hidden bg-white/50 group">
                          <img
                            src={getImageUrl(noun)}
                            alt={noun}
                            data-noun={noun}
                            className={`w-full h-full object-cover transition-opacity duration-300 ${
                              loadedImages[noun] ? 'opacity-100' : 'opacity-0'
                            }`}
                            onLoad={() => handleImageLoad(noun)}
                            onError={() => handleImageError(noun)}
                          />
                          {!loadedImages[noun] && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <ImageIcon className="w-6 h-6 text-gray-400 animate-pulse" />
                            </div>
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                          <span className="absolute bottom-2 left-2 text-sm bg-black/50 text-white px-2 py-1 rounded">
                            {noun}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PhonemeView; 