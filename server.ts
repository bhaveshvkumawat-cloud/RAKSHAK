import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(express.json({ limit: '10mb' }));

// AI Analyzer endpoint
app.post('/api/analyze-scam', async (req: Request, res: Response) => {
  try {
    const { text, language = 'hi' } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Text content is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // If API key is available, call Gemini 3.8 Flash
    if (apiKey) {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build',
            },
          },
        });

        const prompt = `You are "Rakshak" (रक्षक), an expert cyber financial fraud analyst specializing in Indian financial scams, stock market tip groups, unauthorized SEBI claims, illegal PMS schemes, fake IPO allotment schemes, and UPI fraud.
Analyze this message or content provided by a user:
"""
${text}
"""

Language of output: ${language === 'hi' ? 'Hindi (Devanagari, clear and accessible for common investors) with key financial terms explained' : 'English with natural clarity'}.

Analyze the text and return a structured JSON report with 3 distinct categories strictly adhering to honest truthfulness (never claim certainty on what cannot be verified):
1. verified: array of strings describing facts that can be objectively checked or confirmed from the text (e.g., format of SEBI number if present and whether format is valid/invalid, phone number country code, payment receiver domain, whether it is a personal UPI vs official clearing house).
2. warningSigns: array of strings highlighting red flags (e.g., guaranteed returns, artificial urgency/countdown, personal UPI VPA, request to install third-party APK, pump and dump, fake profit claims, demands for fee to release funds).
3. unknown: array of strings detailing what CANNOT be verified from this text alone and what the user must investigate themselves.
4. userChecklist: array of concrete actionable steps the user should check (e.g. check scores.sebi.gov.in, verify registered broker list on NSE/BSE).
5. riskLevel: 'HIGH_SCAM_RISK' | 'SUSPICIOUS' | 'POTENTIALLY_SAFE' | 'UNKNOWN'
6. voiceSummary: A short, clear 2-sentence voice readout ${language === 'hi' ? 'in conversational Hindi' : 'in conversational English'} explaining the bottom line warning.
7. primaryScamPattern: the detected scam category (e.g. "Fake WhatsApp VIP Stock Tip", "Task/Part-Time Job Ponzi", "Unregistered Portfolio Management", "Fake Institutional Pre-IPO Allotment").
`;

        const response = await ai.models.generateContent({
          model: 'gemini-3.8-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                riskLevel: { type: Type.STRING },
                primaryScamPattern: { type: Type.STRING },
                voiceSummary: { type: Type.STRING },
                verified: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                warningSigns: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                unknown: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
                userChecklist: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: [
                'riskLevel',
                'primaryScamPattern',
                'voiceSummary',
                'verified',
                'warningSigns',
                'unknown',
                'userChecklist',
              ],
            },
          },
        });

        const jsonText = response.text?.trim();
        if (jsonText) {
          const parsed = JSON.parse(jsonText);
          return res.json({ success: true, data: parsed, engine: 'gemini' });
        }
      } catch (geminiError) {
        console.warn('Gemini API call failed, falling back to local heuristic engine:', geminiError);
      }
    }

    // Heuristic Fallback Engine (Runs deterministically if no API key or network glitch)
    const lower = text.toLowerCase();
    const verified: string[] = [];
    const warningSigns: string[] = [];
    const unknown: string[] = [];
    const checklist: string[] = [];

    // Check UPI format
    const upiMatch = text.match(/[\w.-]+@[\w.-]+/gi);
    if (upiMatch) {
      const upi = upiMatch[0];
      verified.push(`पहचाना गया UPI हैंडल: ${upi}`);
      const personalHandles = ['okhdfcbank', 'okaxis', 'okicici', 'oksbi', 'ybl', 'ibl', 'axl', 'paytm'];
      const hasPersonal = personalHandles.some(h => upi.toLowerCase().includes(h));
      if (hasPersonal) {
        warningSigns.push(`व्यक्तिगत (Personal) UPI ID: SEBI अधिकृत स्टॉक ब्रोकर्स कभी भी व्यक्तिगत UPI (@ybl, @okhdfcbank आदि) पर पैसे नहीं लेते। वे केवल क्लीयरिंग कॉरपोरेशन / आधिकारिक पोर्टल से फंड स्वीकारते हैं।`);
      }
    } else {
      unknown.push(`संदेश में कोई प्रत्यक्ष UPI या बैंक खाता नंबर नहीं मिला।`);
    }

    // Check SEBI Reg format (INA..., INH..., INZ..., etc.)
    const sebiMatch = text.match(/(INA|INH|INZ|INB|INF|INP)[0-9]{8,10}/i);
    if (sebiMatch) {
      verified.push(`SEBI रजिस्ट्रेशन नंबर पैटर्न मिला: ${sebiMatch[0]} (नोट: जालसाज अक्सर दूसरों के असली रजिस्ट्रेशन नंबर चुराकर इस्तेमाल करते हैं)`);
      warningSigns.push(`SEBI रजिस्ट्रेशन नंबर की फोटो या टेक्स्ट दिखाने मात्र से भरोसा न करें। SEBI नियम के अनुसार पंजीकृत सलाहकार कभी निश्चित मुनाफे (Guaranteed Returns) का वादा नहीं कर सकते।`);
    } else if (lower.includes('sebi') || lower.includes('सेबी')) {
      warningSigns.push(`संदेश में SEBI का नाम लिया गया है लेकिन कोई वैध SEBI रजिस्ट्रेशन नंबर (उदा. INA00000000) नहीं दिया गया।`);
    } else {
      unknown.push(`यह सलाहकार या संस्था SEBI में पंजीकृत है या नहीं, यह स्वतंत्र रूप से SEBI पोर्टल पर जांचना होगा।`);
    }

    // Guaranteed returns check
    if (
      lower.includes('guarantee') ||
      lower.includes('गारंटी') ||
      lower.includes('100%') ||
      lower.includes('300%') ||
      lower.includes('double') ||
      lower.includes('निश्चित लाभ') ||
      lower.includes('sure shot') ||
      lower.includes('jackpot')
    ) {
      warningSigns.push(`'100% गारंटी' या 'अति-उच्च निश्चित मुनाफे' का दावा। भारतीय शेयर बाजार में किसी भी पंजीकृत व्यक्ति को गारंटीड रिटर्न का वादा करने की कानूनी अनुमति नहीं है।`);
    }

    // Urgency check
    if (
      lower.includes('urgent') ||
      lower.includes('last chance') ||
      lower.includes('seats left') ||
      lower.includes('जल्दी करें') ||
      lower.includes('केवल 10 मिनट') ||
      lower.includes('expires') ||
      lower.includes('offer ends')
    ) {
      warningSigns.push(`कृत्रिम तात्कालिकता (Artificial Urgency): 'सिर्फ 5 मिनट बचे हैं' या 'अंतिम मौका' कहकर सोचने और जांचने का समय छीना जा रहा है।`);
    }

    // Check third party APK / VIP links
    if (
      lower.includes('.apk') ||
      lower.includes('bit.ly') ||
      lower.includes('tinyurl') ||
      lower.includes('t.me') ||
      lower.includes('chat.whatsapp.com') ||
      lower.includes('vip group')
    ) {
      warningSigns.push(`असुरक्षित बाहरी लिंक / अनऑफिशियल APK डाउनलोड: प्ले स्टोर के बाहर से ट्रेडिंग ऐप या प्राइवेट ग्रुप लिंक इंस्टॉल कराने का प्रयास।`);
    }

    checklist.push('SEBI की आधिकारिक वेबसाइट (scores.sebi.gov.in) पर "Recognized Intermediaries" में नाम सर्च करें।');
    checklist.push('NSE/BSE की आधिकारिक सदस्य सूची में ब्रोकर का नाम सत्यापित करें।');
    checklist.push('कभी भी किसी व्यक्तिगत बैंक खाते या व्यक्तिगत UPI ID पर निवेश राशि न भेजें।');
    checklist.push('यदि पैसे पहले ही भेज दिए हैं, तो तुरंत 1930 राष्ट्रीय साइबर हेल्पलाइन पर कॉल करें।');

    const riskLevel = warningSigns.length >= 2 ? 'HIGH_SCAM_RISK' : warningSigns.length === 1 ? 'SUSPICIOUS' : 'UNKNOWN';

    return res.json({
      success: true,
      data: {
        riskLevel,
        primaryScamPattern: warningSigns.length > 0 ? 'संदिग्ध वित्तीय धोखाधड़ी / अनधिकृत टिप समूह' : 'अपुष्ट वित्तीय संदेश',
        voiceSummary: language === 'hi'
          ? (riskLevel === 'HIGH_SCAM_RISK'
              ? 'सावधान! इस संदेश में कई गंभीर लाल झंडे हैं जैसे व्यक्तिगत UPI और गैर-कानूनी गारंटीड रिटर्न। इसमें कभी पैसे न भेजें।'
              : 'इस संदेश में कुछ संदिग्ध संकेत हैं। कोई भी कदम उठाने से पहले SEBI पोर्टल पर नाम जरूर जांचें।')
          : (riskLevel === 'HIGH_SCAM_RISK'
              ? 'Warning! This message shows multiple high-risk scam indicators including personal UPI and illegal guaranteed returns. Do not transfer funds.'
              : 'This message contains unverified claims. Please check the SEBI intermediary list before proceeding.'),
        verified: verified.length > 0 ? verified : ['संदेश में कोई आधिकारिक सरकारी पहचान सत्यापित नहीं हो सकी।'],
        warningSigns: warningSigns.length > 0 ? warningSigns : ['संदेश में स्पष्ट रिटर्न या जोखिम की जानकारी का अभाव।'],
        unknown: unknown.length > 0 ? unknown : ['प्रेषक की वास्तविक पहचान और कंपनी का कॉर्पोरेट पता।'],
        userChecklist: checklist,
      },
      engine: 'heuristic',
    });
  } catch (err: any) {
    console.error('Scam analysis error:', err);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

// Mount Vite or serve static assets
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Rakshak server is listening on port ${PORT}`);
  });
}

startServer();
