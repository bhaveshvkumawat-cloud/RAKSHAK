import React, { useState, useEffect } from 'react';
import { Radio, ShieldAlert, AlertTriangle, Activity, MapPin, Sparkles, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { sound } from '../utils/audioEffects';

interface LiveThreatRadarProps {
  language: Language;
  onInspectScamSample?: (sampleText: string) => void;
}

const LIVE_THREAT_FEED = [
  {
    id: 'th_1',
    city: 'Mumbai, MH',
    time: '2 mins ago',
    typeEn: 'WhatsApp Pre-IPO Allotment Scam',
    typeHi: 'व्हाट्सएप प्री-IPO फर्जी आवंटन',
    lossPrevented: '₹4.8 Lakhs',
    upiDomain: '@okaxis (Mule VPA)',
  },
  {
    id: 'th_2',
    city: 'Jaipur, RJ',
    time: '5 mins ago',
    typeEn: 'Fake SEBI Institutional VIP Group',
    typeHi: 'फर्जी सेबी संस्थागत VIP ग्रुप',
    lossPrevented: '₹2.1 Lakhs',
    upiDomain: '@ybl (Blocked by 1930)',
  },
  {
    id: 'th_3',
    city: 'Bengaluru, KA',
    time: '8 mins ago',
    typeEn: 'YouTube Video Like / Task Ponzi',
    typeHi: 'यूट्यूब लाइक / टास्क पोंजी फ्रॉड',
    lossPrevented: '₹75,000',
    upiDomain: '@paytm (Frozen)',
  },
  {
    id: 'th_4',
    city: 'Delhi NCR',
    time: '12 mins ago',
    typeEn: 'Sideloaded Trading APK Trojan',
    typeHi: 'फर्जी ट्रेडिंग APK वायरस ऐप',
    lossPrevented: '₹12.5 Lakhs',
    upiDomain: 'bit.ly APK Link Flagged',
  },
];

export const LiveThreatRadar: React.FC<LiveThreatRadarProps> = ({
  language,
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState<number>(0);
  const [pulseCount, setPulseCount] = useState<number>(1489);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItemIndex((prev) => (prev + 1) % LIVE_THREAT_FEED.length);
      setPulseCount((prev) => prev + Math.floor(Math.random() * 2));
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  const activeThreat = LIVE_THREAT_FEED[activeItemIndex];

  return (
    <div className="rounded-2xl border border-emerald-500/30 bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 relative overflow-hidden shadow-xl">
      {/* Background cyber grid & glow */}
      <div className="absolute -top-12 -left-12 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Left Radar Indicator */}
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-xl bg-emerald-950/70 border border-emerald-500/40 flex items-center justify-center shrink-0">
            {/* Spinning Radar Line */}
            <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
              <div className="w-full h-full border-r border-emerald-400 origin-center animate-spin" style={{ animationDuration: '3s' }} />
            </div>
            <Radio className="w-5 h-5 text-emerald-400 z-10 animate-pulse" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                {language === 'hi' ? 'लाइव साइबर थ्रेट रडार' : 'LIVE INDIA SCAM RADAR'}
              </span>
              <span className="text-[10px] text-slate-400 font-mono hidden xs:inline">
                · {pulseCount} Alerts Flagged
              </span>
            </div>
            <p className="text-xs font-semibold text-white truncate">
              {language === 'hi' ? activeThreat.typeHi : activeThreat.typeEn}
            </p>
          </div>
        </div>

        {/* Right Details Pill */}
        <div className="flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl text-xs shrink-0 self-start sm:self-center">
          <div className="flex items-center gap-1 text-slate-400">
            <MapPin className="w-3 h-3 text-sky-400" />
            <span>{activeThreat.city}</span>
          </div>
          <span className="text-slate-600">·</span>
          <span className="font-mono text-emerald-400 font-bold">
            {activeThreat.lossPrevented} Saved
          </span>
          <span className="text-slate-600">·</span>
          <span className="text-[11px] text-slate-400 font-mono">
            {activeThreat.time}
          </span>
        </div>
      </div>
    </div>
  );
};
