// Speech synthesis and recognition utility for Rakshak
// High reliability multilingual voice engine supporting 8 Indian languages

import { Language } from '../types';
import { VOICE_TEST_PHRASES } from './multilingualAudio';

let currentUtterance: SpeechSynthesisUtterance | null = null;
let onEndCallback: (() => void) | null = null;

export const isSpeechSupported = (): boolean => {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
};

export const isRecognitionSupported = (): boolean => {
  return typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
};

export const stopSpeech = (): void => {
  if (isSpeechSupported()) {
    try {
      window.speechSynthesis.cancel();
    } catch (e) {
      // ignore
    }
  }
  if (onEndCallback) {
    onEndCallback();
    onEndCallback = null;
  }
  currentUtterance = null;
};

// Map app language code to BCP-47 language tag
export const getLanguageBcp47 = (lang: string): string => {
  switch (lang) {
    case 'en':
      return 'en-IN';
    case 'hi':
    case 'hinglish':
      return 'hi-IN';
    case 'mr':
      return 'mr-IN';
    case 'bn':
      return 'bn-IN';
    case 'gu':
      return 'gu-IN';
    case 'ta':
      return 'ta-IN';
    case 'te':
      return 'te-IN';
    default:
      return 'hi-IN';
  }
};

/**
 * Finds the most suitable voice for the requested language.
 * Checks for exact regional match, regional language prefix, Indian English/Hindi, or system default.
 */
const findBestVoice = (bcp47: string, lang: string): SpeechSynthesisVoice | null => {
  if (!isSpeechSupported()) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const prefix = bcp47.slice(0, 2).toLowerCase();

  // 1. Exact match e.g. 'ta-IN', 'te-IN', 'mr-IN', 'bn-IN', 'gu-IN'
  const exact = voices.find((v) => v.lang.toLowerCase() === bcp47.toLowerCase());
  if (exact) return exact;

  // 2. Language prefix match e.g. 'ta', 'te', 'mr', 'bn', 'gu'
  const prefixMatch = voices.find((v) => v.lang.toLowerCase().startsWith(prefix));
  if (prefixMatch) return prefixMatch;

  // 3. Name-based match for regional language
  const langNameKeywords: Record<string, string[]> = {
    ta: ['tamil', 'தமிழ்'],
    te: ['telugu', 'తెలుగు'],
    mr: ['marathi', 'मराठी'],
    bn: ['bengali', 'bangla', 'বাংলা'],
    gu: ['gujarati', 'ગુજરાતી'],
    hi: ['hindi', 'हिन्दी'],
    en: ['indian', 'india', 'en-in'],
  };

  const keywords = langNameKeywords[prefix] || [];
  for (const kw of keywords) {
    const namedVoice = voices.find((v) => v.name.toLowerCase().includes(kw));
    if (namedVoice) return namedVoice;
  }

  // 4. Fallback to Indian English or Hindi for natural South Asian accent
  const indianVoice = voices.find(
    (v) =>
      v.lang.toLowerCase().includes('en-in') ||
      v.lang.toLowerCase().includes('hi-in') ||
      v.name.toLowerCase().includes('india')
  );
  if (indianVoice) return indianVoice;

  return null;
};

/**
 * Speaks text in the specified language.
 * Strictly user-triggered. Does not auto-play.
 */
export const speakText = (
  text: string,
  lang: string = 'hi',
  onStart?: () => void,
  onEnd?: () => void,
  rate: number = 0.95,
  phoneticFallback?: string
): void => {
  if (!isSpeechSupported() || !text) {
    if (onEnd) onEnd();
    return;
  }

  stopSpeech();

  const bcp47 = getLanguageBcp47(lang);
  const targetVoice = findBestVoice(bcp47, lang);

  // If a device does NOT have a native regional voice for Tamil, Telugu, Bengali, Gujarati, Marathi,
  // we use the phonetic transliteration with an Indian voice so that the words are clearly spoken
  // instead of being garbled by an English-only voice.
  let textToSpeak = text;
  const isRegional = ['ta', 'te', 'mr', 'bn', 'gu'].includes(lang);
  const hasNativeVoice = targetVoice && targetVoice.lang.toLowerCase().startsWith(bcp47.slice(0, 2).toLowerCase());

  if (isRegional && !hasNativeVoice && phoneticFallback) {
    textToSpeak = phoneticFallback;
  }

  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  currentUtterance = utterance;
  onEndCallback = onEnd || null;

  utterance.lang = hasNativeVoice ? bcp47 : (targetVoice ? targetVoice.lang : bcp47);
  utterance.rate = rate;
  utterance.pitch = 1.0;

  if (targetVoice) {
    utterance.voice = targetVoice;
  }

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    console.warn('Speech playback issue:', e);
    currentUtterance = null;
    if (onEnd) onEnd();
  };

  try {
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('Speech synthesis call failed:', err);
    if (onEnd) onEnd();
  }
};

export const startListening = (
  lang: string,
  onResult: (transcript: string) => void,
  onError: (err: any) => void,
  onEnd: () => void
): (() => void) => {
  if (!isRecognitionSupported()) {
    onError('Speech recognition is not supported in this browser.');
    return () => {};
  }

  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = getLanguageBcp47(lang);
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event: any) => {
    const transcript = event.results[0][0].transcript;
    onResult(transcript);
  };

  recognition.onerror = (event: any) => {
    onError(event.error);
  };

  recognition.onend = () => {
    onEnd();
  };

  recognition.start();

  return () => {
    try {
      recognition.stop();
    } catch (e) {
      // ignore
    }
  };
};
