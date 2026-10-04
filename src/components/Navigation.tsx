import React from 'react';
import { House, SearchCheck, LifeBuoy, Award, User } from 'lucide-react';
import { Language, ColorMode } from '../types';
import { sound } from '../utils/audioEffects';

interface NavigationProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  language: Language;
  colorMode?: ColorMode;
}

const ITEMS = [
  { tab: 'home', label: 'Home', labelHi: 'होम', Icon: House },
  { tab: 'verify', label: 'Verify', labelHi: 'जांचें', Icon: SearchCheck },
  { tab: 'recover', label: 'Recover', labelHi: 'रिकवर', Icon: LifeBuoy },
  { tab: 'impact', label: 'Impact', labelHi: 'प्रभाव', Icon: Award },
  { tab: 'myspace', label: 'My Space', labelHi: 'माय स्पेस', Icon: User },
];

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onSelectTab,
  language,
  colorMode = 'light',
}) => {
  const selectedTab =
    activeTab === 'rehearse' || activeTab === 'home'
      ? 'home'
      : activeTab === 'settings'
        ? 'myspace'
        : activeTab;
  const isDark = colorMode === 'dark';

  const handleTabClick = (tab: string) => {
    sound.playClick();
    onSelectTab(tab);
  };

  return (
    <nav
      aria-label="Main navigation"
      className={`fixed bottom-0 left-1/2 z-50 w-full max-w-[430px] -translate-x-1/2 border-t px-2 pb-[calc(8px+env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl ${
        isDark
          ? 'border-slate-800 bg-slate-950/95'
          : 'border-slate-200 bg-white/95 shadow-[0_-4px_20px_rgba(30,41,99,0.06)]'
      }`}
    >
      <div className="mx-auto grid h-14 w-full grid-cols-5 items-center gap-1">
        {ITEMS.map(({ tab, label, labelHi, Icon }) => {
          const isActive = selectedTab === tab;
          return (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              className={`flex min-h-12 flex-col items-center justify-center gap-1 rounded-xl px-1 transition-colors ${
                isActive
                  ? 'bg-violet-50 font-bold text-violet-700 dark:bg-violet-950/60 dark:text-violet-300'
                  : 'text-slate-400 hover:text-violet-600'
              }`}
            >
              <Icon className="h-5 w-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] leading-none tracking-tight">
                {language === 'hi' ? labelHi : label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
