import { VerifyReport, Language } from '../types';

export function analyzeScamClientSide(text: string, language: Language = 'hi'): VerifyReport {
  const lower = text.toLowerCase();
  const verified: string[] = [];
  const warningSigns: string[] = [];
  const unknown: string[] = [];
  const checklist: string[] = [];

  // 1. UPI check
  const upiMatch = text.match(/[\w.-]+@[\w.-]+/gi);
  if (upiMatch) {
    const upi = upiMatch[0];
    verified.push(
      language === 'hi'
        ? `पहचाना गया UPI हैंडल: ${upi}`
        : `Detected Payment Handle: ${upi}`
    );
    const personalHandles = ['okhdfcbank', 'okaxis', 'okicici', 'oksbi', 'ybl', 'ibl', 'axl', 'paytm'];
    const hasPersonal = personalHandles.some((h) => upi.toLowerCase().includes(h));
    if (hasPersonal) {
      warningSigns.push(
        language === 'hi'
          ? `व्यक्तिगत (Personal) UPI ID: सेबी अधिकृत स्टॉक ब्रोकर्स कभी भी व्यक्तिगत UPI (@ybl, @okaxis आदि) पर पैसे नहीं लेते। वे केवल आधिकारिक क्लीयरिंग कॉरपोरेशन (ICCL/NSCCL) या ब्रोकर के अधिकृत एस्क्रो खाते से फंड स्वीकारते हैं।`
          : `Personal UPI VPA: Regulated SEBI brokers NEVER collect client investments via personal UPI handles (@okaxis, @ybl, @paytm). They only accept deposits through clearing corporations (ICCL/NSCCL) or corporate broker portals.`
      );
    }
  } else {
    unknown.push(
      language === 'hi'
        ? `संदेश में कोई प्रत्यक्ष UPI या बैंक खाता नंबर नहीं मिला।`
        : `No direct UPI VPA or bank account details found in message.`
    );
  }

  // 2. SEBI Registration format check
  const sebiMatch = text.match(/(INA|INH|INZ|INB|INF|INP)[0-9]{8,10}/i);
  if (sebiMatch) {
    verified.push(
      language === 'hi'
        ? `SEBI रजिस्ट्रेशन नंबर पैटर्न मिला: ${sebiMatch[0]} (चेतावनी: जालसाज अक्सर असली सलाहकारों का नंबर चुराकर इस्तेमाल करते हैं)`
        : `SEBI Reg Pattern Detected: ${sebiMatch[0]} (Notice: Criminals frequently impersonate legitimate advisors using publicly available registration numbers)`
    );
    warningSigns.push(
      language === 'hi'
        ? `SEBI रजिस्ट्रेशन नंबर का टेक्स्ट दिखाने मात्र से भरोसा न करें। SEBI नियमों के अनुसार कोई भी पंजीकृत सलाहकार कभी गारंटीड रिटर्न (Guaranteed Returns) का वादा नहीं कर सकता।`
        : `SEBI Code Misrepresentation: Under SEBI (Research Analysts) Regulations, even authorized advisors are strictly prohibited from promising guaranteed gains.`
    );
  } else if (lower.includes('sebi') || lower.includes('सेबी')) {
    warningSigns.push(
      language === 'hi'
        ? `संदेश में SEBI का नाम लिया गया है लेकिन कोई वैध 11-अंकीय SEBI रजिस्ट्रेशन नंबर (उदा. INA00000000) नहीं दिया गया।`
        : `SEBI Authority Misuse: The message invokes SEBI authority but omits a verifiable 11-digit SEBI registration number.`
    );
  } else {
    unknown.push(
      language === 'hi'
        ? `यह सलाहकार या संस्था SEBI में पंजीकृत है या नहीं, यह स्वतंत्र रूप से SEBI SCORES पोर्टल पर जांचना होगा।`
        : `Whether this entity holds an active SEBI registration cannot be verified from this text alone.`
    );
  }

  // 3. Guaranteed returns check
  if (
    lower.includes('guarantee') ||
    lower.includes('गारंटी') ||
    lower.includes('100%') ||
    lower.includes('300%') ||
    lower.includes('400%') ||
    lower.includes('double') ||
    lower.includes('निश्चित लाभ') ||
    lower.includes('sure shot') ||
    lower.includes('jackpot') ||
    lower.includes('upper circuit')
  ) {
    warningSigns.push(
      language === 'hi'
        ? `'100% गारंटी' या 'अति-उच्च निश्चित मुनाफे' का दावा। भारतीय शेयर बाजार में किसी भी पंजीकृत व्यक्ति को गारंटीड रिटर्न का वादा करने की कानूनी अनुमति नहीं है।`
        : `Illegal Guaranteed Returns: Any promise of 100% risk-free stock market return or upper circuit pump is illegal under Indian securities law and a definitive scam indicator.`
    );
  }

  // 4. Urgency check
  if (
    lower.includes('urgent') ||
    lower.includes('last chance') ||
    lower.includes('seats left') ||
    lower.includes('slots') ||
    lower.includes('जल्दी करें') ||
    lower.includes('केवल 10 मिनट') ||
    lower.includes('expires') ||
    lower.includes('offer ends')
  ) {
    warningSigns.push(
      language === 'hi'
        ? `कृत्रिम तात्कालिकता (Artificial Urgency): 'सिर्फ 5 मिनट बचे हैं' या 'अंतिम 4 सीट' कहकर सोचने और जांचने का समय छीना जा रहा है।`
        : `Artificial Urgency (FOMO Trigger): Short countdowns ('Only 5 seats left!', 'Offer expires in 10 mins') are designed to disable critical verification.`
    );
  }

  // 5. APK / Unofficial download link check
  if (
    lower.includes('.apk') ||
    lower.includes('bit.ly') ||
    lower.includes('tinyurl') ||
    lower.includes('unknown sources') ||
    lower.includes('t.me') ||
    lower.includes('chat.whatsapp.com')
  ) {
    warningSigns.push(
      language === 'hi'
        ? `असुरक्षित बाहरी लिंक / अनऑफिशियल APK डाउनलोड: प्ले स्टोर के बाहर से थर्ड-पार्टी ट्रेडिंग ऐप इंस्टॉल कराना फोन में स्पाइवेयर या फर्जी ट्रेडिंग स्क्रीन डालने का प्रयास है।`
        : `Sideloaded APK / Obfuscated Link: Asking users to install .apk files or join Telegram VIP groups circumvents official Play Store security checks.`
    );
  }

  // Checklist
  checklist.push(
    language === 'hi'
      ? 'SEBI की आधिकारिक वेबसाइट (scores.sebi.gov.in) पर "Recognized Intermediaries" में नाम सर्च करें।'
      : 'Search entity name on SEBI SCORES portal (scores.sebi.gov.in) under Recognized Intermediaries.'
  );
  checklist.push(
    language === 'hi'
      ? 'NSE / BSE की आधिकारिक सदस्य सूची में ब्रोकर का नाम सत्यापित करें।'
      : 'Verify broker member code on NSE/BSE member directory.'
  );
  checklist.push(
    language === 'hi'
      ? 'कभी भी किसी व्यक्तिगत बैंक खाते या व्यक्तिगत UPI ID पर निवेश राशि न भेजें।'
      : 'Never transfer investment deposits to a personal individual UPI handle.'
  );
  checklist.push(
    language === 'hi'
      ? 'यदि पैसे पहले ही भेज दिए हैं, तो तुरंत 1930 राष्ट्रीय साइबर हेल्पलाइन पर कॉल करें।'
      : 'If funds were already sent, call 1930 Cyber Crime Helpline immediately.'
  );

  const riskLevel =
    warningSigns.length >= 2
      ? 'HIGH_SCAM_RISK'
      : warningSigns.length === 1
      ? 'SUSPICIOUS'
      : 'UNKNOWN';

  const voiceSummary =
    language === 'hi'
      ? riskLevel === 'HIGH_SCAM_RISK'
        ? 'सावधान! इस संदेश में कई गंभीर लाल झंडे हैं जैसे व्यक्तिगत UPI और गैर-कानूनी गारंटीड रिटर्न। इसमें कभी पैसे न भेजें।'
        : riskLevel === 'SUSPICIOUS'
        ? 'इस संदेश में संदिग्ध संकेत मिले हैं। कोई भी कदम उठाने से पहले SEBI पोर्टल पर नाम अवश्य जांचें।'
        : 'संदेश में कोई आधिकारिक सरकारी पहचान सत्यापित नहीं हो सकी। कृपया पूरी सतर्कता बरतें।'
      : riskLevel === 'HIGH_SCAM_RISK'
      ? 'Warning! This message exhibits critical scam signatures including personal UPI routing and illegal guaranteed returns. Do not transfer funds.'
      : riskLevel === 'SUSPICIOUS'
      ? 'This message contains unverified claims. Please cross-check credentials on the SEBI portal before proceeding.'
      : 'Credentials could not be verified from the provided text alone. Proceed with utmost caution.';

  return {
    riskLevel,
    primaryScamPattern:
      warningSigns.length > 0
        ? language === 'hi'
          ? 'संदिग्ध वित्तीय धोखाधड़ी / अनधिकृत टिप समूह'
          : 'Suspicious Financial Fraud / Unauthorized Tip Scheme'
        : language === 'hi'
        ? 'अपुष्ट वित्तीय संदेश'
        : 'Unverified Financial Pitch',
    voiceSummary,
    verified:
      verified.length > 0
        ? verified
        : [
            language === 'hi'
              ? 'संदेश में कोई आधिकारिक सरकारी पहचान सत्यापित नहीं हो सकी।'
              : 'No official regulatory registration or corporate escrow verified.',
          ],
    warningSigns:
      warningSigns.length > 0
        ? warningSigns
        : [
            language === 'hi'
              ? 'संदेश में स्पष्ट रिटर्न या कानूनी जोखिम की जानकारी का अभाव।'
              : 'Lack of clear statutory risk disclosures or registered clearing house.',
          ],
    unknown:
      unknown.length > 0
        ? unknown
        : [
            language === 'hi'
              ? 'प्रेषक की वास्तविक पहचान और कंपनी का कॉर्पोरेट पता।'
              : 'Sender true legal identity and registered physical address.',
          ],
    userChecklist: checklist,
  };
}
