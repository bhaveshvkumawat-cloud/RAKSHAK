import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Users,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  BarChart3,
  Presentation,
} from 'lucide-react';
import { Language, ColorMode } from '../types';
import { QUIZ_QUESTIONS, IMPACT_COHORT_STUDY } from '../data/quizData';
import { sound } from '../utils/audioEffects';

interface ImpactQuizProps {
  language: Language;
  onNavigateToSimulator: () => void;
  colorMode?: ColorMode;
}

export const ImpactQuiz: React.FC<ImpactQuizProps> = ({
  language,
  onNavigateToSimulator,
  colorMode = 'dark',
}) => {
  const [activeMode, setActiveMode] = useState<'take_quiz' | 'pitch_slide'>('take_quiz');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const isDark = colorMode === 'dark';
  const currentQ = QUIZ_QUESTIONS[currentQuestionIndex];
  const hasAnsweredCurrent = selectedAnswers[currentQuestionIndex] !== undefined;

  const handleSelectOption = (optionIndex: number) => {
    if (hasAnsweredCurrent) return;
    sound.playClick();
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionIndex,
    }));
  };

  const handleNextQuestion = () => {
    sound.playClick();
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleResetQuiz = () => {
    sound.playClick();
    setSelectedAnswers({});
    setCurrentQuestionIndex(0);
    setShowResults(false);
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <div className="w-full mx-auto space-y-5 pb-2 pt-1">
      {/* Header Info */}
      <div className="px-2 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-500 mb-1">
            <Award className="w-4 h-4" />
            <span>
              {language === 'hi'
                ? 'प्रभाव सत्यापन (Proof of Impact)'
                : 'Proof of Impact & Learning Evaluation'}
            </span>
          </div>
          <h2
            className={`text-xl sm:text-2xl font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            {language === 'hi'
              ? '5-प्रश्नों का स्कैम क्विज़ और प्रभाव स्लाइड'
              : 'Your Safety Challenge'}
          </h2>
          <p className={`mt-1 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {language === 'hi'
              ? 'अपनी जानकारी जांचें और सुरक्षित आदतें बनाएं।'
              : 'Test your knowledge and build better habits.'}
          </p>
        </div>

        {/* Mode Toggle */}
        <div
          className={`flex items-center gap-1 p-1 rounded-2xl border ${
            isDark ? 'bg-slate-900 border-slate-800' : 'bg-slate-100 border-slate-200'
          }`}
        >
          <button
            onClick={() => {
              sound.playClick();
              setActiveMode('pitch_slide');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'pitch_slide'
                ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Presentation className="w-4 h-4" />
            <span>{language === 'hi' ? 'पिच स्लाइड' : 'Pitch Slide'}</span>
          </button>
          <button
            onClick={() => {
              sound.playClick();
              setActiveMode('take_quiz');
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeMode === 'take_quiz'
                ? 'bg-emerald-500 text-slate-950 shadow-sm font-bold'
                : isDark
                ? 'text-slate-400 hover:text-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>{language === 'hi' ? 'क्विज लें (Quiz)' : 'Take Quiz'}</span>
          </button>
        </div>
      </div>

      {activeMode === 'pitch_slide' ? (
        /* PROOF OF IMPACT PITCH SLIDE VIEW */
        <div
          className={`rounded-2xl border p-5 sm:p-8 shadow-2xl relative overflow-hidden transition-colors space-y-6 ${
            isDark
              ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-slate-800 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4 border-slate-700/30">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-500 block">
                COHORT IMPACT TRIAL · 15 INVESTORS (AGES 24-58)
              </span>
              <h3 className="text-xl sm:text-2xl font-bold tracking-tight mt-1">
                {language === 'hi'
                  ? 'स्कैम सिमुलेशन का प्रमाणित प्रभाव (+180% सुधार)'
                  : 'Empirical Scam Resistance Improvement: +180%'}
              </h3>
            </div>
            <div className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/40 text-xs font-mono font-bold flex items-center gap-1.5 w-fit">
              <TrendingUp className="w-4 h-4" />
              <span>+180% Detection Delta</span>
            </div>
          </div>

          {/* Bar Graph Metric Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Before Rehearsal */}
            <div
              className={`p-4 rounded-2xl border space-y-3 ${
                isDark ? 'bg-slate-950/70 border-rose-500/30' : 'bg-rose-50/60 border-rose-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-500">
                  {language === 'hi' ? 'सिमुलेशन से पहले (Before Rehearse)' : 'Before Simulation'}
                </span>
                <span className="text-sm font-mono font-bold text-rose-500">33.3% Accuracy</span>
              </div>
              <div className="w-full h-3 bg-slate-800/40 rounded-full overflow-hidden">
                <div className="w-1/3 h-full bg-rose-500 rounded-full" />
              </div>
              <p
                className={`text-xs ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {language === 'hi'
                  ? '15 में से केवल 5 प्रतिभागी फर्जी सेबी नंबर और 5 मिनट के टाइमर का जाल पहचान पाए।'
                  : 'Only 5 of 15 investors spotted the spoofed SEBI badge and fake FOMO countdown.'}
              </p>
            </div>

            {/* After Rehearsal */}
            <div
              className={`p-4 rounded-2xl border space-y-3 ${
                isDark ? 'bg-slate-950/70 border-emerald-500/30' : 'bg-emerald-50/60 border-emerald-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-500">
                  {language === 'hi' ? 'सिमुलेशन के बाद (After Rehearse)' : 'After Rehearsal'}
                </span>
                <span className="text-sm font-mono font-bold text-emerald-500">93.3% Accuracy</span>
              </div>
              <div className="w-full h-3 bg-slate-800/40 rounded-full overflow-hidden">
                <div className="w-[93%] h-full bg-emerald-500 rounded-full" />
              </div>
              <p
                className={`text-xs ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {language === 'hi'
                  ? '15 में से 14 निवेशकों ने तुरंत व्यक्तिगत UPI और अग्रिम टैक्स घोटाले को पकड़ा।'
                  : '14 of 15 investors instantly recognized the mule UPI and advance fee tax extortion.'}
              </p>
            </div>
          </div>

          {/* Core Pitch Quote */}
          <div
            className={`p-4 sm:p-5 rounded-2xl border text-center space-y-2 ${
              isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}
          >
            <p className="text-sm sm:text-base font-bold text-emerald-500 italic">
              "We let investors survive a scam safely, verify a real one with evidence, and know
              exactly what to do if they've already been hit."
            </p>
            <p
              className={`text-xs ${
                isDark ? 'text-slate-400' : 'text-slate-500'
              }`}
            >
              — Rakshak Cyber Defense Architecture
            </p>
          </div>

          <div className="flex justify-center">
            <button
              onClick={onNavigateToSimulator}
              className="py-3 px-6 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all active:scale-98"
            >
              <span>{language === 'hi' ? 'सिमुलेशन का अनुभव करें' : 'Try WhatsApp Rehearsal Sandbox'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* INTERACTIVE 3-QUESTION QUIZ VIEW */
        <div
          className={`rounded-2xl border p-5 sm:p-6 shadow-xl transition-colors space-y-5 ${
            isDark ? 'bg-slate-900/90 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {!showResults ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-3 border-slate-700/30">
                <span className="text-xs font-mono font-bold text-violet-700 dark:text-violet-300">
                  Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className="text-xs text-slate-400">
                  {Math.round(((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100)}% Complete
                </span>
              </div>

              <div className={`h-2 overflow-hidden rounded-full ${isDark ? 'bg-slate-800' : 'bg-violet-100'}`}>
                <div
                  className="h-full rounded-full bg-violet-600 transition-all"
                  style={{ width: `${((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>

              <h3 className="text-base sm:text-lg font-bold">
                {language === 'hi' ? currentQ.questionHi : currentQ.questionEn}
              </h3>

              <div className="space-y-2.5">
                {(language === 'hi' ? currentQ.optionsHi : currentQ.optionsEn).map((opt, idx) => {
                  const isSelected = selectedAnswers[currentQuestionIndex] === idx;
                  const isCorrect = idx === currentQ.correctIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={hasAnsweredCurrent}
                      className={`w-full p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-violet-50 border-violet-600 text-violet-800 dark:bg-violet-950/50 dark:text-violet-200'
                          : hasAnsweredCurrent && isCorrect
                          ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-500'
                          : isDark
                          ? 'bg-slate-950/60 border-slate-800 text-slate-200 hover:border-slate-700'
                          : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <span>{opt}</span>
                      {hasAnsweredCurrent && isCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      )}
                      {hasAnsweredCurrent && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback explanation after answer */}
              {hasAnsweredCurrent && (
                <div
                  className={`p-3.5 rounded-2xl border text-xs leading-relaxed animate-fade-in ${
                    isDark ? 'bg-slate-950 border-slate-800 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'
                  }`}
                >
                  <span className="font-bold text-emerald-500 block mb-1">
                    {language === 'hi' ? 'सेबी नियम व्याख्या:' : 'Regulatory Explanation:'}
                  </span>
                  <span>{language === 'hi' ? currentQ.explanationHi : currentQ.explanationEn}</span>
                </div>
              )}

              {/* Next Button */}
              {hasAnsweredCurrent && (
                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleNextQuestion}
                    className="py-2.5 px-5 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition-all active:scale-98"
                  >
                    <span>
                      {currentQuestionIndex < QUIZ_QUESTIONS.length - 1
                        ? language === 'hi'
                          ? 'अगला प्रश्न'
                          : 'Next Question'
                        : language === 'hi'
                        ? 'स्कोर देखें'
                        : 'See Results'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Results Screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-500 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">
                {language === 'hi' ? 'क्विज संपन्न!' : 'Quiz Complete!'}
              </h3>
              <p className="text-2xl font-mono font-bold text-emerald-500">
                {calculateScore()} / {QUIZ_QUESTIONS.length} Correct
              </p>
              <button
                onClick={handleResetQuiz}
                className="py-2.5 px-5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'पुनः प्रयास करें' : 'Try Again'}</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
