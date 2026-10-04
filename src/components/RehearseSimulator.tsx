import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  RotateCcw,
  Clock,
  ShieldAlert,
  ShieldCheck,
  CheckCheck,
  ArrowRight,
  ChevronRight,
  Lock,
  Play,
  Pause,
} from 'lucide-react';
import { Language, SimulatorStep, ChatMessage, ColorMode } from '../types';
import { SCENARIO_STEPS, DEBRIEF_POINTS } from '../data/simulatorScenarios';
import { getLocalizedStep } from '../data/translations';
import { speakText, stopSpeech } from '../utils/speech';
import { sound } from '../utils/audioEffects';
import { SIMULATOR_AUDIO_SCRIPTS } from '../utils/multilingualAudio';
import analystAvatar from '../assets/images/scam_analyst_avatar_1791095530297.jpg';

interface RehearseSimulatorProps {
  language: Language;
  isVoiceMuted: boolean;
  onNavigateToTab: (tab: string) => void;
  colorMode?: ColorMode;
}

export const RehearseSimulator: React.FC<RehearseSimulatorProps> = ({
  language,
  onNavigateToTab,
  colorMode = 'dark',
}) => {
  const [currentStepId, setCurrentStepId] = useState<string>('step_intro');
  const [chatHistory, setChatHistory] = useState<SimulatorStep[]>([SCENARIO_STEPS.step_intro]);
  const [isNarratorSpeaking, setIsNarratorSpeaking] = useState<boolean>(false);
  const [countdownSeconds, setCountdownSeconds] = useState<number>(294); // ~4m 54s
  const [playingVoiceNoteId, setPlayingVoiceNoteId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  const isDark = colorMode === 'dark';
  const currentStep = SCENARIO_STEPS[currentStepId] || SCENARIO_STEPS.step_intro;
  const localizedContent = getLocalizedStep(currentStepId, language);
  const isDebrief = currentStep.isEnd;

  // Countdown timer for artificial urgency
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format countdown mm:ss
  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Reset ongoing audio when step changes — NEVER auto-play
  useEffect(() => {
    stopSpeech();
    setPlayingVoiceNoteId(null);
    setIsNarratorSpeaking(false);
    return () => {
      stopSpeech();
      setIsNarratorSpeaking(false);
    };
  }, [currentStepId]);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (!isDebrief) {
      chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatHistory, currentStepId, isDebrief]);

  // User-initiated click-to-speak voice guide
  const handleManualPlayVoice = () => {
    if (isNarratorSpeaking) {
      stopSpeech();
      setIsNarratorSpeaking(false);
    } else {
      sound.playClick();
      const script = SIMULATOR_AUDIO_SCRIPTS[currentStepId]?.[language];
      const textToSpeak =
        script?.narrator ||
        localizedContent.narrator ||
        (language === 'hi' ? currentStep.narratorHi : currentStep.narratorEn);
      const phonetic = script?.phonetic;

      speakText(
        textToSpeak,
        language,
        () => setIsNarratorSpeaking(true),
        () => setIsNarratorSpeaking(false),
        1.0,
        phonetic
      );
    }
  };

  // User-initiated WhatsApp voice note player
  const handlePlayVoiceNote = (msg: ChatMessage) => {
    stopSpeech();
    setIsNarratorSpeaking(false);
    if (playingVoiceNoteId === msg.id) {
      setPlayingVoiceNoteId(null);
    } else {
      sound.playClick();
      setPlayingVoiceNoteId(msg.id);

      // Localized voice note audio for all 8 languages
      const script = SIMULATOR_AUDIO_SCRIPTS[currentStepId]?.[language];
      let audioText = language === 'hi' ? (msg.audioScriptHi || msg.textHi) : (msg.audioScript || msg.text);
      if (script?.narrator) {
        audioText = script.narrator;
      }

      speakText(
        audioText,
        language,
        () => setPlayingVoiceNoteId(msg.id),
        () => setPlayingVoiceNoteId(null),
        1.05,
        script?.phonetic
      );
    }
  };

  const handleSelectChoice = (nextStepId: string, isSafe: boolean) => {
    stopSpeech();
    setPlayingVoiceNoteId(null);
    if (isSafe) {
      sound.playSuccess();
    } else {
      sound.playWarning();
    }
    const nextStep = SCENARIO_STEPS[nextStepId];
    if (nextStep) {
      setCurrentStepId(nextStepId);
      setChatHistory((prev) => [...prev, nextStep]);
    }
  };

  const handleRestart = () => {
    sound.playClick();
    stopSpeech();
    setPlayingVoiceNoteId(null);
    setCurrentStepId('step_intro');
    setChatHistory([SCENARIO_STEPS.step_intro]);
    setCountdownSeconds(300);
  };

  return (
    <div className="w-full mx-auto space-y-3 pb-2 pt-1">
      <div className="px-1">
        <h1 className="text-xl font-extrabold leading-tight tracking-tight">
          {language === 'hi'
            ? 'असली घोटाले से पहले अभ्यास करें।'
            : 'Practice before you face a real scam.'}
        </h1>
      </div>
      {/* Top Banner: Zero-money sandbox badge & Replay */}
      <div className="flex items-center justify-between px-2 mb-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 font-semibold text-emerald-500">
            <ShieldCheck className="w-4 h-4" />
            {language === 'hi' ? 'सुरक्षित सैंडबॉक्स' : 'Safe Zero-Money Sandbox'}
          </span>
          <span aria-hidden="true" className={isDark ? 'text-slate-600' : 'text-slate-400'}>
            ·
          </span>
          <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>
            {language === 'hi' ? 'व्हाट्सएप स्कैम रिहर्सल' : 'WhatsApp Scam Rehearsal'}
          </span>
        </div>
        <button
          onClick={handleRestart}
          className={`min-h-[40px] px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
            isDark
              ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border-slate-800'
              : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-black border-slate-200 shadow-xs'
          }`}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{language === 'hi' ? 'रीसेट करें' : 'Reset'}</span>
        </button>
      </div>

      {!isDebrief ? (
        <div
          className={`rounded-3xl border overflow-hidden shadow-2xl flex flex-col transition-colors ${
            isDark
              ? 'border-slate-800 bg-slate-950 text-slate-100'
              : 'border-slate-200 bg-white text-slate-900'
          }`}
        >
          {/* WhatsApp Style Top App Bar */}
          <div
            className={`px-3.5 sm:px-4 py-2.5 flex items-center justify-between border-b ${
              isDark ? 'bg-[#1f2c34] text-white border-slate-700/60' : 'bg-[#008069] text-white border-teal-700'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-emerald-400/50 bg-slate-800 shrink-0">
                <img
                  src={analystAvatar}
                  alt="Analyst Avatar"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-semibold text-white truncate max-w-[190px] sm:max-w-md">
                    📈 VIP Institutional Wealth Club
                  </h3>
                  <span
                    className="w-3.5 h-3.5 bg-emerald-500 rounded-full flex items-center justify-center shrink-0"
                    title="Spoofed SEBI badge"
                  >
                    <CheckCheck className="w-2.5 h-2.5 text-white" />
                  </span>
                </div>
                <p className="text-[11px] text-teal-100/90 truncate">
                  Rahul Sharma (Admin), Vikram, Ananya + 142 others
                </p>
              </div>
            </div>

            {/* Artificial Urgency Countdown Pill */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-950/90 border border-rose-500/60 text-rose-300 text-xs font-mono tabular-nums shrink-0 animate-pulse">
              <Clock className="w-3.5 h-3.5 text-rose-400" />
              <span className="font-bold">{formatCountdown(countdownSeconds)}</span>
            </div>
          </div>

          {/* Voice Narrator Banner (Click-to-Speak strictly on demand) */}
          <div
            className={`border-b px-3.5 py-2.5 flex items-start gap-2.5 transition-colors ${
              isDark
                ? 'bg-emerald-950/70 border-emerald-500/30 text-emerald-100'
                : 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
            }`}
          >
            <button
              onClick={handleManualPlayVoice}
              className={`mt-0.5 min-h-[44px] min-w-[44px] p-2 rounded-xl border shrink-0 flex items-center justify-center transition-transform active:scale-95 ${
                isDark
                  ? 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/40 text-emerald-300'
                  : 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              }`}
              title={
                isNarratorSpeaking
                  ? 'Stop Voice Guide'
                  : language === 'hi'
                  ? 'आवाज सुनने के लिए टैप करें'
                  : 'Tap to Hear Voice Guide'
              }
            >
              {isNarratorSpeaking ? (
                <VolumeX className="w-4 h-4" />
              ) : (
                <Volume2 className="w-4 h-4" />
              )}
            </button>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[11px] font-bold tracking-wide uppercase text-emerald-500">
                  {language === 'hi'
                    ? '🔊 रक्षक आवाज गाइड (सुनने के लिए टैप करें)'
                    : '🔊 Voice Guide (Tap icon to listen)'}
                </span>
                {isNarratorSpeaking && (
                  <span className="flex items-center gap-0.5">
                    <span className="w-1 h-2.5 bg-emerald-500 rounded-full animate-bounce" />
                    <span className="w-1 h-3.5 bg-emerald-500 rounded-full animate-bounce delay-100" />
                    <span className="w-1 h-2 bg-emerald-500 rounded-full animate-bounce delay-200" />
                  </span>
                )}
              </div>
              <p
                className={`text-xs leading-relaxed ${
                  isDark ? 'text-emerald-100/90' : 'text-emerald-950 font-medium'
                }`}
              >
                {localizedContent.narrator ||
                  (language === 'hi' ? currentStep.narratorHi : currentStep.narratorEn)}
              </p>
            </div>
          </div>

          {/* WhatsApp Chat Messages Canvas */}
          <div
            className={`space-y-2 p-3 sm:p-4 min-h-[280px] max-h-[420px] overflow-y-auto ${
              isDark ? 'wa-chat-bg' : 'bg-[#efeae2]'
            }`}
          >
            {chatHistory.flatMap((step) => step.messages).map((msg) => {
              const isUser = msg.sender === 'user';
              const isSystem = msg.sender === 'system';
              const isAnalyst = msg.sender === 'analyst';

              if (isSystem) {
                return (
                  <div key={msg.id} className="flex justify-center my-2">
                    <div
                      className={`border rounded-lg px-3 py-1 text-center max-w-xs shadow-xs ${
                        isDark
                          ? 'bg-[#182229] border-slate-700/60 text-amber-200/90'
                          : 'bg-[#ffeecd] border-amber-300 text-amber-900'
                      }`}
                    >
                      <p className="text-[11px] leading-snug">
                        <Lock className="w-2.5 h-2.5 inline mr-1 text-amber-500" />
                        {language === 'hi' ? msg.textHi : msg.text}
                      </p>
                    </div>
                  </div>
                );
              }

              return (
                <div
                  key={msg.id}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-2xl p-3 text-xs leading-relaxed relative shadow-md ${
                      isUser
                        ? isDark
                          ? 'bg-[#005c4b] text-white rounded-tr-xs'
                          : 'bg-[#d9fdd3] text-slate-900 rounded-tr-xs border border-emerald-200'
                        : isDark
                        ? 'bg-[#202c33] text-slate-100 rounded-tl-xs border border-slate-700/40'
                        : 'bg-white text-slate-900 rounded-tl-xs border border-slate-200'
                    }`}
                  >
                    {/* Sender Name & Role */}
                    {!isUser && (
                      <div className="flex items-center gap-1.5 mb-1">
                        <span
                          className={`font-bold text-[11px] ${
                            isAnalyst ? 'text-amber-400' : 'text-sky-400'
                          }`}
                        >
                          {msg.senderName}
                        </span>
                        {msg.senderRole && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">
                            {msg.senderRole}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Screenshot image simulation */}
                    {msg.image && (
                      <div className="rounded-xl overflow-hidden mb-2 border border-slate-700/50 shadow-inner">
                        <img
                          src={msg.image}
                          alt="Scam Proof Screenshot"
                          className="w-full h-auto max-h-48 object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="p-1.5 bg-black/70 text-[10px] text-amber-300 flex items-center justify-between">
                          <span>⚠️ Fake Terminal Gain</span>
                          <span className="text-emerald-400 font-mono">+342.8%</span>
                        </div>
                      </div>
                    )}

                    {/* Voice Note Attachment */}
                    {msg.isVoiceNote ? (
                      <div
                        className={`my-2 p-2.5 rounded-xl border flex items-center gap-3 ${
                          isDark
                            ? 'bg-emerald-950/70 border-emerald-500/40'
                            : 'bg-emerald-50 border-emerald-300'
                        }`}
                      >
                        <button
                          onClick={() => handlePlayVoiceNote(msg)}
                          className="w-10 h-10 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 flex items-center justify-center shrink-0 shadow-md transition-transform active:scale-95"
                          title="Play Voice Message"
                        >
                          {playingVoiceNoteId === msg.id ? (
                            <Pause className="w-5 h-5 fill-current" />
                          ) : (
                            <Play className="w-5 h-5 fill-current ml-0.5" />
                          )}
                        </button>
                        <div className="flex-1 min-w-0">
                          {/* Animated Voice Waveform */}
                          <div className="flex items-center gap-0.5 h-6 mb-1">
                            {[4, 10, 16, 8, 18, 12, 6, 14, 20, 10, 15, 8, 16, 10, 5].map((h, i) => (
                              <span
                                key={i}
                                className={`w-1 rounded-full transition-all ${
                                  playingVoiceNoteId === msg.id
                                    ? 'bg-emerald-500 animate-pulse'
                                    : 'bg-emerald-500/40'
                                }`}
                                style={{ height: `${h}px` }}
                              />
                            ))}
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-emerald-600 dark:text-emerald-300 font-mono">
                            <span>
                              {playingVoiceNoteId === msg.id
                                ? 'Playing Voice Note...'
                                : language === 'hi'
                                ? 'व्हाट्सएप वॉइस नोट सुनें'
                                : 'Tap to hear urgent audio'}
                            </span>
                            <span>{msg.voiceNoteDuration || '0:14'}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      /* Message Text */
                      <div className="whitespace-pre-line">
                        {language === 'hi' ? msg.textHi : msg.text}
                      </div>
                    )}

                    {/* Timestamp & double ticks */}
                    <div
                      className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}
                    >
                      <span>{msg.time}</span>
                      {isUser && <CheckCheck className="w-3 h-3 text-sky-500" />}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={chatBottomRef} />
          </div>

          {/* Interactive Response / Decision Section */}
          {currentStep.choices && currentStep.choices.length > 0 && (
            <div
              className={`p-3 border-t transition-colors ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <p
                  className={`text-xs font-bold ${
                    isDark ? 'text-slate-200' : 'text-slate-700'
                  }`}
                >
                  {language === 'hi'
                    ? 'आपका अगला कदम चुनें (Choose Your Response):'
                    : 'Choose Your Response:'}
                </p>
                <span className="text-[11px] text-slate-400">
                  {currentStep.choices.length} {language === 'hi' ? 'विकल्प' : 'options'}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-2">
                {currentStep.choices.map((choice) => (
                  <button
                    key={choice.id}
                    onClick={() => handleSelectChoice(choice.nextStepId, choice.isSafeChoice)}
                    className={`min-h-[44px] w-full text-left p-3 rounded-2xl border text-xs font-medium transition-all flex items-center justify-between gap-3 group active:scale-[0.99] ${
                      choice.isSafeChoice
                        ? isDark
                          ? 'bg-slate-950/80 hover:bg-emerald-950/40 border-slate-700 hover:border-emerald-500/60 text-slate-200 hover:text-emerald-300'
                          : 'bg-white hover:bg-emerald-50 border-slate-200 hover:border-emerald-400 text-slate-800 shadow-xs'
                        : isDark
                        ? 'bg-slate-950/80 hover:bg-rose-950/40 border-slate-700 hover:border-rose-500/60 text-slate-200 hover:text-rose-300'
                        : 'bg-white hover:bg-rose-50 border-slate-200 hover:border-rose-300 text-slate-800 shadow-xs'
                    }`}
                  >
                    <span className="leading-snug">
                      {language === 'hi' ? choice.textHi : choice.textEn}
                    </span>
                    <ArrowRight className="w-4 h-4 shrink-0 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        /* FORENSIC DEBRIEF VIEW */
        <div
          className={`rounded-3xl border overflow-hidden shadow-2xl p-4 sm:p-6 space-y-6 transition-colors ${
            isDark
              ? 'border-slate-800 bg-slate-950 text-slate-100'
              : 'border-slate-200 bg-white text-slate-900'
          }`}
        >
          {/* Header Status */}
          <div
            className={`border-b pb-4 ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-500 mb-1">
              <ShieldAlert className="w-4 h-4" />
              <span>
                {language === 'hi'
                  ? 'सिमुलेशन समाप्त · फॉरेंसिक रिपोर्ट'
                  : 'Simulation Complete · Forensic Debrief'}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
              {language === 'hi'
                ? 'व्हाट्सएप स्कैम डीब्रीफ: आपके खिलाफ इस्तेमाल किए गए 5 हथियार'
                : 'Scam Debrief: The 5 Psychological Weapons Used On You'}
            </h2>
            <p
              className={`text-xs sm:text-sm mt-1 leading-relaxed ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {language === 'hi'
                ? 'आपने इस नकली घोटाले को बिना किसी आर्थिक नुकसान के सुरक्षित रूप से अनुभव किया। समझें कि असली जालसाज किस तरह इंसानी मनोविज्ञान से खेलते हैं।'
                : 'You safely experienced this scam with zero financial risk. Here is how syndicates manipulate greed, trust, and panic to rob common investors.'}
            </p>
          </div>

          {/* 5 Forensic Points Breakdown */}
          <div className="space-y-4">
            {DEBRIEF_POINTS.map((dp, idx) => (
              <div
                key={dp.id}
                className={`p-4 rounded-2xl border transition-colors ${
                  isDark
                    ? 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-amber-500 font-mono">
                    {language === 'hi' ? dp.tagHi : dp.tagEn}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">0{idx + 1}/05</span>
                </div>
                <h4 className="text-sm sm:text-base font-semibold mb-1.5">
                  {language === 'hi' ? dp.titleHi : dp.titleEn}
                </h4>
                <p
                  className={`text-xs sm:text-sm leading-relaxed mb-2.5 ${
                    isDark ? 'text-slate-300' : 'text-slate-600'
                  }`}
                >
                  {language === 'hi' ? dp.explanationHi : dp.explanationEn}
                </p>
                <div
                  className={`p-2.5 rounded-xl border text-xs flex items-start gap-2 ${
                    isDark
                      ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
                      : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">
                      {language === 'hi' ? 'सेबी व कानूनी सच: ' : 'SEBI & Legal Fact: '}
                    </span>
                    <span>{language === 'hi' ? dp.realityHi : dp.realityEn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action CTAs */}
          <div
            className={`pt-3 border-t grid grid-cols-1 sm:grid-cols-2 gap-3 ${
              isDark ? 'border-slate-800' : 'border-slate-200'
            }`}
          >
            <button
              onClick={() => onNavigateToTab('verify')}
              className="min-h-[44px] px-4 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/15 transition-all active:scale-[0.98]"
            >
              <span>
                {language === 'hi'
                  ? '2. असली संदिग्ध मैसेज जांचें (Verify)'
                  : '2. Verify a Real Message Now'}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigateToTab('impact')}
              className={`min-h-[44px] px-4 py-3 rounded-2xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-colors ${
                isDark
                  ? 'bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
              }`}
            >
              <span>
                {language === 'hi'
                  ? 'स्कैम क्विज में सीख परखें (Quiz)'
                  : 'Test Your Knowledge Quiz'}
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
