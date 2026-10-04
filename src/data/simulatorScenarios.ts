import { SimulatorStep, DebriefPoint } from '../types';

export const SCENARIO_STEPS: Record<string, SimulatorStep> = {
  step_intro: {
    id: 'step_intro',
    titleEn: '1. The Unsolicited VIP Invitation',
    titleHi: '1. अचानक आया VIP इनविटेशन',
    messages: [
      {
        id: 'msg_1',
        sender: 'system',
        senderName: 'System',
        text: 'You were added to "📈 VIP Institutional Wealth Club (SEBI Approved)" by +91 98210 44921',
        textHi: 'आपको +91 98210 44921 द्वारा "📈 VIP Institutional Wealth Club (SEBI Approved)" में जोड़ा गया',
        time: '10:42 AM',
      },
      {
        id: 'msg_2',
        sender: 'analyst',
        senderName: 'Rahul Sharma (Chief SEBI Analyst)',
        senderRole: 'Admin',
        isVerified: true,
        text: '🔥 MEGA ALERT: Monday Institutional Pump Confirmed! FII block deal will push ABC Infotech from ₹42 to ₹210 (+400%). 100% Guaranteed Profit with ZERO Risk!',
        textHi: '🔥 बंपर सूचना: सोमवार को संस्थागत ब्लॉक डील से ABC Infotech ₹42 से सीधे ₹210 (+400%) जाएगा! 100% गारंटीड मुनाफा, शून्य जोखिम!',
        time: '10:43 AM',
      },
      {
        id: 'msg_3',
        sender: 'analyst',
        senderName: 'Rahul Sharma (Chief SEBI Analyst)',
        senderRole: 'Admin',
        isVerified: true,
        text: 'Look at today’s private client terminal gains. Over ₹4.8 Lakhs booked by our morning VIP members!',
        textHi: 'आज सुबह के हमारे प्राइवेट VIP मेंबर्स के खाते देखें। 4.8 लाख रुपये से ज्यादा का मुनाफा बुक किया गया!',
        time: '10:43 AM',
        image: '/src/assets/images/fake_profit_screenshot_1791095556625.jpg',
      },
      {
        id: 'msg_4',
        sender: 'member1',
        senderName: 'Vikram Joshi (Mumbai)',
        text: 'Sir kal maine ₹50,000 lagaya tha, aaj subah ₹2,10,000 mere account me aa gaya! You are god sir! 🙏🙏',
        textHi: 'सर कल मैंने ₹50,000 लगाया था, आज सुबह ₹2,10,000 मेरे खाते में क्रेडिट हो गया! आप भगवान हैं सर! 🙏🙏',
        time: '10:44 AM',
      },
      {
        id: 'msg_2b',
        sender: 'member2',
        senderName: 'Ananya Roy (Bengaluru)',
        text: 'Confirm allotment letter received! Sharma sir is genuinely registered with SEBI.',
        textHi: 'मुझे अलॉटमेंट लेटर मिल गया! शर्मा सर वाकई सेबी से मान्यता प्राप्त हैं।',
        time: '10:44 AM',
      },
    ],
    narratorEn:
      'Listen closely. This is how 95% of WhatsApp stock scams start: a stranger adds you without permission, promises impossible 400% guaranteed returns, and plants fake group members to establish trust.',
    narratorHi:
      'ध्यान से सुनिए। 95% स्टॉक घोटाले ऐसे ही शुरू होते हैं: बिना अनुमति आपको ग्रुप में जोड़ा गया, 400% गारंटीड मुनाफे का लालच दिया गया, और झूठे बॉट मेंबर्स से तारीफ कराई जा रही है।',
    choices: [
      {
        id: 'c_pay_interest',
        textEn: '“I want to join! How do I get this allotment?”',
        textHi: '“मुझे भी अलॉटमेंट चाहिए! मैं कैसे पैसे लगाऊं?”',
        narratorEn: 'You showed interest. Watch how the scammer immediately ramps up pressure.',
        narratorHi: 'आपने रुचि दिखाई। अब देखिए जालसाज कैसे तुरंत आप पर दबाव बनाना शुरू करता है।',
        nextStepId: 'step_urgency',
        isSafeChoice: false,
      },
      {
        id: 'c_ask_sebi',
        textEn: '“What is your official SEBI Registration number & broker clearing account?”',
        textHi: '“आपका आधिकारिक SEBI रजिस्ट्रेशन नंबर और रजिस्टर्ड ब्रोकर क्लीयरिंग खाता क्या है?”',
        narratorEn: 'You asked for official credentials. Notice how the group reacts defensively.',
        narratorHi: 'आपने आधिकारिक सेबी नंबर पूछा। देखिए कैसे गिरोह बचाव की मुद्रा में आकर दबाव डालता है।',
        nextStepId: 'step_defensive',
        isSafeChoice: true,
      },
    ],
  },

  step_urgency: {
    id: 'step_urgency',
    titleEn: '2. The 5-Minute Timer & Personal UPI Trap',
    titleHi: '2. 5 मिनट का टाइमर और पर्सनल UPI का जाल',
    messages: [
      {
        id: 'msg_u1',
        sender: 'analyst',
        senderName: 'Rahul Sharma (Chief SEBI Analyst)',
        senderRole: 'Admin',
        isVerified: true,
        text: '🚨 ONLY 4 SLOTS REMAINING! Institutional window closes in 5 MINUTES sharp! Deposit ₹5,000 security margin right now to reserve 1,000 shares.',
        textHi: '🚨 केवल 4 स्लॉट बचे हैं! संस्थागत कोटा ठीक 5 मिनट में बंद हो रहा है! 1,000 शेयर आरक्षित करने के लिए अभी ₹5,000 ट्रांसफर करें।',
        time: '10:45 AM',
        reaction: '⏳ 23',
      },
      {
        id: 'msg_u_voice',
        sender: 'analyst',
        senderName: 'Rahul Sharma (Chief SEBI Analyst)',
        senderRole: 'Admin',
        isVerified: true,
        isVoiceNote: true,
        voiceNoteDuration: '0:14',
        text: '🎙️ [WhatsApp Voice Note]: "Sir, listen carefully! Institutional allotment closes in exactly 4 minutes. Transfer ₹5,000 right now to Chief Desk UPI!"',
        textHi: '🎙️ [व्हाट्सएप वॉइस नोट]: "सर, ध्यान से सुनिए! संस्थागत कोटा ठीक 4 मिनट में बंद हो रहा है। तुरंत ₹5,000 चीफ डेस्क UPI पर भेजें ताकि स्लॉट न छूटे!"',
        audioScript: 'Sir, listen carefully! Institutional allotment closes in exactly 4 minutes. Transfer 5000 rupees right now to Chief Desk UPI!',
        audioScriptHi: 'सर ध्यान से सुनिए! संस्थागत कोटा ठीक चार मिनट में बंद हो रहा है। तुरंत पांच हजार रुपये चीफ डेस्क यूपीआई पर भेजें ताकि स्लॉट न छूटे!',
        time: '10:45 AM',
        reaction: '⚡ 19',
      },
      {
        id: 'msg_u2',
        sender: 'analyst',
        senderName: 'Rahul Sharma (Chief SEBI Analyst)',
        senderRole: 'Admin',
        isVerified: true,
        text: 'Pay via PhonePe / GPay / Paytm directly to Chief Desk UPI: \n👉 wealth.rahul99@okaxis\nSend screenshot immediately to lock slot!',
        textHi: 'PhonePe / GPay / Paytm से सीधे चीफ डेस्क UPI पर भेजें: \n👉 wealth.rahul99@okaxis\nतुरंत स्क्रीनशॉट भेजें ताकि स्लॉट लॉक हो सके!',
        time: '10:45 AM',
        reaction: '💸 12',
      },
      {
        id: 'msg_u3',
        sender: 'member3',
        senderName: 'Sanjay Deshmukh',
        text: 'Done sir! Sent ₹10,000 from GPay just now. Please confirm my VIP slot 🙏',
        textHi: 'सर डन! मैंने अभी GPay से ₹10,000 भेज दिए। कृपया मेरा VIP स्लॉट कन्फर्म करें 🙏',
        time: '10:46 AM',
        reaction: '🙏 9',
      },
    ],
    narratorEn:
      'STOP! Here are the two biggest red flags in Indian cyber fraud: 1. Artificial 5-minute countdown so your brain enters panic mode. 2. A personal UPI handle (@okaxis). Real SEBI brokers NEVER accept client funds via personal UPI IDs!',
    narratorHi:
      'रुकिए! यहाँ भारतीय साइबर फ्रॉड के दो सबसे खतरनाक संकेत हैं: 1. पाँच मिनट का झूठा काउंटडाउन ताकि आप बिना सोचे निर्णय लें। 2. व्यक्तिगत UPI आईडी (@okaxis)। सेबी अधिकृत ब्रोकर्स कभी पर्सनल UPI पर पैसे नहीं लेते!',
    choices: [
      {
        id: 'c_send_money',
        textEn: 'Transfer ₹5,000 UPI immediately (FOMO Panic)',
        textHi: 'घबराकर तुरंत ₹5,000 UPI पर ट्रांसफर कर दें',
        narratorEn: 'You transferred real money to a stranger’s personal UPI. Now watch the trap snap shut.',
        narratorHi: 'आपने एक अनजान व्यक्ति के पर्सनल UPI पर पैसे भेज दिए। अब देखिए असली शिकंजा कैसे कसता है।',
        nextStepId: 'step_trap_sprung',
        isSafeChoice: false,
        trapExposed: 'Personal UPI Transfer Trap',
      },
      {
        id: 'c_question_personal_upi',
        textEn: '“Why a personal UPI handle instead of an NSE/BSE clearing account?”',
        textHi: '“पर्सनल UPI पर क्यों? NSE या BSE के अधिकृत क्लीयरिंग खाते में क्यों नहीं?”',
        narratorEn: 'You challenged the personal payment method. Scammers hate when you notice this.',
        narratorHi: 'आपने पर्सनल UPI पर सवाल उठाया। जालसाज इस सवाल से सबसे ज्यादा डरते हैं।',
        nextStepId: 'step_defensive',
        isSafeChoice: true,
      },
      {
        id: 'c_exit_safe',
        textEn: '“This is a scam. I am exiting and calling 1930 Cyber Helpline.”',
        textHi: '“यह सरासर धोखाधड़ी है। मैं ग्रुप छोड़ रहा हूँ और 1930 पर रिपोर्ट करूंगा।”',
        narratorEn: 'Excellent instinct! You recognized the personal UPI red flag and protected your savings.',
        narratorHi: 'शानदार फैसला! आपने पर्सनल UPI का लाल झंडा पहचाना और अपनी मेहनत की कमाई बचा ली।',
        nextStepId: 'step_safe_exit',
        isSafeChoice: true,
      },
    ],
  },

  step_defensive: {
    id: 'step_defensive',
    titleEn: '3. Fake Certificate & Toxic Group Shaming',
    titleHi: '3. फर्जी सर्टिफिकेट और ग्रुप द्वारा मानसिक दबाव',
    messages: [
      {
        id: 'msg_d1',
        sender: 'analyst',
        senderName: 'Rahul Sharma (Chief SEBI Analyst)',
        senderRole: 'Admin',
        isVerified: true,
        text: 'Look mister! We are authorized institutional desk. This UPI is dedicated nodal desk for quick batch allocation. If you don’t trust our SEBI Reg INA00092144, leave the group! Serious investors are waiting.',
        textHi: 'देखिए जनाब! हम अधिकृत संस्थागत डेस्क हैं। यह UPI त्वरित आवंटन के लिए नोडल डेस्क है। यदि आपको हमारे सेबी नंबर INA00092144 पर भरोसा नहीं है, तो ग्रुप छोड़ दें! गंभीर निवेशक लाइन में हैं।',
        time: '10:47 AM',
      },
      {
        id: 'msg_d2',
        sender: 'member1',
        senderName: 'Vikram Joshi (Mumbai)',
        text: 'Bhai doubt mat karo, 400% profit miss ho jayega. Sharma sir has 15 years experience!',
        textHi: 'भाई शक मत करो, 400% मुनाफा हाथ से निकल जाएगा। शर्मा सर का 15 साल का तजुर्बा है!',
        time: '10:47 AM',
      },
      {
        id: 'msg_d3',
        sender: 'member2',
        senderName: 'Ananya Roy (Bengaluru)',
        text: 'Admin sir please remove negative people who waste time. We want to trade.',
        textHi: 'एडमिन सर ऐसे निगेटिव लोगों को बाहर निकालिए जो समय बर्बाद करते हैं। हमें ट्रेड करना है।',
        time: '10:48 AM',
      },
    ],
    narratorEn:
      'Notice the psychological tactic: "Social Proof Shaming". Other group members (who are actually accomplice accounts or bots) gang up on you to make you feel stupid for being cautious.',
    narratorHi:
      'इस मनोवैज्ञानिक चाल को पहचानें: "सोशल शेमिंग"। ग्रुप के बाकी सदस्य (जो जालसाज के ही साथी या बॉट हैं) आप पर मिलकर दबाव बनाते हैं ताकि आप सवाल पूछना बंद कर दें।',
    choices: [
      {
        id: 'c_give_in',
        textEn: 'Feel pressured and pay ₹5,000 to not look foolish',
        textHi: 'दबाव में आकर ₹5,000 भेज दें ताकि मौका न छूटे',
        narratorEn: 'Peer pressure won. The scammer trapped you.',
        narratorHi: 'दबाव जीत गया। आप जालसाज के चंगुल में फंस गए।',
        nextStepId: 'step_trap_sprung',
        isSafeChoice: false,
      },
      {
        id: 'c_check_scores',
        textEn: '“I am checking INA00092144 right now on scores.sebi.gov.in.”',
        textHi: '“मैं अभी scores.sebi.gov.in पर जाकर INA00092144 की जांच कर रहा हूँ।”',
        narratorEn: 'You invoked the official SEBI SCORES portal. Watch what the scammer does next!',
        narratorHi: 'आपने सेबी स्कोर्स पोर्टल की बात कही। देखिए जालसाज अब क्या करता है!',
        nextStepId: 'step_analyst_bans',
        isSafeChoice: true,
      },
    ],
  },

  step_trap_sprung: {
    id: 'step_trap_sprung',
    titleEn: '4. The Advance Fee / Sunk Cost Extortion',
    titleHi: '4. मुनाफे का झांसा और अतिरिक्त पैसों की जबरन वसूली',
    messages: [
      {
        id: 'msg_t1',
        sender: 'analyst',
        senderName: 'Rahul Sharma (Chief SEBI Analyst)',
        senderRole: 'Admin',
        isVerified: true,
        text: '🎉 CONGRATULATIONS! Your ₹5,000 allocation in ABC Infotech hit upper circuit! Your virtual portfolio is now worth ₹84,200!',
        textHi: '🎉 बधाई हो! ABC Infotech में आपका ₹5,000 अपर सर्किट लगा चुका है! आपका वर्चुअल बैलेंस अब ₹84,200 हो गया है!',
        time: '11:15 AM',
      },
      {
        id: 'msg_t2',
        sender: 'user',
        senderName: 'You',
        text: 'Great! Please credit ₹84,200 to my bank account.',
        textHi: 'बहुत बढ़िया! कृपया ₹84,200 मेरे बैंक खाते में ट्रांसफर कर दें।',
        time: '11:16 AM',
      },
      {
        id: 'msg_t3',
        sender: 'analyst',
        senderName: 'Rahul Sharma (Chief SEBI Analyst)',
        senderRole: 'Admin',
        isVerified: true,
        text: '⚠️ WITHDRAWAL NOTICE: Under Income Tax Section 194S, you must deposit 18% GST & Security Clearance fee of ₹15,156 before withdrawal. Deposit to clearance UPI: tax.nodal@paytm. Profit cannot be deducted directly due to SEBI audit.',
        textHi: '⚠️ निकासी सूचना: आयकर धारा के तहत निकासी से पहले आपको 18% GST और क्लीयरेंस शुल्क ₹15,156 जमा करना होगा। मुनाफे में से टैक्स काटना नियमों के विरुद्ध है। इसे clearance UPI: tax.nodal@paytm पर भेजें।',
        time: '11:17 AM',
      },
      {
        id: 'msg_t4',
        sender: 'analyst',
        senderName: 'Rahul Sharma (Chief SEBI Analyst)',
        senderRole: 'Admin',
        isVerified: true,
        text: 'If not paid within 1 hour, your account will be reported for money laundering and your funds will be frozen permanently.',
        textHi: 'यदि 1 घंटे में टैक्स जमा नहीं किया, तो आपका खाता मनी लॉन्ड्रिंग में फ्रीज कर दिया जाएगा।',
        time: '11:18 AM',
      },
    ],
    narratorEn:
      'This is the Sunk Cost Extortion Trap. There was NEVER any real stock or profit—just numbers typed on a screen. If you pay ₹15,000, they will demand ₹40,000 for "anti-terror clearance". You will never see a single rupee.',
    narratorHi:
      'यह "संकेत लागत जाल" (Sunk Cost Trap) है। न कोई शेयर खरीदा गया था, न कोई मुनाफा हुआ—स्क्रीन पर केवल झूठे अंक लिखे हैं। यदि आप ₹15,000 देंगे, तो वे ₹40,000 और मांगेंगे! कभी एक रुपया वापस नहीं मिलेगा।',
    choices: [
      {
        id: 'c_finish_to_debrief',
        textEn: '“I realize this is 100% fraud. Show me the full Debrief!”',
        textHi: '“मैं समझ गया कि यह पूरी तरह फ्रॉड है। मुझे पूरा विश्लेषण (Debrief) दिखाएं!”',
        narratorEn: 'Let’s analyze every single psychological trick they used against you.',
        narratorHi: 'आइए अब एक-एक करके उन सभी मनोवैज्ञानिक चालों का विश्लेषण करें जो आपके खिलाफ इस्तेमाल की गईं।',
        nextStepId: 'step_debrief',
        isSafeChoice: true,
      },
    ],
  },

  step_analyst_bans: {
    id: 'step_analyst_bans',
    titleEn: '4. The Scammer Panics & Blocks You',
    titleHi: '4. पोल खुलते ही जालसाज ने आपको ब्लॉक कर दिया',
    messages: [
      {
        id: 'msg_b1',
        sender: 'analyst',
        senderName: 'Rahul Sharma (Chief SEBI Analyst)',
        senderRole: 'Admin',
        isVerified: true,
        text: 'You are spreading FUD and disrespecting the management. Removed.',
        textHi: 'आप ग्रुप में नकारात्मकता फैला रहे हैं और नियम तोड़ रहे हैं। आपको निकाला जाता है।',
        time: '10:49 AM',
      },
      {
        id: 'msg_b2',
        sender: 'system',
        senderName: 'System',
        text: 'You were removed from this group by the admin.',
        textHi: 'एडमिन द्वारा आपको इस ग्रुप से निकाल दिया गया है।',
        time: '10:49 AM',
      },
    ],
    narratorEn:
      'Victory! Real advisors welcome SEBI verification. Scammers instantly ban anyone who mentions SCORES or official registry because it exposes their whole syndicate to other victims in the group.',
    narratorHi:
      'शानदार जीत! असली सलाहकार कभी सत्यापन से नहीं डरते। जालसाज तुरंत ऐसे व्यक्ति को ग्रुप से बाहर कर देते हैं जो सेबी स्कोर्स या जांच की बात करे, क्योंकि इससे बाकी शिकारों के सामने उनका पर्दाफाश हो जाता।',
    choices: [
      {
        id: 'c_finish_to_debrief_safe',
        textEn: 'See Detailed Scam Anatomy & Debrief',
        textHi: 'घोटाले की पूरी संरचना और विश्लेषण (Debrief) देखें',
        narratorEn: 'Review the 5 lethal mechanisms used in this rehearsal.',
        narratorHi: 'इस रिहर्सल में इस्तेमाल किए गए 5 घातक हथियारों का विश्लेषण देखें।',
        nextStepId: 'step_debrief',
        isSafeChoice: true,
      },
    ],
  },

  step_safe_exit: {
    id: 'step_safe_exit',
    titleEn: '4. Safe Evasion & Cyber Report',
    titleHi: '4. सुरक्षित बचाव और साइबर रिपोर्ट',
    messages: [
      {
        id: 'msg_s1',
        sender: 'user',
        senderName: 'You',
        text: 'Reported this group and UPI ID wealth.rahul99@okaxis to National Cyber Crime Portal (1930).',
        textHi: 'इस ग्रुप और UPI ID wealth.rahul99@okaxis की शिकायत राष्ट्रीय साइबर पोर्टल (1930) पर दर्ज कर दी है।',
        time: '10:48 AM',
      },
      {
        id: 'msg_s2',
        sender: 'system',
        senderName: 'System',
        text: 'You left the group.',
        textHi: 'आप ग्रुप से बाहर निकल गए।',
        time: '10:48 AM',
      },
    ],
    narratorEn:
      'You survived the simulation with zero real loss! By recognizing the personal UPI and urgency traps, you saved yourself thousands of rupees. Now let’s view your Debrief score.',
    narratorHi:
      'बधाई हो! आपने बिना एक भी रुपया गंवाए इस घोटाले को मात दे दी। पर्सनल UPI और झूठी जल्दीबाजी को पहचानकर आपने खुद को बड़े नुकसान से बचा लिया। आइए अपना डीब्रीफ देखें।',
    choices: [
      {
        id: 'c_debrief_from_exit',
        textEn: 'View Simulator Debrief & Red Flag Breakdown',
        textHi: 'सिम्युलेटर डीब्रीफ और लाल झंडों का विश्लेषण देखें',
        narratorEn: 'Here is your debrief breakdown.',
        narratorHi: 'यह रहा आपका विस्तृत डीब्रीफ विश्लेषण।',
        nextStepId: 'step_debrief',
        isSafeChoice: true,
      },
    ],
  },

  step_debrief: {
    id: 'step_debrief',
    titleEn: 'Mission Debrief: The 5 Weapons Used On You',
    titleHi: 'मिशन डीब्रीफ: आपके खिलाफ इस्तेमाल किए गए 5 हथियार',
    messages: [],
    narratorEn:
      'Here is the complete forensic debrief of the WhatsApp investment scam. Notice how each psychological lever was deliberately engineered to shut down your critical thinking.',
    narratorHi:
      'यह रहा व्हाट्सएप निवेश घोटाले का पूर्ण फॉरेंसिक विश्लेषण। ध्यान से देखें कि कैसे हर मनोवैज्ञानिक चाल आपकी सोचने-समझने की क्षमता को बंद करने के लिए बनाई गई थी।',
    isEnd: true,
  },
};

export const DEBRIEF_POINTS: DebriefPoint[] = [
  {
    id: 'dp_1',
    tagEn: 'Psychological Weapon #1',
    tagHi: 'मनोवैज्ञानिक हथियार #1',
    titleEn: 'Social Proof Illusion (The Shill Army)',
    titleHi: 'सामाजिक प्रमाण का भ्रम (बॉट और साथी सदस्य)',
    explanationEn:
      'Scammers use fake accounts ("Vikram Joshi", "Ananya") who post fabricated bank credit screenshots praising the analyst. This exploits your herd instinct.',
    explanationHi:
      'जालसाज फर्जी प्रोफाइल बनाकर खुद ही कमेंट करते हैं कि "मुझे ₹2 लाख मिल गए!"। यह आपके मन में भरोसा पैदा करने की सोची-समझी चाल है।',
    realityEn: 'None of those group members are real investors. They are all controlled by the same cyber syndicate.',
    realityHi: 'ग्रुप में कोई भी असली निवेशक नहीं है। वे सब एक ही साइबर गिरोह के फोन या बॉट हैं।',
  },
  {
    id: 'dp_2',
    tagEn: 'Psychological Weapon #2',
    tagHi: 'मनोवैज्ञानिक हथियार #2',
    titleEn: 'Authority Camouflage (Fake SEBI Badges)',
    titleHi: 'फर्जी प्राधिकार का मुखौटा (SEBI का झूठा इस्तेमाल)',
    explanationEn:
      'Scammers steal real registration numbers of innocent SEBI analysts from public websites or photoshop fake certificates.',
    explanationHi:
      'जालसाज सेबी की वेबसाइट से किसी निर्दोष पंजीकृत सलाहकार का नंबर चुराकर अपनी प्रोफाइल में चिपका देते हैं या फर्जी सर्टिफिकेट बनाते हैं।',
    realityEn: 'SEBI strictly prohibits any registered advisor from promising guaranteed returns or holding client funds.',
    realityHi: 'सेबी का सख्त नियम है: कोई भी पंजीकृत व्यक्ति न तो गारंटीड रिटर्न का वादा कर सकता है और न ही निजी खाते में पैसे ले सकता है।',
  },
  {
    id: 'dp_3',
    tagEn: 'Psychological Weapon #3',
    tagHi: 'मनोवैज्ञानिक हथियार #3',
    titleEn: 'Artificial Scarcity & Countdown Panic',
    titleHi: 'कृत्रिम तात्कालिकता (5 मिनट का झूठा डर)',
    explanationEn:
      '“Only 4 slots left! Closing in 5 minutes!” This artificial timer triggers FOMO (Fear of Missing Out) and stops you from consulting family or checking SEBI portals.',
    explanationHi:
      '“केवल 4 सीट बाकी हैं! 5 मिनट में बंद हो जाएगा!” यह उल्टी गिनती आपके सोचने और परिवार या विशेषज्ञों से सलाह लेने का समय छीनने के लिए की जाती है।',
    realityEn: 'Legitimate institutional allotments never happen over a 5-minute WhatsApp deadline.',
    realityHi: 'शेयर बाजार में कोई भी वैध संस्थागत अलॉटमेंट 5 मिनट के व्हाट्सएप मैसेज पर नहीं होता।',
  },
  {
    id: 'dp_4',
    tagEn: 'Psychological Weapon #4',
    tagHi: 'मनोवैज्ञानिक हथियार #4',
    titleEn: 'Personal UPI Mule Account Routing',
    titleHi: 'निजी UPI और म्यूल बैंक खातों का खेल',
    explanationEn:
      'The payment went to a personal VPA (`wealth.rahul99@okaxis`) instead of an official clearing house (NSE/BSE/ICCL).',
    explanationHi:
      'पैसे किसी आधिकारिक स्टॉक एक्सचेंज क्लीयरिंग खाते में नहीं बल्कि एक व्यक्तिगत UPI आईडी (@okaxis, @ybl) पर मंगाए गए।',
    realityEn: 'These UPIs belong to "mule accounts"—poor or unsuspecting people whose bank accounts were rented by scammers.',
    realityHi: 'ये तथाकथित "म्यूल अकाउंट" होते हैं जिन्हें जालसाज किराए पर लेते हैं ताकि पुलिस की पकड़ से बच सकें।',
  },
  {
    id: 'dp_5',
    tagEn: 'Psychological Weapon #5',
    tagHi: 'मनोवैज्ञानिक हथियार #5',
    titleEn: 'The Sunk Cost Extortion (Advance Fee Trap)',
    titleHi: 'संकेत लागत ब्लैकमेल (निकासी के लिए टैक्स का झांसा)',
    explanationEn:
      'Once they have your first ₹5,000, they show fake astronomical gains and demand ₹15,000 more as "TDS / Regulatory Margin". Victims keep paying to avoid losing what they already put in.',
    explanationHi:
      'जब आप पहली बार ₹5,000 दे देते हैं, तो स्क्रीन पर नकली लाखों का मुनाफा दिखाकर वे "टैक्स या क्लीयरेंस" के नाम पर ₹15,000 और मांगते हैं।',
    realityEn: 'Any request to pay an upfront fee to withdraw your own profits is 100% a scam. Legitimate brokers deduct TDS automatically.',
    realityHi: 'अपने ही पैसे निकालने के लिए अलग से अग्रिम फीस या टैक्स मांगना 100% धोखाधड़ी है। वैध ब्रोकर्स टैक्स सीधे काटते हैं।',
  },
];
