export type Language = 'hi' | 'en' | 'hinglish' | 'mr' | 'bn' | 'ta' | 'te' | 'gu';
export type ColorMode = 'dark' | 'light';

export interface UserProfile {
  isLoggedIn: boolean;
  name: string;
  phone: string;
  email?: string;
  city: string;
  investorType: 'beginner' | 'retail_trader' | 'senior_citizen' | 'student';
  language: Language;
  colorMode?: ColorMode;
  avatarSeed: string;
  scamImmunityScore: number; // 0 - 100
  simulationsCompleted: number;
  quizzesPassed: number;
  scansPerformed?: number; // legacy alias
  verificationsDone: number;
  biometricEnabled: boolean;
  hapticEnabled: boolean;
  voiceSpeed: number; // 0.8, 1.0, 1.2
  autoVoiceEnabled: boolean; // default false
  trustedContact?: {
    name: string;
    phone: string;
    relation: string;
  };
}

export interface VerifyReport {
  riskLevel: 'HIGH_SCAM_RISK' | 'SUSPICIOUS' | 'POTENTIALLY_SAFE' | 'UNKNOWN';
  primaryScamPattern: string;
  voiceSummary: string;
  verified: string[];
  warningSigns: string[];
  unknown: string[];
  userChecklist: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'analyst' | 'member1' | 'member2' | 'member3' | 'user' | 'system';
  senderName: string;
  senderRole?: string;
  text: string;
  textHi: string;
  time: string;
  image?: string;
  isVerified?: boolean;
  isVoiceNote?: boolean;
  voiceNoteDuration?: string;
  reaction?: string;
  audioScript?: string;
  audioScriptHi?: string;
}

export interface SimulatorChoice {
  id: string;
  textEn: string;
  textHi: string;
  narratorEn: string;
  narratorHi: string;
  nextStepId: string;
  isSafeChoice: boolean;
  trapExposed?: string;
}

export interface SimulatorStep {
  id: string;
  titleEn: string;
  titleHi: string;
  messages: ChatMessage[];
  narratorEn: string;
  narratorHi: string;
  choices?: SimulatorChoice[];
  isEnd?: boolean;
  debriefKey?: string;
}

export interface DebriefPoint {
  id: string;
  titleEn: string;
  titleHi: string;
  tagEn: string;
  tagHi: string;
  explanationEn: string;
  explanationHi: string;
  realityEn: string;
  realityHi: string;
}

export interface QuizQuestion {
  id: string;
  questionEn: string;
  questionHi: string;
  optionsEn: string[];
  optionsHi: string[];
  correctIndex: number;
  explanationEn: string;
  explanationHi: string;
}

export interface IncidentDetails {
  incidentDate: string;
  incidentTime: string;
  amountLost: string;
  paymentMode: string;
  transactionId: string;
  suspectPhone: string;
  suspectUpi: string;
  suspectPlatform: string;
  briefDescription: string;
  hasScreenshots: boolean;
  hasBankStatement: boolean;
  hasChatExport: boolean;
}
