import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation } from './components/Navigation';
import { HomeDashboard } from './components/HomeDashboard';
import { RehearseSimulator } from './components/RehearseSimulator';
import { RecentCheck, VerifyAnalyzer } from './components/VerifyAnalyzer';
import { RecoverDossier } from './components/RecoverDossier';
import { ImpactQuiz } from './components/ImpactQuiz';
import { MySpace } from './components/MySpace';
import { OnboardingLogin } from './components/OnboardingLogin';
import { SettingsModal } from './components/SettingsModal';
import { UserProfile, ColorMode } from './types';
import { AppTheme, THEMES } from './types/theme';
import { Lock, PhoneCall } from 'lucide-react';

const DEFAULT_PROFILE: UserProfile = {
  isLoggedIn: true,
  name: 'Vedansh Yadav',
  phone: '98201 44892',
  email: 'vedanshyadav238@gmail.com',
  city: 'Jaipur / NCR',
  investorType: 'retail_trader',
  language: 'hi',
  avatarSeed: 'VY',
  scamImmunityScore: 92,
  simulationsCompleted: 2,
  quizzesPassed: 3,
  verificationsDone: 4,
  biometricEnabled: false,
  hapticEnabled: true,
  voiceSpeed: 1.0,
  autoVoiceEnabled: false,
  trustedContact: {
    name: 'Emergency Family SOS',
    phone: '+91 98201 44892',
    relation: 'Primary Safety Node',
  },
};

export default function App() {
  const [colorMode, setColorMode] = useState<ColorMode>(() => {
    try {
      const saved = localStorage.getItem('rakshak_color_mode') as ColorMode;
      if (saved === 'light' || saved === 'dark') return saved;
    } catch (error) {
      console.warn('Unable to read saved color mode:', error);
    }
    return 'light';
  });

  const [currentTheme, setCurrentTheme] = useState<AppTheme>(() => {
    try {
      const saved = localStorage.getItem('rakshak_theme') as AppTheme;
      if (saved && THEMES[saved]) return saved;
    } catch (error) {
      console.warn('Unable to read saved theme:', error);
    }
    return 'cyber-emerald';
  });

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('rakshak_user_profile');
      if (saved) return JSON.parse(saved) as UserProfile;
    } catch (error) {
      console.warn('Unable to read saved user profile:', error);
    }
    return DEFAULT_PROFILE;
  });
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [isSpeaking] = useState(false);
  const [recentChecks, setRecentChecks] = useState<RecentCheck[]>([]);

  const isDark = colorMode === 'dark';
  const theme = THEMES[currentTheme] || THEMES['cyber-emerald'];

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    try {
      localStorage.setItem('rakshak_color_mode', colorMode);
    } catch (error) {
      console.warn('Unable to save color mode:', error);
    }
  }, [colorMode, isDark]);

  useEffect(() => {
    try {
      localStorage.setItem('rakshak_theme', currentTheme);
    } catch (error) {
      console.warn('Unable to save theme:', error);
    }
  }, [currentTheme]);

  useEffect(() => {
    try {
      localStorage.setItem('rakshak_user_profile', JSON.stringify(user));
    } catch (error) {
      console.warn('Unable to save user profile:', error);
    }
  }, [user]);

  const handleUpdateUser = (updated: Partial<UserProfile>) => {
    setUser((previous) => ({ ...previous, ...updated }));
  };

  const handleLogout = () => {
    setUser((previous) => ({ ...previous, isLoggedIn: false }));
  };

  const handleLoginSuccess = (newProfile: UserProfile) => {
    setUser(newProfile);
    setActiveTab('home');
  };

  const handleToggleVoice = () => setIsVoiceMuted((previous) => !previous);

  if (!user.isLoggedIn) {
    return (
      <div className="rakshak-mobile">
        <div className="rakshak-screen">
          <OnboardingLogin onLoginSuccess={handleLoginSuccess} language={user.language} />
        </div>
      </div>
    );
  }

  const settingsOpen = activeTab === 'settings';

  return (
    <div className="rakshak-mobile">
      <div className={`rakshak-screen flex flex-col transition-colors ${
        isDark
          ? `bg-gradient-to-br ${theme.bgDarkGradient} text-slate-100`
          : `bg-gradient-to-br ${theme.bgLightGradient} text-slate-900`
      }`}>
        <Header
          language={user.language}
          isVoiceMuted={isVoiceMuted}
          onToggleVoice={handleToggleVoice}
          isSpeaking={isSpeaking}
          colorMode={colorMode}
          onOpenSettings={() => setActiveTab('settings')}
          onNavigateHome={() => setActiveTab('home')}
        />

        <main
          className="mx-auto w-full max-w-[430px] flex-1 px-4 pb-28 pt-4"
        >
          {activeTab === 'home' && (
            <HomeDashboard
              user={user}
              language={user.language}
              colorMode={colorMode}
              onNavigate={setActiveTab}
            />
          )}
          {activeTab === 'rehearse' && (
            <RehearseSimulator
              language={user.language}
              isVoiceMuted={isVoiceMuted}
              onNavigateToTab={setActiveTab}
              colorMode={colorMode}
            />
          )}
          {activeTab === 'verify' && (
            <VerifyAnalyzer
              language={user.language}
              isVoiceMuted={isVoiceMuted}
              onNavigateToRecover={() => setActiveTab('recover')}
              colorMode={colorMode}
              recentChecks={recentChecks}
              onRecentCheck={(check) => setRecentChecks((previous) => [check, ...previous].slice(0, 3))}
            />
          )}
          {activeTab === 'recover' && (
            <RecoverDossier language={user.language} colorMode={colorMode} user={user} />
          )}
          {activeTab === 'impact' && (
            <ImpactQuiz
              language={user.language}
              onNavigateToSimulator={() => setActiveTab('rehearse')}
              colorMode={colorMode}
            />
          )}
          {activeTab === 'myspace' && (
            <MySpace
              user={user}
              onLogout={handleLogout}
              colorMode={colorMode}
              onOpenSettings={() => setActiveTab('settings')}
            />
          )}
          {settingsOpen && (
            <SettingsModal
              isOpen
              onClose={() => setActiveTab('myspace')}
              user={user}
              onUpdateUser={handleUpdateUser}
              colorMode={colorMode}
              onChangeColorMode={setColorMode}
              currentTheme={currentTheme}
              onSelectTheme={setCurrentTheme}
            />
          )}
        </main>

        {!settingsOpen && (
          <footer className={`px-4 pb-24 pt-3 text-center text-[10px] ${
            isDark ? 'bg-slate-950/80 text-slate-400' : 'bg-white/80 text-slate-500'
          }`}>
            <div className="mx-auto flex max-w-[430px] flex-col items-center gap-2">
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
                <span className="inline-flex items-center gap-1 font-medium">
                  <Lock className="h-3.5 w-3.5 text-emerald-500" />
                  {user.language === 'hi' ? '100% ऑन-डिवाइस सुरक्षा' : '100% On-Device Safe'}
                </span>
                <span aria-hidden="true">·</span>
                <span>{user.language === 'hi' ? 'कोई डेटा स्टोर नहीं' : 'Zero Data Stored'}</span>
                <span aria-hidden="true">·</span>
                <span>{user.language === 'hi' ? 'कोई अनधिकृत टिप नहीं' : 'No Tips'}</span>
              </div>
              <a href="tel:1930" className="inline-flex items-center gap-1 font-semibold text-rose-500">
                <PhoneCall className="h-3 w-3" />
                {user.language === 'hi' ? 'साइबर हेल्पलाइन: 1930' : 'Cyber Helpline: 1930'}
              </a>
            </div>
          </footer>
        )}

        <Navigation
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          language={user.language}
          colorMode={colorMode}
        />
      </div>
    </div>
  );
}
