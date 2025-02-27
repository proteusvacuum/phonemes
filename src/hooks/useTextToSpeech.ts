import { useCallback } from 'react';
import { useLanguage } from '../context/LanguageContext';

export const useTextToSpeech = () => {
  const { language } = useLanguage();

  const speak = useCallback((text: string) => {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set the language based on the current app language
    utterance.lang = language === 'french' ? 'fr-FR' : 'en-US';
    
    // Adjust the speech parameters for better clarity
    utterance.rate = 0.9; // Slightly slower than default
    utterance.pitch = 1;
    
    // Get available voices
    const voices = window.speechSynthesis.getVoices();
    
    // Try to find a voice for the current language
    const preferredVoice = voices.find(
      voice => voice.lang.startsWith(language === 'french' ? 'fr' : 'en') && !voice.name.includes('Google')
    ) || voices.find(
      voice => voice.lang.startsWith(language === 'french' ? 'fr' : 'en')
    );

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    // Speak the text
    window.speechSynthesis.speak(utterance);
  }, [language]);

  return { speak };
}; 