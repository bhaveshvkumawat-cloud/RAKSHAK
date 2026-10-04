import React, { useState } from 'react';
import {
  ShieldCheck,
  Smartphone,
  ArrowRight,
  Lock,
  UserCheck,
  CheckCircle2,
  Sparkles,
  Zap,
} from 'lucide-react';
import { UserProfile, Language } from '../types';
import { sound } from '../utils/audioEffects';

interface OnboardingLoginProps {
  onLoginSuccess: (profile: UserProfile) => void;
  language: Language;
}

export const OnboardingLogin: React.FC<OnboardingLoginProps> = ({
  onLoginSuccess,
  language,
}) => {
  const [phone, setPhone] = useState<string>('98201 44892');
  const [name, setName] = useState<string>('Vedansh Yadav');
  const [city, setCity] = useState<string>('Jaipur / Mumbai');
  const [investorType, setInvestorType] = useState<UserProfile['investorType']>('retail_trader');
  const [step, setStep] = useState<'details' | 'otp_verify'>('details');
  const [otpCode, setOtpCode] = useState<string>('');
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const handleSendOtp = () => {
    if (!name.trim()) return;
    sound.playClick();
    setStep('otp_verify');
    // Pre-fill simulated OTP for zero-friction fast login
    setTimeout(() => {
      setOtpCode('7428');
    }, 400);
  };

  const handleVerifyOtp = () => {
    setIsVerifying(true);
    sound.playSuccess();
    setTimeout(() => {
      completeLogin();
    }, 600);
  };

  const completeLogin = () => {
    const newProfile: UserProfile = {
      isLoggedIn: true,
      name: name || 'Investor',
      phone: phone || '98765 43210',
      city: city || 'India',
      investorType,
      language,
      avatarSeed: (name.trim().slice(0, 2) || 'VY').toUpperCase(),
      scamImmunityScore: 88,
      simulationsCompleted: 1,
      quizzesPassed: 2,
      verificationsDone: 2,
      biometricEnabled: false,
      hapticEnabled: true,
      voiceSpeed: 1.0,
      autoVoiceEnabled: false, // Strictly user-click driven audio
      trustedContact: {
        name: 'Family Safety (Emergency)',
        phone: '+91 99887 76655',
        relation: 'Primary Safety Node',
      },
    };
    onLoginSuccess(newProfile);
  };

  const handleQuickDemoLogin = () => {
    sound.playSuccess();
    setName('Vedansh Yadav');
    setPhone('+91 98201 44892');
    setCity('Jaipur / NCR');
    setInvestorType('retail_trader');
    completeLogin();
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background cyber glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Mobile Card */}
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative z-10">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-3 shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center justify-center gap-1.5">
            रक्षक <span className="text-emerald-400">RAKSHAK</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {language === 'hi'
              ? 'सुरक्षित भारतीय निवेशक पहचान व सुरक्षा स्पेस'
              : 'Verified Investor Safe Space & Cyber Defense'}
          </p>
        </div>

        {/* Step 1: Investor Details */}
        {step === 'details' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                {language === 'hi' ? 'आपका शुभ नाम' : 'Full Name'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Vedansh Yadav"
                className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                {language === 'hi' ? 'मोबाइल नंबर (सुरक्षा सूचना के लिए)' : 'Mobile Number'}
              </label>
              <div className="flex gap-2">
                <span className="px-3.5 py-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-400 text-sm font-mono flex items-center shrink-0">
                  +91
                </span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98201 44892"
                  className="flex-1 px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  {language === 'hi' ? 'शहर / राज्य' : 'City / State'}
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Jaipur / Mumbai"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  {language === 'hi' ? 'निवेशक श्रेणी' : 'Investor Type'}
                </label>
                <select
                  value={investorType}
                  onChange={(e) => setInvestorType(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="retail_trader">Retail Trader (खुदरा व्यापारी)</option>
                  <option value="beginner">Beginner (नया निवेशक)</option>
                  <option value="senior_citizen">Senior Citizen (वरिष्ठ नागरिक)</option>
                  <option value="student">Student / Young Earner</option>
                </select>
              </div>
            </div>

            {/* Direct Login Button */}
            <button
              onClick={handleSendOtp}
              disabled={!name.trim()}
              className="w-full mt-2 py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 group active:scale-98 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>{language === 'hi' ? 'सुरक्षित आगे बढ़ें' : 'Continue Securely'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Instant 1-Tap Quick Demo */}
            <button
              onClick={handleQuickDemoLogin}
              type="button"
              className="w-full py-2.5 px-4 bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-xl text-xs font-semibold text-slate-200 transition-all flex items-center justify-center gap-1.5 active:scale-98"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'hi' ? '1-क्लिक तुरंत डेमो प्रवेश' : '1-Tap Instant Access (Demo Profile)'}</span>
            </button>
          </div>
        )}

        {/* Step 2: Instant OTP Verification */}
        {step === 'otp_verify' && (
          <div className="space-y-4">
            <div className="text-center py-2">
              <div className="inline-flex p-3 rounded-2xl bg-sky-500/10 border border-sky-500/30 text-sky-400 mb-2">
                <Smartphone className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">
                {language === 'hi' ? 'OTP सत्यापन' : 'Verify Mobile OTP'}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {language === 'hi'
                  ? `+91 ${phone} पर 4-अंकीय कोड भेजा गया`
                  : `4-digit code sent to +91 ${phone}`}
              </p>
            </div>

            <div>
              <input
                type="text"
                maxLength={4}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="7428"
                className="w-full text-center tracking-[0.5em] font-mono font-bold text-2xl py-3 bg-slate-950 border border-slate-700 rounded-xl text-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <p className="text-[11px] text-center text-emerald-400/80 mt-1.5">
                ✓ {language === 'hi' ? 'सुरक्षा कोड स्वचालित रूप से भरा गया' : 'Security OTP auto-filled for speed'}
              </p>
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={isVerifying || otpCode.length < 4}
              className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 active:scale-98 disabled:opacity-50"
            >
              {isVerifying ? (
                <span>{language === 'hi' ? 'पुष्टि हो रही है...' : 'Verifying...'}</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{language === 'hi' ? 'माय स्पेस में प्रवेश करें' : 'Enter My Space'}</span>
                </>
              )}
            </button>

            <button
              onClick={() => setStep('details')}
              className="w-full py-2 text-xs text-slate-400 hover:text-slate-300 transition-colors"
            >
              ← {language === 'hi' ? 'विवरण बदलें' : 'Change details'}
            </button>
          </div>
        )}

        {/* Footer Security Badges */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
          <div className="flex items-center gap-1 text-emerald-400">
            <Lock className="w-3.5 h-3.5" />
            <span>100% On-Device Safe</span>
          </div>
          <div className="flex items-center gap-1 text-slate-400">
            <UserCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>SEBI & Cyber Cell Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
