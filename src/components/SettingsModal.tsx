import React, { useState } from 'react';
import {
  X,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Palette,
  Languages,
  Check,
  User,
  Shield,
  Phone,
  MapPin,
  Sparkles,
  Zap,
  Bell,
  ChevronRight,
  CircleHelp,
  Info,
} from 'lucide-react';
import { UserProfile, Language, ColorMode } from '../types';
import { AppTheme, THEMES } from '../types/theme';
import { speakText, stopSpeech } from '../utils/speech';
import { sound } from '../utils/audioEffects';
import { VOICE_TEST_PHRASES } from '../utils/multilingualAudio';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  colorMode: ColorMode;
  onChangeColorMode: (mode: ColorMode) => void;
  currentTheme: AppTheme;
  onSelectTheme: (theme: AppTheme) => void;
}

const LANGUAGES_LIST: { id: Language; label: string; native: string; badge: string }[] = [
  { id: 'hi', label: 'हिंदी', native: 'Hindi', badge: 'National' },
  { id: 'en', label: 'English', native: 'Indian English', badge: 'Official' },
  { id: 'hinglish', label: 'Hinglish', native: 'हिंदी + English', badge: 'Popular' },
  { id: 'mr', label: 'मराठी', native: 'Marathi', badge: 'Regional' },
  { id: 'bn', label: 'বাংলা', native: 'Bengali', badge: 'Regional' },
  { id: 'gu', label: 'ગુજરાતી', native: 'Gujarati', badge: 'Regional' },
  { id: 'ta', label: 'தமிழ்', native: 'Tamil', badge: 'Regional' },
  { id: 'te', label: 'తెలుగు', native: 'Telugu', badge: 'Regional' },
];

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  user,
  onUpdateUser,
  colorMode,
  onChangeColorMode,
  currentTheme,
  onSelectTheme,
}) => {
  const [activeTab, setActiveTab] = useState<'theme' | 'voice' | 'profile'>('theme');
  const [selectedSection, setSelectedSection] = useState<'language' | 'voice' | 'theme' | 'profile'>('theme');
  const [testingVoice, setTestingVoice] = useState<boolean>(false);
  const [name, setName] = useState<string>(user.name);
  const [phone, setPhone] = useState<string>(user.phone);
  const [city, setCity] = useState<string>(user.city);
  const [investorType, setInvestorType] = useState<UserProfile['investorType']>(user.investorType);
  const [expandedInfo, setExpandedInfo] = useState<'notifications' | 'privacy' | 'about' | null>(null);

  if (!isOpen) return null;

  const isDark = colorMode === 'dark';
  const theme = THEMES[currentTheme] || THEMES['cyber-emerald'];

  const handleTestVoice = (lang: Language) => {
    sound.playClick();
    stopSpeech();
    setTestingVoice(true);
    const phrase = VOICE_TEST_PHRASES[lang] || VOICE_TEST_PHRASES.hi;
    speakText(
      phrase.native,
      lang,
      () => setTestingVoice(true),
      () => setTestingVoice(false),
      user.voiceSpeed || 1.0,
      phrase.phonetic
    );
  };

  const handleSaveProfile = () => {
    sound.playSuccess();
    onUpdateUser({
      name,
      phone,
      city,
      investorType,
      avatarSeed: (name.trim().slice(0, 2) || 'VY').toUpperCase(),
    });
    onClose();
  };

  return (
    <div className="mx-auto w-full max-w-[430px] animate-fade-in">
      <div
        className={`w-full flex flex-col rounded-2xl border shadow-sm overflow-hidden transition-colors ${
          isDark
            ? 'bg-slate-900 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        {/* Top Modal Header */}
        <div
          className={`px-5 py-4 flex items-center justify-between border-b ${
            isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-100 bg-slate-50'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: theme.accentColor }}
            >
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight">
                {user.language === 'hi' ? 'सेटिंग्स' : 'Settings'}
              </h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {user.language === 'hi'
                  ? 'भाषा, आवाज और दिखावट प्रबंधित करें'
                  : 'Manage language, voice, and appearance'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className={`p-2 rounded-xl transition-colors ${
              isDark ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-black'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 border-b p-4">
          {[
            { label: 'Language', Icon: Languages, tab: 'voice' as const, section: 'language' as const },
            { label: 'Voice Assistant', Icon: Volume2, tab: 'voice' as const, section: 'voice' as const },
            { label: 'Theme', Icon: Palette, tab: 'theme' as const, section: 'theme' as const },
            { label: 'Notifications', Icon: Bell, info: 'notifications' as const },
            { label: 'Privacy & Security', Icon: Shield, info: 'privacy' as const },
            { label: 'Help & Support', Icon: CircleHelp, href: 'tel:1930' },
            { label: 'About Rakshak', Icon: Info, info: 'about' as const },
            { label: 'Profile', Icon: User, tab: 'profile' as const, section: 'profile' as const },
          ].map(({ label, Icon, tab, section, info, href }) => {
            const active = section
              ? selectedSection === section
              : info
                ? expandedInfo === info
                : false;
            const rowClass = `flex min-h-11 w-full items-center gap-3 rounded-xl border px-3 text-left text-xs font-semibold transition-colors ${
              active
                ? 'border-violet-300 bg-violet-50 text-violet-800 dark:border-violet-800 dark:bg-violet-950/50 dark:text-violet-200'
                : isDark
                  ? 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-violet-200'
            }`;
            const contents = (
              <>
                <Icon className="h-4 w-4 shrink-0 text-violet-600 dark:text-violet-300" />
                <span className="min-w-0 flex-1">{label}</span>
                <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
              </>
            );

            if (href) {
              return <a key={label} className={rowClass} href={href}>{contents}</a>;
            }
            return (
              <button
                key={label}
                className={rowClass}
                onClick={() => {
                  if (tab) {
                    setActiveTab(tab);
                    if (section) setSelectedSection(section);
                    setExpandedInfo(null);
                  } else if (info) {
                    setExpandedInfo((current) => current === info ? null : info);
                  }
                }}
              >
                {contents}
              </button>
            );
          })}
          {expandedInfo && (
            <div className={`rounded-xl border p-3 text-xs leading-relaxed ${
              isDark ? 'border-slate-800 bg-slate-950 text-slate-300' : 'border-slate-200 bg-white text-slate-600'
            }`}>
              {expandedInfo === 'notifications' && 'Rakshak does not use push notifications. Time-sensitive help is available in Recover.'}
              {expandedInfo === 'privacy' && 'Profile, language, and appearance preferences are saved in this browser. Message analysis is sent to the analyzer endpoint when you submit a check.'}
              {expandedInfo === 'about' && 'RAKSHAK helps you rehearse, verify, and recover from common cyber-fraud scenarios.'}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* TAB 1: THEME & COLOR MODE */}
          {!expandedInfo && activeTab === 'theme' && (
            <div className="space-y-5">
              {/* Light Mode vs Dark Mode Switch */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {user.language === 'hi' ? 'डिस्प्ले मोड (लाइट / डार्क)' : 'Display Mode'}
                </label>
                <div className={`grid grid-cols-2 gap-3 p-1.5 rounded-2xl border ${isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-100 border-slate-200'}`}>
                  {/* Light Mode Button */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      onChangeColorMode('light');
                    }}
                    className={`py-3 px-4 rounded-xl flex items-center justify-center gap-2.5 text-xs font-bold transition-all ${
                      colorMode === 'light'
                        ? 'bg-white text-slate-900 shadow-md ring-2 ring-violet-500'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    <Sun className={`w-4 h-4 ${colorMode === 'light' ? 'text-amber-500' : ''}`} />
                    <span>{user.language === 'hi' ? '☀️ लाइट मोड (Light)' : '☀️ Light Mode'}</span>
                  </button>

                  {/* Dark Mode Button */}
                  <button
                    onClick={() => {
                      sound.playClick();
                      onChangeColorMode('dark');
                    }}
                    className={`py-3 px-4 rounded-xl flex items-center justify-center gap-2.5 text-xs font-bold transition-all ${
                      colorMode === 'dark'
                        ? 'bg-slate-800 text-white shadow-md ring-2 ring-violet-500'
                        : 'text-slate-400 hover:text-slate-100'
                    }`}
                  >
                    <Moon className={`w-4 h-4 ${colorMode === 'dark' ? 'text-violet-300' : ''}`} />
                    <span>{user.language === 'hi' ? '🌙 डार्क मोड (Dark)' : '🌙 Dark Mode'}</span>
                  </button>
                </div>
              </div>

              {/* Color Accent Themes */}
              <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {user.language === 'hi' ? 'रंग थीम (Color Accent)' : 'Color Accent Palette'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {Object.values(THEMES).map((t) => {
                    const isSelected = currentTheme === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          sound.playClick();
                          onSelectTheme(t.id);
                        }}
                        className={`p-3 rounded-2xl border text-left transition-all relative overflow-hidden flex items-center gap-3 ${
                          isSelected
                            ? isDark
                              ? 'bg-slate-800/90 border-violet-500 ring-2 ring-violet-500/30'
                              : 'bg-violet-50/80 border-violet-500 ring-2 ring-violet-500/30'
                            : isDark
                            ? 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        {/* Color swatch dot */}
                        <div
                          className="w-7 h-7 rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm"
                          style={{ backgroundColor: t.accentColor }}
                        >
                          {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold truncate">
                              {user.language === 'hi' ? t.nameHi : t.nameEn}
                            </span>
                          </div>
                          <p className={`text-[10px] truncate ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                            {user.language === 'hi' ? t.subtitleHi : t.subtitleEn}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Reassurance note */}
              <div
                className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
                  isDark ? 'bg-slate-950 border-slate-800 text-slate-400' : 'bg-slate-50 border-slate-200 text-slate-600'
                }`}
              >
                <Sparkles className="w-4 h-4 text-violet-500 shrink-0" />
                <span>
                  {user.language === 'hi'
                    ? 'आपकी थीम और लाइट/डार्क प्राथमिकता तुरंत सहेजी जाती है।'
                    : 'Theme and color preferences persist across all screens.'}
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: LANGUAGE & VOICE */}
          {!expandedInfo && activeTab === 'voice' && (
            <div className="space-y-5">
              {/* Language Selection Grid */}
              {selectedSection === 'language' && <div>
                <label className={`block text-xs font-bold uppercase tracking-wider mb-2 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {user.language === 'hi' ? 'एप्लिकेशन भाषा (8 भारतीय भाषाएं)' : 'Select Language (8 Indian Languages)'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {LANGUAGES_LIST.map((l) => {
                    const isSelected = user.language === l.id;
                    return (
                      <button
                        key={l.id}
                        onClick={() => {
                          sound.playClick();
                          onUpdateUser({ language: l.id });
                        }}
                        className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                          isSelected
                            ? isDark
                              ? 'bg-violet-500/20 border-violet-500 text-violet-300'
                              : 'bg-violet-50 border-violet-500 text-violet-800'
                            : isDark
                            ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-bold block">{l.label}</span>
                          <span className="text-[10px] text-slate-400">{l.native}</span>
                        </div>
                        {isSelected && <Check className="w-3.5 h-3.5 text-violet-500" />}
                      </button>
                    );
                  })}
                </div>
              </div>}

              {/* Strict Click-to-Speak Audio Policy */}
              {selectedSection === 'voice' && <>
              <div
                className={`p-3.5 rounded-2xl border ${
                  isDark ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Volume2 className="w-4 h-4 text-violet-500" />
                    <span className="text-xs font-bold">
                      {user.language === 'hi' ? 'ऑडियो कथन नियम' : 'Audio Narration Policy'}
                    </span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-500 font-mono">
                    Click-to-Speak Only
                  </span>
                </div>
                <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {user.language === 'hi'
                    ? 'आवाज कभी भी अपने आप शुरू नहीं होगी। जब आप स्पीकर बटन या वॉइस नोट पर टैप करेंगे, तभी यह बोलेगा।'
                    : 'Audio narration is strictly on-demand. Voice never auto-starts, protecting your privacy and focus.'}
                </p>
              </div>

              {/* Voice Speed Slider */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {user.language === 'hi' ? 'आवाज की गति' : 'Speech Speed'}
                  </span>
                  <span className="text-xs font-mono font-bold text-violet-600">
                    {user.voiceSpeed || 1.0}x
                  </span>
                </div>
                <div className="flex gap-2">
                  {[0.8, 1.0, 1.2].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => {
                        sound.playClick();
                        onUpdateUser({ voiceSpeed: spd });
                      }}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all ${
                        user.voiceSpeed === spd
                          ? 'bg-violet-600 text-white border-violet-600'
                          : isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-400'
                          : 'bg-slate-100 border-slate-200 text-slate-600'
                      }`}
                    >
                      {spd === 0.8 ? 'Slow (धीमी)' : spd === 1.0 ? 'Normal (सामान्य)' : 'Fast (तेज)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Test Voice in Current Language */}
              <button
                onClick={() => handleTestVoice(user.language)}
                disabled={testingVoice}
                className="w-full py-3 px-4 rounded-xl border border-violet-500/40 bg-violet-500/10 hover:bg-violet-500/20 text-violet-700 dark:text-violet-300 font-bold text-xs flex items-center justify-center gap-2 transition-all active:scale-98 disabled:opacity-50"
              >
                <Volume2 className="w-4 h-4" />
                <span>
                  {testingVoice
                    ? user.language === 'hi'
                      ? 'आवाज का परीक्षण हो रहा है...'
                      : 'Testing voice playback...'
                    : user.language === 'hi'
                    ? `इस भाषा में आवाज सुनें (${user.language.toUpperCase()})`
                    : `Listen to Voice in ${user.language.toUpperCase()}`}
                </span>
              </button>
              </>}
            </div>
          )}

          {/* TAB 3: INVESTOR PROFILE */}
          {!expandedInfo && activeTab === 'profile' && (
            <div className="space-y-4">
              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {user.language === 'hi' ? 'निवेशक का नाम' : 'Investor Name'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  {user.language === 'hi' ? 'फोन नंबर' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-mono focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                    isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {user.language === 'hi' ? 'शहर / राज्य' : 'City / State'}
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
                <div>
                  <label className={`block text-xs font-semibold mb-1 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {user.language === 'hi' ? 'निवेशक श्रेणी' : 'Investor Type'}
                  </label>
                  <select
                    value={investorType}
                    onChange={(e) => setInvestorType(e.target.value as any)}
                    className={`w-full px-3 py-2.5 rounded-xl border text-xs focus:outline-none focus:ring-2 focus:ring-violet-500 ${
                      isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="retail_trader">Retail Trader</option>
                    <option value="beginner">Beginner</option>
                    <option value="senior_citizen">Senior Citizen</option>
                    <option value="student">Student</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleSaveProfile}
                className="w-full mt-2 py-3 px-4 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl text-xs transition-all shadow-md active:scale-98"
              >
                {user.language === 'hi' ? 'विवरण सहेजें' : 'Save Details'}
              </button>
            </div>
          )}
        </div>

        {/* Modal Bottom Done Button */}
        <div
          className={`p-4 border-t flex justify-end ${
            isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-100 bg-slate-50'
          }`}
        >
          <button
            onClick={() => {
              sound.playClick();
              onClose();
            }}
            className="w-full sm:w-auto px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white font-bold text-xs rounded-xl transition-all shadow-md active:scale-98"
          >
            {user.language === 'hi' ? 'पूर्ण (Done)' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
};
