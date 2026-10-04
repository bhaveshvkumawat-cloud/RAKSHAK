import React, { useState } from 'react';
import { Check, Copy, LogOut, Settings, ShieldCheck } from 'lucide-react';
import { UserProfile, ColorMode } from '../types';
import { sound } from '../utils/audioEffects';

interface MySpaceProps {
  user: UserProfile;
  onLogout: () => void;
  colorMode: ColorMode;
  onOpenSettings: () => void;
}

export const MySpace: React.FC<MySpaceProps> = ({
  user,
  onLogout,
  colorMode,
  onOpenSettings,
}) => {
  const [copiedCert, setCopiedCert] = useState(false);
  const isDark = colorMode === 'dark';
  const score = Math.min(100, Math.max(0, user.scamImmunityScore));
  const cardClass = isDark
    ? 'border-slate-800 bg-slate-900 text-slate-100'
    : 'border-slate-200 bg-white text-slate-900 shadow-sm';

  const handleShareCertificate = async () => {
    sound.playClick();
    const certificate = `RAKSHAK CERTIFIED INVESTOR\nInvestor: ${user.name}\nScam Immunity Score: ${score}%\nStatus: Verified Scam-Resistant Retail Investor`;
    if (!navigator.clipboard) {
      console.error('Clipboard access is unavailable in this browser.');
      return;
    }
    try {
      await navigator.clipboard.writeText(certificate);
      setCopiedCert(true);
      window.setTimeout(() => setCopiedCert(false), 2000);
    } catch (error) {
      console.error('Unable to copy the Rakshak certificate:', error);
    }
  };

  const stats = [
    {
      value: user.simulationsCompleted,
      label: user.language === 'hi' ? 'अभ्यास पूरे' : 'Practice completed',
    },
    {
      value: user.verificationsDone || user.scansPerformed || 0,
      label: user.language === 'hi' ? 'खतरे जांचे' : 'Threats verified',
    },
    {
      value: user.quizzesPassed,
      label: user.language === 'hi' ? 'पाठ पूरे' : 'Lessons completed',
    },
  ];

  return (
    <div className="mx-auto w-full space-y-5 pb-2 pt-1">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-xl font-extrabold tracking-tight">
          {user.language === 'hi' ? 'माय स्पेस' : 'My Space'}
        </h1>
        <button
          onClick={() => {
            sound.playClick();
            onOpenSettings();
          }}
          aria-label="Open settings"
          title="Settings"
          className={`grid h-10 w-10 place-items-center rounded-xl border ${
            isDark
              ? 'border-slate-700 bg-slate-900 text-slate-300'
              : 'border-slate-200 bg-white text-slate-600'
          }`}
        >
          <Settings className="h-4 w-4" />
        </button>
      </div>

      <section className={`rounded-2xl border p-5 ${cardClass}`}>
        <div className="flex items-center gap-3">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-violet-100 text-lg font-extrabold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
            {user.avatarSeed}
          </div>
          <div className="min-w-0">
            <h2 className="truncate text-lg font-bold">{user.name.split(' ')[0]}</h2>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              Stay safe, stay smart!
            </p>
          </div>
          <span className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
            <ShieldCheck className="h-3 w-3" />
            Safe
          </span>
        </div>
      </section>

      <section className={`rounded-2xl border p-5 ${cardClass}`}>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {user.language === 'hi' ? 'सुरक्षा स्कोर' : 'Safety Score'}
            </p>
            <p className="mt-1 text-3xl font-extrabold">
              {score} <span className="text-base font-semibold text-slate-400">— Excellent</span>
            </p>
          </div>
          <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
            {score}%
          </span>
        </div>
        <div className={`mt-4 h-2.5 overflow-hidden rounded-full ${isDark ? 'bg-slate-800' : 'bg-violet-100'}`}>
          <div className="h-full rounded-full bg-violet-600 transition-all" style={{ width: `${score}%` }} />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-base font-bold">
          {user.language === 'hi' ? 'आपकी प्रगति' : 'Your Progress'}
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {stats.map(({ value, label }) => (
            <div key={label} className={`min-w-0 rounded-2xl border p-3 ${cardClass}`}>
              <p className="text-xl font-extrabold text-violet-700 dark:text-violet-300">{value}</p>
              <p className={`mt-1 text-[11px] leading-snug ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={handleShareCertificate}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-violet-200 bg-violet-50 px-3 text-xs font-bold text-violet-700 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-300"
        >
          {copiedCert ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          {copiedCert ? 'Copied' : 'Share certificate'}
        </button>
        <button
          onClick={onLogout}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 text-xs font-bold text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300"
        >
          <LogOut className="h-4 w-4" />
          {user.language === 'hi' ? 'लॉगआउट' : 'Log out'}
        </button>
      </div>
    </div>
  );
};
