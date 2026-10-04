import React, { useState } from 'react';
import {
  LifeBuoy,
  PhoneCall,
  ShieldAlert,
  AlertOctagon,
  Download,
  Copy,
  Check,
  ExternalLink,
  Smartphone,
  CheckCircle2,
} from 'lucide-react';
import { Language, IncidentDetails, ColorMode, UserProfile } from '../types';
import { OFFICIAL_REGULATORS, BANK_HELPLINES } from '../data/bankHelplines';
import { sound } from '../utils/audioEffects';

interface RecoverDossierProps {
  language: Language;
  colorMode?: ColorMode;
  user?: UserProfile;
}

export const RecoverDossier: React.FC<RecoverDossierProps> = ({
  language,
  colorMode = 'dark',
  user,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const isDark = colorMode === 'dark';

  const [evidenceChecks, setEvidenceChecks] = useState<Record<string, boolean>>({
    txUtr: false,
    chatScreenshots: false,
    phoneNumbers: false,
    upiHandles: false,
    apkFiles: false,
    bankStatement: false,
  });

  const [incident, setIncident] = useState<IncidentDetails>({
    incidentDate: new Date().toISOString().split('T')[0],
    incidentTime: '11:30',
    amountLost: '15000',
    paymentMode: 'UPI (Google Pay / PhonePe)',
    transactionId: '',
    suspectPhone: '+91 ',
    suspectUpi: '',
    suspectPlatform: 'WhatsApp VIP Tip Group',
    briefDescription:
      'Was added to a VIP stock tip group promising 400% guaranteed returns. Transferred reservation deposit to personal UPI, then was asked for 18% GST fee to withdraw.',
    hasScreenshots: true,
    hasBankStatement: true,
    hasChatExport: true,
  });

  const handleToggleEvidence = (key: string) => {
    sound.playClick();
    setEvidenceChecks((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const generateComplaintLetter = (): string => {
    return `To,
The Station House Officer / Cyber Crime Investigation Cell,
National Cyber Crime Reporting Portal (cybercrime.gov.in)

Subject: Formal Complaint regarding Financial Cyber Fraud & Unauthorized Investment Extortion

Respected Officer,

I wish to register a formal complaint regarding financial cyber fraud perpetrated against me under Sections 419, 420 of IPC and Section 66D of Information Technology Act.

1. INCIDENT DETAILS:
- Date of Fraud: ${incident.incidentDate}
- Time of Fraud: ${incident.incidentTime}
- Total Amount Defrauded: INR ₹${incident.amountLost}
- Payment Mode: ${incident.paymentMode}
- Transaction Reference / UTR ID: ${incident.transactionId || '[Attach UTR from Bank Statement]'}

2. SUSPECT PARTICULARS:
- Suspect Platform: ${incident.suspectPlatform}
- Suspect Mobile Number: ${incident.suspectPhone}
- Suspect UPI VPA / Account: ${incident.suspectUpi || '[Suspect UPI ID]'}

3. SUMMARY OF OCCURRENCE:
${incident.briefDescription}

4. EVIDENCE PRESERVED & ATTACHED:
${evidenceChecks.txUtr ? '✓ Bank Statement with Transaction UTR & Debit Timestamp' : '• Bank Statement'}
${evidenceChecks.chatScreenshots ? '✓ Complete WhatsApp/Telegram chat screenshots showing promises & UPI demands' : '• Chat screenshots'}
${evidenceChecks.phoneNumbers ? '✓ Complete phone numbers and profile links of group admins' : '• Phone numbers of admins'}
${evidenceChecks.apkFiles ? '✓ Unofficial APK app install file / download link' : ''}

I kindly request your department to register an FIR, coordinate with the beneficiary bank node to freeze the fraudulently transferred funds in the beneficiary mule account immediately, and trace the accused.

Date: ${new Date().toLocaleDateString()}
Complainant Signature / Submission Draft Generated via Rakshak App`;
  };

  const handleCopyComplaint = () => {
    sound.playClick();
    const text = generateComplaintLetter();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadComplaint = () => {
    sound.playClick();
    const text = generateComplaintLetter();
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Cybercrime_Complaint_${incident.incidentDate}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full mx-auto space-y-5 pb-2 pt-1">
      {/* Header Info */}
      <div className="px-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-rose-500 mb-1">
          <LifeBuoy className="w-4 h-4" />
          <span>{language === 'hi' ? 'तत्काल रिकवरी सहायता' : "I've been scammed"}</span>
        </div>
        <h2
          className={`text-xl sm:text-2xl font-bold tracking-tight ${
            isDark ? 'text-white' : 'text-slate-900'
          }`}
        >
          {language === 'hi' ? 'घबराएं नहीं। इन चरणों का पालन करें।' : "Don't panic. Follow these steps."}
        </h2>
        <p
          className={`text-xs sm:text-sm mt-1 leading-relaxed ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {language === 'hi'
            ? 'तुरंत कार्रवाई करने से आगे होने वाले नुकसान को रोकने में मदद मिलती है।'
            : 'Quick action can help stop further losses and preserve evidence.'}
        </p>
      </div>

      <section className="space-y-2.5">
        {[
          {
            title: language === 'hi' ? 'अपने बैंक से संपर्क करें' : 'Contact your bank',
            description: language === 'hi' ? 'संदिग्ध लेन-देन रोकें' : 'Block suspicious transactions',
          },
          {
            title: language === 'hi' ? '1930 पर कॉल करें' : 'Call 1930',
            description: language === 'hi' ? 'साइबर अपराध हेल्पलाइन' : 'Cyber Crime Helpline',
          },
          {
            title: language === 'hi' ? 'भुगतान / खाता ब्लॉक करें' : 'Block payment/account',
            description: language === 'hi' ? 'आगे के नुकसान को रोकें' : 'Stop further loss',
          },
          {
            title: language === 'hi' ? 'धोखाधड़ी की रिपोर्ट करें' : 'Report the fraud',
            description: language === 'hi' ? 'ऑनलाइन या ऑफलाइन शिकायत दर्ज करें' : 'File a complaint online or offline',
          },
        ].map(({ title, description }, index) => (
          <div
            key={title}
            className={`flex items-center gap-3 rounded-2xl border p-3.5 ${
              isDark ? 'border-slate-800 bg-slate-900 text-slate-100' : 'border-slate-200 bg-white text-slate-900'
            }`}
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-violet-100 text-sm font-extrabold text-violet-700 dark:bg-violet-950 dark:text-violet-300">
              {index + 1}
            </span>
            <div className="min-w-0">
              <h3 className="text-sm font-bold">{title}</h3>
              <p className={`mt-0.5 text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{description}</p>
            </div>
          </div>
        ))}
      </section>

      <a
        href="tel:1930"
        className="flex min-h-14 w-full items-center justify-center gap-2 rounded-2xl bg-rose-600 px-4 text-sm font-extrabold text-white shadow-sm transition-colors hover:bg-rose-700"
      >
        <PhoneCall className="h-5 w-5" />
        {language === 'hi' ? '📞 अभी 1930 पर कॉल करें' : 'CALL 1930 NOW'}
      </a>

      <section className="space-y-2">
        <h3 className="text-sm font-bold">{language === 'hi' ? 'आपातकालीन संपर्क' : 'Emergency Contacts'}</h3>
        <a
          href={user?.trustedContact?.phone ? `tel:${user.trustedContact.phone.replace(/[^\d+]/g, '')}` : 'tel:1930'}
          className={`flex min-h-12 items-center justify-between gap-3 rounded-xl border px-3.5 ${
            isDark ? 'border-slate-800 bg-slate-900 text-slate-200' : 'border-slate-200 bg-white text-slate-700'
          }`}
        >
          <span className="text-xs font-semibold">{language === 'hi' ? 'परिवार' : 'Family'}</span>
          <span className="truncate text-xs text-slate-500">{user?.trustedContact?.name || 'Trusted contact'}</span>
        </a>
        <a
          href="#bank-contacts"
          className={`flex min-h-12 items-center justify-between gap-3 rounded-xl border px-3.5 ${
            isDark ? 'border-slate-800 bg-slate-900 text-slate-200' : 'border-slate-200 bg-white text-slate-700'
          }`}
        >
          <span className="text-xs font-semibold">{language === 'hi' ? 'बैंक' : 'Bank'}</span>
          <span className="text-xs text-violet-600">{language === 'hi' ? 'हेल्पलाइन देखें' : 'View helplines'}</span>
        </a>
        <a
          href="tel:1930"
          className={`flex min-h-12 items-center justify-between gap-3 rounded-xl border px-3.5 ${
            isDark ? 'border-slate-800 bg-slate-900 text-slate-200' : 'border-slate-200 bg-white text-slate-700'
          }`}
        >
          <span className="text-xs font-semibold">{language === 'hi' ? 'साइबर अपराध' : 'Cyber Crime'}</span>
          <span className="text-xs font-bold text-rose-600">1930</span>
        </a>
      </section>

      {/* CRITICAL WARNING: ANTI-RECOVERY SCAM BOX */}
      <div
        className={`rounded-2xl border-2 p-4 sm:p-5 shadow-2xl relative overflow-hidden transition-colors ${
          isDark
            ? 'border-amber-500/80 bg-amber-950/40 text-amber-100'
            : 'border-amber-400 bg-amber-50 text-amber-950'
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-500 shrink-0 mt-0.5">
            <AlertOctagon className="w-6 h-6" />
          </div>
          <div className="space-y-1.5 flex-1">
            <h3 className="text-sm sm:text-base font-bold uppercase tracking-tight flex items-center gap-2">
              <span>
                {language === 'hi'
                  ? '⚠️ सबसे जरूरी चेतावनी: दूसरे स्कैम (Recovery Scam) से बचें'
                  : '⚠️ Crucial Warning: Beware of Secondary Recovery Scams'}
              </span>
            </h3>
            <p className="text-xs sm:text-sm leading-relaxed font-medium">
              {language === 'hi'
                ? 'टेलीग्राम, इंस्टाग्राम या सोशल मीडिया पर जो भी व्यक्ति या तथाकथित "एथिकल हैकर / रिकवरी वकील" आपके खोए हुए पैसे वापस दिलाने का दावा करे और इसके लिए फीस मांगे — वह 100% एक और धोखेबाज है।'
                : 'Anyone on Telegram, Instagram, or social media claiming to be a "cyber lawyer" or "ethical hacker" offering to recover your lost money for an advance fee is guaranteed to be another scammer.'}
            </p>
            <p className="text-[11px] font-bold text-amber-600 dark:text-amber-300">
              {language === 'hi'
                ? 'नियम: पैसे की रिकवरी केवल 1930 / cybercrime.gov.in और कानूनी बैंक नोडल चैनलों के जरिए ही संभव है।'
                : 'Rule: Fund freezes can ONLY be legally initiated through 1930 / cybercrime.gov.in and official bank nodal officers.'}
            </p>
          </div>
        </div>
      </div>

      {/* GOLDEN HOUR ACTION TILES */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {OFFICIAL_REGULATORS.map((reg, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-3xl border flex flex-col justify-between space-y-3 transition-colors ${
              isDark
                ? 'border-slate-800 bg-slate-900/90 text-slate-100'
                : 'border-slate-200 bg-white text-slate-900 shadow-xs'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 font-mono">
                  {idx === 0 ? '🚨 Priority 1' : 'Official Portal'}
                </span>
                <span
                  className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                    isDark ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'
                  }`}
                >
                  {reg.helpline}
                </span>
              </div>
              <h4 className="text-sm font-bold mb-1">
                {language === 'hi' ? reg.nameHi : reg.nameEn}
              </h4>
              <p
                className={`text-xs leading-relaxed ${
                  isDark ? 'text-slate-400' : 'text-slate-600'
                }`}
              >
                {language === 'hi' ? reg.descriptionHi : reg.descriptionEn}
              </p>
            </div>

            <section id="bank-contacts" className="space-y-2">
              <h3 className="text-sm font-bold">{language === 'hi' ? 'बैंक हेल्पलाइन' : 'Bank Helplines'}</h3>
              {BANK_HELPLINES.filter((contact) => contact.type === 'bank').map((contact) => (
                <a
                  key={contact.id}
                  href={`tel:${contact.helpline.replace(/[^\d+]/g, '')}`}
                  className={`flex min-h-12 items-center justify-between gap-3 rounded-xl border px-3.5 ${
                    isDark ? 'border-slate-800 bg-slate-900 text-slate-200' : 'border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  <span className="truncate text-xs font-semibold">
                    {language === 'hi' ? contact.nameHi : contact.nameEn}
                  </span>
                  <span className="shrink-0 text-xs font-mono text-violet-600">{contact.helpline}</span>
                </a>
              ))}
            </section>

            <div className="pt-2 border-t border-slate-700/20 flex gap-2">
              <a
                href={`tel:${reg.helpline.replace(/\s+/g, '')}`}
                className="flex-1 py-2 px-3 bg-rose-500 hover:bg-rose-400 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
              >
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{language === 'hi' ? 'तुरंत कॉल करें' : 'Call Now'}</span>
              </a>
              {reg.portalUrl && (
                <a
                  href={reg.portalUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={`p-2 rounded-xl border flex items-center justify-center transition-colors ${
                    isDark
                      ? 'border-slate-700 bg-slate-800 text-slate-300'
                      : 'border-slate-200 bg-slate-100 text-slate-700'
                  }`}
                  title="Open Portal"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* EVIDENCE CHECKLIST & DOSSIER GENERATOR */}
      <div
        className={`rounded-2xl border p-5 sm:p-6 shadow-xl space-y-5 transition-colors ${
          isDark
            ? 'bg-slate-900/90 border-slate-800 text-slate-100'
            : 'bg-white border-slate-200 text-slate-900'
        }`}
      >
        <div className="flex items-center justify-between border-b pb-3 border-slate-700/30">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base font-bold tracking-tight">
              {language === 'hi'
                ? 'साक्ष्य चेकलिस्ट व साइबर पुलिस ड्राफ्ट'
                : 'Evidence Checklist & Police FIR Draft'}
            </h3>
          </div>
        </div>

        {/* Evidence Toggles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {[
            { key: 'txUtr', labelEn: 'Transaction Reference / UTR Number', labelHi: 'बैंक UTR नंबर व समय' },
            { key: 'chatScreenshots', labelEn: 'Complete WhatsApp / Telegram Chat Screenshots', labelHi: 'व्हाट्सएप चैट के पूरे स्क्रीनशॉट' },
            { key: 'phoneNumbers', labelEn: 'Phone Numbers & Profiles of All Group Admins', labelHi: 'ग्रुप एडमिन के मोबाइल नंबर' },
            { key: 'upiHandles', labelEn: 'Beneficiary UPI Handles & Bank Account Details', labelHi: 'जालसाज का UPI हैंडल (@okaxis आदि)' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => handleToggleEvidence(item.key)}
              className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                evidenceChecks[item.key]
                  ? isDark
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-emerald-50 border-emerald-500 text-emerald-900'
                  : isDark
                  ? 'bg-slate-950/60 border-slate-800 text-slate-300'
                  : 'bg-slate-50 border-slate-200 text-slate-700'
              }`}
            >
              <span className="text-xs font-semibold">
                {language === 'hi' ? item.labelHi : item.labelEn}
              </span>
              {evidenceChecks[item.key] ? (
                <Check className="w-4 h-4 text-emerald-500 stroke-[3]" />
              ) : (
                <span className="w-4 h-4 rounded border border-slate-500" />
              )}
            </button>
          ))}
        </div>

        {/* Input Details Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label
              className={`block text-[11px] font-semibold mb-1 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {language === 'hi' ? 'खोई हुई राशि (₹)' : 'Defrauded Amount (₹)'}
            </label>
            <input
              type="text"
              value={incident.amountLost}
              onChange={(e) => setIncident({ ...incident, amountLost: e.target.value })}
              className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label
              className={`block text-[11px] font-semibold mb-1 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {language === 'hi' ? 'जालसाज का UPI आईडी' : 'Suspect UPI ID'}
            </label>
            <input
              type="text"
              value={incident.suspectUpi}
              onChange={(e) => setIncident({ ...incident, suspectUpi: e.target.value })}
              placeholder="e.g. rahul@okaxis"
              className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>

          <div>
            <label
              className={`block text-[11px] font-semibold mb-1 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              {language === 'hi' ? 'बैंक UTR / ट्रांजैक्शन आईडी' : 'Bank UTR / Transaction ID'}
            </label>
            <input
              type="text"
              value={incident.transactionId}
              onChange={(e) => setIncident({ ...incident, transactionId: e.target.value })}
              placeholder="12-digit UTR"
              className={`w-full px-3.5 py-2 rounded-xl border text-xs font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
                isDark ? 'bg-slate-950 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
          </div>
        </div>

        {/* Generate / Copy / Download Complaint Letter */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleCopyComplaint}
            className="flex-1 py-3 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all active:scale-98 shadow-md"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>
              {copied
                ? language === 'hi'
                  ? 'शिकायत कॉपी हो गई!'
                  : 'Complaint Draft Copied!'
                : language === 'hi'
                ? 'पुलिस शिकायत का ड्राफ्ट कॉपी करें'
                : 'Copy Cyber Crime Complaint Draft'}
            </span>
          </button>

          <button
            onClick={handleDownloadComplaint}
            className={`py-3 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 border-slate-700 text-slate-200'
                : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
            }`}
          >
            <Download className="w-4 h-4" />
            <span>{language === 'hi' ? 'डाउनलोड .txt' : 'Download .txt'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
