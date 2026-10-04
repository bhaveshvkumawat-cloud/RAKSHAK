import React, { useState } from 'react';
import { Language, VerifyReport, ColorMode } from '../types';
import { SAMPLE_SCAMS } from '../data/sampleScams';
import { speakText, stopSpeech, startListening } from '../utils/speech';
import { analyzeScamClientSide } from '../utils/scamRules';
import { sound } from '../utils/audioEffects';
import { LOCALIZED_VERDICTS } from '../utils/multilingualAudio';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Mic,
  MicOff,
  Copy,
  Check,
  Sparkles,
  Volume2,
  VolumeX,
  ShieldCheck,
  ArrowRight,
  Cpu,
} from 'lucide-react';

interface VerifyAnalyzerProps {
  language: Language;
  isVoiceMuted: boolean;
  onNavigateToRecover: () => void;
  colorMode?: ColorMode;
  recentChecks: RecentCheck[];
  onRecentCheck: (check: RecentCheck) => void;
}

export interface RecentCheck {
  text: string;
  riskLevel: VerifyReport['riskLevel'];
}

export const VerifyAnalyzer: React.FC<VerifyAnalyzerProps> = ({
  language,
  onNavigateToRecover,
  colorMode = 'dark',
  recentChecks,
  onRecentCheck,
}) => {
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [report, setReport] = useState<VerifyReport | null>(null);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [isSpeakingReport, setIsSpeakingReport] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [stopListeningFn, setStopListeningFn] = useState<(() => void) | null>(null);

  const isDark = colorMode === 'dark';

  const rememberCheck = (result: VerifyReport) => {
    onRecentCheck({
      text: inputText.trim().slice(0, 72),
      riskLevel: result.riskLevel,
    });
  };

  const handleSelectSample = (text: string) => {
    sound.playClick();
    setInputText(text);
  };

  const handleToggleVoiceInput = () => {
    sound.playClick();
    if (isListening) {
      if (stopListeningFn) stopListeningFn();
      setIsListening(false);
      setStopListeningFn(null);
    } else {
      setIsListening(true);
      const stop = startListening(
        language,
        (transcript) => {
          setInputText((prev) => (prev ? `${prev} ${transcript}` : transcript));
          setIsListening(false);
        },
        (err) => {
          console.warn('Voice recognition error:', err);
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        }
      );
      setStopListeningFn(() => stop);
    }
  };

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;

    sound.playClick();
    setIsLoading(true);
    stopSpeech();
    setIsSpeakingReport(false);
    setReport(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const response = await fetch('/api/analyze-scam', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: inputText,
          language,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      const resData = await response.json();
      if (resData.success && resData.data) {
        setReport(resData.data);
        rememberCheck(resData.data);
        sound.playSuccess();
        setIsLoading(false);
        return;
      }
    } catch (err) {
      console.warn('Backend analyzer unreachable or timed out, executing local rule engine:', err);
    }

    // High fidelity offline rule engine fallback
    try {
      const fallbackReport = analyzeScamClientSide(inputText, language);
      setReport(fallbackReport);
      rememberCheck(fallbackReport);
      sound.playSuccess();
    } catch (fallbackErr) {
      console.error('Analysis error:', fallbackErr);
    } finally {
      setIsLoading(false);
    }
  };

  // User-initiated audio summary readout in all 8 languages
  const handleToggleVoicePlayback = () => {
    if (!report) return;

    if (isSpeakingReport) {
      stopSpeech();
      setIsSpeakingReport(false);
    } else {
      sound.playClick();
      const localizedVerdict = LOCALIZED_VERDICTS[report.riskLevel]?.[language];
      const textToSpeak = localizedVerdict?.speech || report.voiceSummary;

      speakText(
        textToSpeak,
        language,
        () => setIsSpeakingReport(true),
        () => setIsSpeakingReport(false),
        1.0
      );
    }
  };

  const handleCopyReport = () => {
    if (!report) return;
    const textToCopy = `=== RAKSHAK EVIDENCE REPORT ===
Risk Verdict: ${report.riskLevel}
Scam Pattern: ${report.primaryScamPattern}

1. VERIFIED:
${report.verified.map((v) => `• ${v}`).join('\n')}

2. WARNING SIGNS (RED FLAGS):
${report.warningSigns.map((w) => `⚠️ ${w}`).join('\n')}

3. UNKNOWN / WHAT YOU MUST CHECK:
${report.unknown.map((u) => `❓ ${u}`).join('\n')}

Action Checklist:
${report.userChecklist.map((c) => `[ ] ${c}`).join('\n')}
================================`;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleChecklist = (idx: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  return (
    <div className="w-full mx-auto space-y-5 pb-2 pt-1">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-500 mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>
              {language === 'hi'
                ? 'सेबी अनुपालन व साक्ष्य विश्लेषक'
                : 'SEBI Compliance & Fraud Evidence Analyzer'}
            </span>
          </div>
          <h2
            className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {language === 'hi'
              ? 'संदिग्ध संदेश की जांच करें'
              : 'Verify a Message'}
          </h2>
          <p
            className={`text-xs sm:text-sm mt-1 leading-relaxed ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {language === 'hi'
              ? 'क्या यह संदेश सुरक्षित है?'
              : 'Is this message safe?'}
          </p>
        </div>
      </div>

      {/* Main Input Box */}
      <div
        className={`rounded-2xl border p-4 sm:p-5 shadow-xl transition-colors space-y-4 ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              language === 'hi'
                ? 'संदिग्ध संदेश यहाँ पेस्ट करें...'
                : 'Paste suspicious message here...'
            }
            className={`w-full h-36 p-3.5 rounded-2xl border text-sm leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 transition-all ${
              isDark
                ? 'bg-slate-950 border-slate-700/80 text-white placeholder-slate-500'
                : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
            }`}
          />

          {/* Voice Input Button */}
          <button
            onClick={handleToggleVoiceInput}
            className={`absolute bottom-3 right-3 p-2.5 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-all ${
              isListening
                ? 'bg-rose-500 text-white border-rose-500 animate-pulse'
                : isDark
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
                : 'bg-slate-200 text-slate-700 hover:bg-slate-300 border-slate-300'
            }`}
            title="Speak message"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-emerald-500" />}
            <span>{isListening ? (language === 'hi' ? 'सुन रहा है...' : 'Listening...') : (language === 'hi' ? 'बोलकर दर्ज करें' : 'Voice')}</span>
          </button>
        </div>

        {/* Quick Sample Chips */}
        <div>
          <span
            className={`text-xs font-bold block mb-2 ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {language === 'hi'
              ? 'परीक्षण के लिए असली फर्जी संदेश चुनें:'
              : 'Try Real-World Scam Patterns:'}
          </span>
          <div className="flex flex-wrap gap-2">
            {SAMPLE_SCAMS.slice(0, 3).map((sample) => (
              <button
                key={sample.id}
                onClick={() => handleSelectSample(sample.fullText)}
                className={`text-xs px-3 py-1.5 rounded-xl border font-medium transition-all text-left truncate max-w-[260px] ${
                  isDark
                    ? 'bg-slate-950 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                }`}
              >
                {language === 'hi' ? sample.titleHi : sample.titleEn}
              </button>
            ))}
          </div>
        </div>

        {/* Analyze Action Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t border-slate-800/60">
          <p className="text-xs text-slate-400">
            {language === 'hi'
              ? '✓ सेबी नियम जांच · शून्य डेटा स्टोर'
              : '✓ SEBI Compliance Rules · Zero Data Stored'}
          </p>

          <button
            onClick={handleAnalyze}
            disabled={isLoading || !inputText.trim()}
            className="w-full sm:w-auto min-h-[48px] px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-violet-500/15 transition-all active:scale-98 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Cpu className="w-4 h-4 animate-spin" />
                <span>{language === 'hi' ? 'विश्लेषण हो रहा है...' : 'Analyzing text...'}</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>{language === 'hi' ? 'जांचें (Analyze Evidence)' : 'Verify Evidence'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {recentChecks.length > 0 && (
        <section className={`rounded-2xl border p-4 ${
          isDark ? 'border-slate-800 bg-slate-900/90' : 'border-slate-200 bg-white'
        }`}>
          <h3 className="mb-3 text-sm font-bold">
            {language === 'hi' ? 'हाल की जांच' : 'Recent Checks'}
          </h3>
          <ul className="space-y-2">
            {recentChecks.map((check, index) => {
              const status = check.riskLevel === 'POTENTIALLY_SAFE'
                ? { label: 'Safe', style: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300' }
                : check.riskLevel === 'HIGH_SCAM_RISK'
                  ? { label: 'High Risk', style: 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300' }
                  : { label: check.riskLevel === 'UNKNOWN' ? 'Needs Review' : 'Suspicious', style: 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300' };
              return (
                <li key={`${index}-${check.text}`} className="flex min-w-0 items-center justify-between gap-3">
                  <span className={`min-w-0 truncate text-xs ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                    {check.text}
                  </span>
                  <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-bold ${status.style}`}>
                    {status.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* Loading state indicator */}
      {isLoading && (
        <div
          className={`rounded-2xl border p-4 text-center space-y-2 animate-fade-in ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
          }`}
        >
          <div className="flex items-center justify-center gap-2 text-emerald-500 font-semibold text-xs">
            <Cpu className="w-4 h-4 animate-spin" />
            <span>
              {language === 'hi'
                ? 'सेबी नियमों और संगठित धोखाधड़ी संकेतों का मिलान किया जा रहा है...'
                : 'Verifying text against SEBI guidelines and fraud signatures...'}
            </span>
          </div>
        </div>
      )}

      {/* EVIDENCE REPORT RESULTS */}
      {report && (
        <div className="space-y-4 animate-fade-in">
          {/* Spoken Verdict Banner */}
          <div
            className={`rounded-2xl border p-4 sm:p-5 flex items-start gap-3.5 shadow-lg transition-colors ${
              isDark
                ? 'bg-emerald-950/40 border-emerald-500/30 text-slate-100'
                : 'bg-emerald-50 border-emerald-300 text-slate-900'
            }`}
          >
            <button
              onClick={handleToggleVoicePlayback}
              className={`mt-0.5 min-h-[44px] min-w-[44px] p-2.5 rounded-2xl border flex items-center justify-center shrink-0 transition-transform active:scale-95 ${
                isDark
                  ? 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/40 text-emerald-300'
                  : 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
              }`}
              title="Listen to verdict audio"
            >
              {isSpeakingReport ? (
                <VolumeX className="w-5 h-5" />
              ) : (
                <Volume2 className="w-5 h-5" />
              )}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-500">
                    {language === 'hi'
                      ? '🔊 निष्कर्ष सारांश (सुनने के लिए टैप करें)'
                      : '🔊 Audio Summary (Tap icon to listen)'}
                  </span>
                  {isSpeakingReport && (
                    <span className="flex items-center gap-0.5">
                      <span className="w-1 h-3 bg-emerald-500 rounded-full animate-pulse" />
                      <span className="w-1 h-4 bg-emerald-500 rounded-full animate-pulse delay-75" />
                      <span className="w-1 h-2 bg-emerald-500 rounded-full animate-pulse delay-150" />
                    </span>
                  )}
                </div>

                {/* Risk Level Badge */}
                <span
                  className={`text-xs font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                    report.riskLevel === 'HIGH_SCAM_RISK'
                      ? 'bg-rose-500/20 text-rose-500 border border-rose-500/40'
                      : report.riskLevel === 'SUSPICIOUS'
                      ? 'bg-amber-500/20 text-amber-500 border border-amber-500/40'
                      : 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/40'
                  }`}
                >
                  {report.riskLevel.replace(/_/g, ' ')}
                </span>
              </div>

              <p className="text-xs sm:text-sm leading-relaxed font-semibold">
                {LOCALIZED_VERDICTS[report.riskLevel]?.[language]?.speech || report.voiceSummary}
              </p>
            </div>
          </div>

          {/* 3-COLUMN EVIDENCE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* COLUMN 1: VERIFIED */}
            <div
              className={`rounded-2xl border p-4 flex flex-col space-y-3 transition-colors ${
                isDark
                  ? 'bg-slate-900/90 border-emerald-900/60 text-slate-100'
                  : 'bg-white border-emerald-200 text-slate-900 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <h4 className="text-sm font-bold tracking-tight">
                    {language === 'hi' ? '1. क्या साबित हुआ (Verified)' : '1. Verified Facts'}
                  </h4>
                </div>
                <span className="text-xs text-emerald-500 font-mono font-bold">
                  {report.verified.length}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                {language === 'hi'
                  ? 'वे तथ्य जो संदेश से वस्तुनिष्ठ रूप से जांचे जा सके:'
                  : 'Objective facts confirmed from the text:'}
              </p>
              <ul className="space-y-2 flex-1">
                {report.verified.map((item, idx) => (
                  <li key={idx} className="text-xs leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 2: WARNING SIGNS */}
            <div
              className={`rounded-2xl border p-4 flex flex-col space-y-3 transition-colors ${
                isDark
                  ? 'bg-slate-900/90 border-rose-900/60 text-slate-100'
                  : 'bg-white border-rose-200 text-slate-900 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between border-b border-rose-500/20 pb-2.5">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" />
                  <h4 className="text-sm font-bold tracking-tight">
                    {language === 'hi'
                      ? '2. खतरे के संकेत (Warning Signs)'
                      : '2. Warning Signs (Red Flags)'}
                  </h4>
                </div>
                <span className="text-xs text-rose-500 font-mono font-bold">
                  {report.warningSigns.length}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                {language === 'hi'
                  ? 'धोखाधड़ी और सेबी नियमों के उल्लंघन के संकेत:'
                  : 'Fraud signatures or illegal regulatory violations:'}
              </p>
              <ul className="space-y-2 flex-1">
                {report.warningSigns.map((item, idx) => (
                  <li key={idx} className="text-xs leading-relaxed flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* COLUMN 3: UNKNOWN & CHECKLIST */}
            <div
              className={`rounded-2xl border p-4 flex flex-col space-y-3 transition-colors ${
                isDark
                  ? 'bg-slate-900/90 border-sky-900/60 text-slate-100'
                  : 'bg-white border-sky-200 text-slate-900 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between border-b border-sky-500/20 pb-2.5">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-sky-500" />
                  <h4 className="text-sm font-bold tracking-tight">
                    {language === 'hi'
                      ? '3. अज्ञात व चेकलिस्ट (Checklist)'
                      : '3. Unknown & Checklist'}
                  </h4>
                </div>
                <span className="text-xs text-sky-500 font-mono font-bold">
                  {report.unknown.length + report.userChecklist.length}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">
                {language === 'hi'
                  ? 'जो बिना जांचे पक्का नहीं कहा जा सकता:'
                  : 'What cannot be verified without independent checks:'}
              </p>

              {/* Unknown Items */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-500">
                  {language === 'hi' ? 'क्या अज्ञात है:' : 'Unknowns:'}
                </span>
                <ul className="space-y-1">
                  {report.unknown.map((item, idx) => (
                    <li key={idx} className="text-xs leading-relaxed flex items-start gap-1.5">
                      <span className="text-sky-500 font-bold">?</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interactive Checklist */}
              <div className="pt-2 border-t border-slate-800/40 space-y-2 flex-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                  {language === 'hi'
                    ? 'आप स्वयं क्या जांचें (Checklist):'
                    : 'What You Must Check:'}
                </span>
                <div className="space-y-1.5">
                  {report.userChecklist.map((item, idx) => (
                    <label
                      key={idx}
                      onClick={() => handleToggleChecklist(idx)}
                      className={`flex items-start gap-2 p-2 rounded-xl border cursor-pointer text-xs transition-colors ${
                        isDark
                          ? 'bg-slate-950 border-slate-800'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={!!checkedItems[idx]}
                        onChange={() => {}}
                        className="mt-0.5 rounded border-slate-600 text-emerald-500 focus:ring-emerald-500"
                      />
                      <span className={checkedItems[idx] ? 'line-through text-slate-400' : ''}>
                        {item}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action Bar */}
          <div
            className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-3 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <button
              onClick={handleCopyReport}
              className={`min-h-[44px] px-4 py-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border-slate-300'
              }`}
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>
                {copied
                  ? language === 'hi'
                    ? 'कॉपी हो गया!'
                    : 'Copied Report!'
                  : language === 'hi'
                  ? 'साक्ष्य रिपोर्ट कॉपी करें'
                  : 'Copy Evidence Report'}
              </span>
            </button>

            {report.riskLevel === 'HIGH_SCAM_RISK' && (
              <button
                onClick={onNavigateToRecover}
                className="min-h-[44px] px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-500 border border-rose-500/40 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <span>
                  {language === 'hi'
                    ? 'पैसे कट चुके हैं? रिकवरी मोड खोलें'
                    : 'Money already lost? Open Recovery'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
