import React from 'react';
import { Bell, ShieldCheck, Volume2, VolumeX } from 'lucide-react';
import { Language, ColorMode } from '../types';
import { sound } from '../utils/audioEffects';

interface HeaderProps {
  language: Language;
  isVoiceMuted: boolean;
  onToggleVoice: () => void;
  isSpeaking: boolean;
  colorMode: ColorMode;
  onOpenSettings: () => void;
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  isVoiceMuted,
  onToggleVoice,
  isSpeaking,
  colorMode,
  onOpenSettings,
  onNavigateHome,
}) => {
  const isDark = colorMode === 'dark';

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b px-4 py-3 transition-colors ${
        isDark
          ? 'border-slate-800 bg-slate-950 text-white'
          : 'border-slate-100 bg-white text-slate-900'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[430px] items-center justify-between gap-3">
        <button
          onClick={() => {
            sound.playClick();
            onNavigateHome();
          }}
          className="flex min-w-0 items-center gap-2.5 text-left"
          aria-label="RAKSHAK home"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-violet-100 text-violet-700 dark:bg-violet-950 dark:text-violet-300">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-extrabold tracking-wide">RAKSHAK</span>
            <span className={`block truncate text-[10px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {language === 'hi' ? 'सतर्क रहें • सुरक्षित रहें' : 'Stay Alert • Stay Safe'}
            </span>
          </span>
        </button>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={onToggleVoice}
            aria-label={isVoiceMuted ? 'Enable voice' : 'Mute voice'}
            title={isVoiceMuted ? 'Voice is muted' : 'Voice is enabled'}
            className={`relative grid h-10 w-10 place-items-center rounded-xl border ${
              isDark
                ? 'border-slate-700 bg-slate-900 text-violet-300'
                : 'border-violet-100 bg-violet-50 text-violet-700'
            }`}
          >
            {isVoiceMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            {isSpeaking && <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-emerald-500" />}
          </button>
          <button
            onClick={() => {
              sound.playClick();
              onOpenSettings();
            }}
            aria-label="Open settings"
            title="Notifications and settings"
            className={`relative grid h-10 w-10 place-items-center rounded-xl border ${
              isDark
                ? 'border-slate-700 bg-slate-900 text-slate-300'
                : 'border-slate-200 bg-slate-50 text-slate-600'
            }`}
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-violet-600" />
          </button>
        </div>
      </div>
    </header>
  );
};
