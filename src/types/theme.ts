export type AppTheme = 'cyber-emerald' | 'royal-gold' | 'neo-cyan' | 'crimson-stealth';
export type ColorMode = 'dark' | 'light';

export interface ThemeConfig {
  id: AppTheme;
  nameEn: string;
  nameHi: string;
  subtitleEn: string;
  subtitleHi: string;
  bgDarkGradient: string;
  bgLightGradient: string;
  accentColor: string;
  accentBorder: string;
  accentGlow: string;
  textAccent: string;
  buttonBg: string;
  buttonText: string;
  cardBgDark: string;
  cardBgLight: string;
  badgeBg: string;
}

export const THEMES: Record<AppTheme, ThemeConfig> = {
  'cyber-emerald': {
    id: 'cyber-emerald',
    nameEn: 'Electric Aurora',
    nameHi: 'साइबर एमराल्ड (Emerald)',
    subtitleEn: 'Obsidian & Neon Emerald',
    subtitleHi: 'ओब्सीडियन और नियॉन एमराल्ड',
    bgDarkGradient: 'from-[#030712] via-[#06131a] to-[#03090e]',
    bgLightGradient: 'from-[#f0fdf4] via-[#f8fafc] to-[#e2e8f0]',
    accentColor: '#10b981',
    accentBorder: 'border-emerald-500/40',
    accentGlow: 'shadow-[0_0_30px_rgba(16,185,129,0.25)]',
    textAccent: 'text-emerald-500 dark:text-emerald-400',
    buttonBg: 'bg-emerald-500 hover:bg-emerald-400',
    buttonText: 'text-slate-950 font-bold',
    cardBgDark: 'bg-slate-900/85 backdrop-blur-xl border-slate-800 text-slate-100',
    cardBgLight: 'bg-white/95 backdrop-blur-xl border-slate-200 text-slate-900 shadow-md',
    badgeBg: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 border-emerald-500/40',
  },
  'royal-gold': {
    id: 'royal-gold',
    nameEn: 'Royal Bharat Gold',
    nameHi: 'शाही स्वर्ण व नेवी (Gold)',
    subtitleEn: 'Midnight Navy & Bullion Gold',
    subtitleHi: 'मिडनाइट नेवी और खरा सोना',
    bgDarkGradient: 'from-[#020617] via-[#091124] to-[#040816]',
    bgLightGradient: 'from-[#fffbeb] via-[#fafafa] to-[#f1f5f9]',
    accentColor: '#f59e0b',
    accentBorder: 'border-amber-500/40',
    accentGlow: 'shadow-[0_0_30px_rgba(245,158,11,0.25)]',
    textAccent: 'text-amber-500 dark:text-amber-400',
    buttonBg: 'bg-amber-400 hover:bg-amber-300',
    buttonText: 'text-slate-950 font-extrabold',
    cardBgDark: 'bg-slate-900/90 backdrop-blur-xl border-amber-500/20 text-slate-100',
    cardBgLight: 'bg-white/95 backdrop-blur-xl border-amber-200 text-slate-900 shadow-md',
    badgeBg: 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/40',
  },
  'neo-cyan': {
    id: 'neo-cyan',
    nameEn: 'Neo Cyberpunk',
    nameHi: 'नियो सियान (Cyan)',
    subtitleEn: 'Carbon & Electric Cyan',
    subtitleHi: 'कार्बन ब्लैक और इलेक्ट्रिक सियान',
    bgDarkGradient: 'from-[#060814] via-[#0a1024] to-[#060a1a]',
    bgLightGradient: 'from-[#ecfeff] via-[#f8fafc] to-[#e2e8f0]',
    accentColor: '#06b6d4',
    accentBorder: 'border-cyan-500/40',
    accentGlow: 'shadow-[0_0_30px_rgba(6,182,212,0.25)]',
    textAccent: 'text-cyan-500 dark:text-cyan-400',
    buttonBg: 'bg-cyan-400 hover:bg-cyan-300',
    buttonText: 'text-slate-950 font-bold',
    cardBgDark: 'bg-[#0b1021]/85 backdrop-blur-xl border-cyan-500/20 text-slate-100',
    cardBgLight: 'bg-white/95 backdrop-blur-xl border-cyan-200 text-slate-900 shadow-md',
    badgeBg: 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-500/40',
  },
  'crimson-stealth': {
    id: 'crimson-stealth',
    nameEn: 'Stealth Aerospace',
    nameHi: 'स्टील्थ क्रिमसन (Crimson)',
    subtitleEn: 'Dark Titanium & Crimson Guard',
    subtitleHi: 'डार्क टाइटेनियम और लेज़र क्रिमसन',
    bgDarkGradient: 'from-[#0a0507] via-[#14080c] to-[#0a0406]',
    bgLightGradient: 'from-[#fff1f2] via-[#fafafa] to-[#f1f5f9]',
    accentColor: '#f43f5e',
    accentBorder: 'border-rose-500/40',
    accentGlow: 'shadow-[0_0_30px_rgba(244,63,94,0.25)]',
    textAccent: 'text-rose-500 dark:text-rose-400',
    buttonBg: 'bg-rose-500 hover:bg-rose-400',
    buttonText: 'text-white font-bold',
    cardBgDark: 'bg-[#150a0e]/85 backdrop-blur-xl border-rose-500/20 text-slate-100',
    cardBgLight: 'bg-white/95 backdrop-blur-xl border-rose-200 text-slate-900 shadow-md',
    badgeBg: 'bg-rose-500/20 text-rose-700 dark:text-rose-300 border-rose-500/40',
  },
};
