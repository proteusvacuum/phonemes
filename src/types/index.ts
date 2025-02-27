export interface Phoneme {
  symbol: string;
  examples: Array<{
    word: string;
    sound: string;
    sentence: string;
  }>;
  combinations?: Array<{
    sound: string;
    example: string;
  }>;
}

export interface Stage {
  level: number;
  phonemes: string[];
}

export interface ProgressionData {
  stages: Stage[];
}

export interface PhonemeData {
  phonemes: Phoneme[];
}

export type Language = 'english' | 'french';