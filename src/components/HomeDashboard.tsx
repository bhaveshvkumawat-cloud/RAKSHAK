import React from 'react';
import {
  ArrowRight,
  Award,
  LifeBuoy,
  PlayCircle,
  SearchCheck,
  ShieldCheck,
  ShieldPlus,
} from 'lucide-react';
import { Language, UserProfile, ColorMode } from '../types';

interface HomeDashboardProps {
  user: UserProfile;
  language: Language;
  colorMode: ColorMode;
  onNavigate: (tab: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  user,
  language,
  colorMode,
  onNavigate,
}) => {
  const isDark = colorMode === 'dark';
  const score = Math.min(100, Math.max(0, user.scamImmunityScore));
  const cardClass = isDark
    ? 'border-slate-800 bg-slate-900 text-slate-100'
    : 'border-slate-200 bg-white text-slate-900 shadow-sm';

  const actions = [
    {
      title: language === 'hi' ? 'रिहर्सल' : 'Rehearse',
      subtitle: language === 'hi' ? 'घोटालों का अभ्यास करें' : 'Practice scams',
      tab: 'rehearse',
      Icon: PlayCircle,
      style: 'bg-violet-50 text-violet-700 border-violet-100',
      darkStyle: 'bg-violet-950/40 text-violet-300 border-violet-900',
    },
    {
      title: language === 'hi' ? 'जांचें' : 'Verify',
      subtitle: language === 'hi' ? 'संदेश जांचें' : 'Check messages',
      tab: 'verify',
      Icon: SearchCheck,
      style: 'bg-blue-50 text-blue-700 border-blue-100',
      darkStyle: 'bg-blue-950/40 text-blue-300 border-blue-900',
    },
    {
      title: language === 'hi' ? 'रिकवर' : 'Recover',
      subtitle: language === 'hi' ? 'मदद पाएं' : 'Get help',
      tab: 'recover',
      Icon: LifeBuoy,
      style: 'bg-rose-50 text-rose-700 border-rose-100',
      darkStyle: 'bg-rose-950/40 text-rose-300 border-rose-900',
    },
    {
      title: language === 'hi' ? 'प्रभाव' : 'Impact',
      subtitle: language === 'hi' ? 'क्विज़ लें' : 'Take a quiz',
      tab: 'impact',
      Icon: Award,
      style: 'bg-amber-50 text-amber-700 border-amber-100',
      darkStyle: 'bg-amber-950/40 text-amber-300 border-amber-900',
    },
  ];

  return (
    <div className="space-y-6 pb-2">
      <section className="pt-1">
        <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
          {language === 'hi' ? 'नमस्ते,' : 'Good morning,'}
        </p>
        <h1 className="mt-0.5 text-2xl font-extrabold tracking-tight">
          {user.name.split(' ')[0]} 👋
        </h1>
      </section>

      <section
        className={`relative overflow-hidden rounded-2xl border p-5 ${cardClass}`}
      >
        <div className="absolute -right-8 -top-10 h-36 w-36 rounded-full bg-violet-500/10 blur-2xl" />
        <div className="relative flex items-center justify-between gap-4">
          <div>
            <p className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              {language === 'hi' ? 'आपका सुरक्षा स्कोर' : 'Your Safety Score'}
            </p>
            <p className="mt-2 text-4xl font-extrabold tracking-tight">{score}%</p>
            <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300">
              <ShieldCheck className="h-3.5 w-3.5" />
              {language === 'hi' ? 'सुरक्षित' : 'Protected'}
            </span>
          </div>
          <div
            className="grid h-24 w-24 shrink-0 place-items-center rounded-full"
            style={{
              background: `conic-gradient(#6750d8 ${score}%, ${isDark ? '#334155' : '#e9e7f2'} ${score}% 100%)`,
            }}
            aria-label={`${score}% protected`}
          >
            <div className={`grid h-[76px] w-[76px] place-items-center rounded-full ${isDark ? 'bg-slate-900' : 'bg-white'}`}>
              <ShieldPlus className="h-8 w-8 text-violet-600" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold">
            {language === 'hi' ? 'त्वरित कार्य' : 'Quick Actions'}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {actions.map(({ title, subtitle, tab, Icon, style, darkStyle }) => (
            <button
              key={tab}
              onClick={() => onNavigate(tab)}
              className={`min-h-[112px] rounded-2xl border p-3.5 text-left transition-transform active:scale-[0.98] ${
                isDark ? darkStyle : style
              }`}
            >
              <Icon className="mb-3 h-5 w-5" />
              <span className="block text-sm font-bold">{title}</span>
              <span className="mt-0.5 block text-xs opacity-75">{subtitle}</span>
            </button>
          ))}
        </div>
      </section>

      <section className={`rounded-2xl border p-4 ${cardClass}`}>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className={`text-xs font-semibold uppercase tracking-wide text-violet-600`}>
              {language === 'hi' ? 'पहले सुरक्षित अभ्यास करें' : 'Practice safely first'}
            </p>
            <h2 className="mt-1 text-lg font-bold">
              {language === 'hi' ? 'व्हाट्सएप स्टॉक टिप स्कैम' : 'WhatsApp Stock Tip Scam'}
            </h2>
            <p className={`mt-1 text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {language === 'hi'
                ? 'कोई निवेश समूह निश्चित मुनाफे का वादा करता है।'
                : 'Someone promises guaranteed returns through an investment group.'}
            </p>
          </div>
          <span className="text-2xl" aria-hidden="true">📞 🥷</span>
        </div>
        <button
          onClick={() => onNavigate('rehearse')}
          className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 text-sm font-bold text-white transition-colors hover:bg-violet-700"
        >
          {language === 'hi' ? 'अभ्यास शुरू करें' : 'Start Practice'}
          <ArrowRight className="h-4 w-4" />
        </button>
        <div className="mt-5">
          <h3 className="mb-2 text-sm font-bold">
            {language === 'hi' ? 'अन्य परिदृश्य' : 'More Scenarios'}
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {['UPI Scam', 'Job Scam'].map((scenario) => (
              <div
                key={scenario}
                className={`rounded-xl border px-3 py-2.5 text-left text-xs font-semibold transition-colors ${
                  isDark
                    ? 'border-slate-700 bg-slate-950'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                {scenario}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
