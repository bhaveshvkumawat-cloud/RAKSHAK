import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    questionEn: 'A SEBI-registered advisor in a WhatsApp group asks you to transfer ₹5,000 via Google Pay to an ID ending in "@okaxis" to lock a pre-IPO allotment. What is the truth?',
    questionHi: 'व्हाट्सएप ग्रुप में एक सेबी-पंजीकृत सलाहकार प्री-IPO अलॉटमेंट के लिए "@okaxis" वाली UPI ID पर ₹5,000 भेजने को कहता है। सच क्या है?',
    optionsEn: [
      'It is safe because the advisor has a SEBI registration badge.',
      'It is 100% scam. SEBI brokers NEVER collect client funds via personal UPI IDs.',
      'It is safe if they promise 100% money-back guarantee.',
      'It is safe for amounts under ₹10,000.',
    ],
    optionsHi: [
      'यह सुरक्षित है क्योंकि सलाहकार के पास सेबी रजिस्ट्रेशन का बैज है।',
      'यह 100% फ्रॉड है। सेबी अधिकृत ब्रोकर्स कभी भी पर्सनल UPI ID पर पैसे नहीं लेते।',
      'यदि वे 100% मनी-बैक गारंटी दे रहे हैं तो यह सुरक्षित है।',
      '₹10,000 से कम की राशि के लिए यह सुरक्षित है।',
    ],
    correctIndex: 1,
    explanationEn: 'Under SEBI rules, all investment transfers must flow through recognized clearing corporations (ICCL/NSCCL) or registered corporate broker accounts, NEVER personal UPI IDs.',
    explanationHi: 'सेबी के कड़े नियमों के अनुसार, सभी निवेश केवल मान्यता प्राप्त क्लीयरिंग कॉरपोरेशन या अधिकृत कॉर्पोरेट खाते से होने चाहिए, किसी व्यक्ति के पर्सनल UPI पर कभी नहीं।',
  },
  {
    id: 'q2',
    questionEn: 'A trading group promises: "Guaranteed 350% return in 5 days with zero market risk." What does Indian financial regulation say?',
    questionHi: 'एक ट्रेडिंग ग्रुप वादा करता है: "5 दिनों में 350% निश्चित मुनाफा, बाजार का कोई जोखिम नहीं।" भारतीय वित्तीय नियम क्या कहते हैं?',
    optionsEn: [
      'High-tier institutional advisors are legally permitted to guarantee returns.',
      'Guaranteed return promises in stock markets are ILLEGAL under SEBI regulations.',
      'It is legal if they have an active Telegram channel.',
      'It is legal for intraday future and options calls.',
    ],
    optionsHi: [
      'बड़े संस्थागत सलाहकारों को कानूनी रूप से गारंटी देने की अनुमति है।',
      'शेयर बाजार में किसी भी प्रकार के "गारंटीड मुनाफे" का वादा करना सेबी नियमों के तहत गैर-कानूनी है।',
      'यदि उनका टेलीग्राम चैनल एक्टिव है तो यह कानूनी है।',
      'इंट्राडे फ्यूचर्स और ऑप्शंस के लिए यह वैध है।',
    ],
    correctIndex: 1,
    explanationEn: 'No SEBI-registered entity is allowed to offer guaranteed returns. Any guarantee of risk-free stock profit is an immediate signature of a criminal scam.',
    explanationHi: 'सेबी पंजीकृत किसी भी व्यक्ति या संस्था को गारंटीड रिटर्न का वादा करने की अनुमति नहीं है। जहां "गारंटीड मुनाफा" लिखा हो, वह पक्का घोटाला है।',
  },
  {
    id: 'q3',
    questionEn: 'You invested ₹10,000 on a trading website. The screen shows you made ₹1,20,000 profit, but the manager says you must first pay ₹22,000 "GST and clearance fee" to withdraw. What should you do?',
    questionHi: 'आपने एक ट्रेडिंग वेबसाइट पर ₹10,000 लगाए। स्क्रीन पर ₹1,20,000 का मुनाफा दिख रहा है, लेकिन मैनेजर का कहना है कि निकासी के लिए पहले ₹22,000 "GST और क्लीयरेंस फीस" जमा करनी होगी। आपको क्या करना चाहिए?',
    optionsEn: [
      'Pay the ₹22,000 fee quickly so you get the ₹1,20,000 profit.',
      'Negotiate to pay half of the fee now and half later.',
      'Do NOT pay a single rupee. It is an Advance-Fee extortion scam; the profit on screen is fake.',
      'Pay via credit card for buyer protection.',
    ],
    optionsHi: [
      'तुरंत ₹22,000 फीस जमा कर दें ताकि ₹1,20,000 का मुनाफा मिल सके।',
      'मैनेजर से बात करके आधी फीस अभी और आधी बाद में देने को कहें।',
      'एक भी रुपया न दें। यह जबरन वसूली (Advance Fee Trap) है; स्क्रीन पर दिख रहा मुनाफा पूरी तरह फर्जी है।',
      'क्रेडिट कार्ड से भुगतान कर दें ताकि सुरक्षा मिल सके।',
    ],
    correctIndex: 2,
    explanationEn: 'Legitimate brokers deduct taxes (STT/TDS) automatically from profits. Never pay money to withdraw your money—it is the Sunk Cost Extortion trap.',
    explanationHi: 'वैध स्टॉक ब्रोकर्स कभी निकासी के लिए अलग से फीस या टैक्स नहीं मांगते। स्क्रीन पर दिख रहा बैलेंस नकली है और आगे पैसे देना बड़ा नुकसान कराएगा।',
  },
  {
    id: 'q4',
    questionEn: 'A caller says they are from your bank and asks you to share an OTP to stop a suspicious payment. What should you do?',
    questionHi: 'एक कॉलर बैंक से होने का दावा करके संदिग्ध भुगतान रोकने के लिए OTP मांगता है। आपको क्या करना चाहिए?',
    optionsEn: [
      'Share the OTP if the caller knows your name.',
      'Never share the OTP; end the call and contact your bank using its official number.',
      'Share only the first few digits.',
      'Send the OTP over chat instead.',
    ],
    optionsHi: [
      'यदि कॉलर आपका नाम जानता है तो OTP बता दें।',
      'OTP कभी साझा न करें; कॉल काटें और बैंक के आधिकारिक नंबर पर संपर्क करें।',
      'केवल शुरुआती अंक साझा करें।',
      'OTP को चैट पर भेज दें।',
    ],
    correctIndex: 1,
    explanationEn: 'Banks do not need your OTP, PIN, or password to block fraud. Contact the bank through a number from its official website, app, or card.',
    explanationHi: 'धोखाधड़ी रोकने के लिए बैंक को आपका OTP, PIN या पासवर्ड नहीं चाहिए। बैंक की आधिकारिक वेबसाइट, ऐप या कार्ड पर दिए नंबर से संपर्क करें।',
  },
  {
    id: 'q5',
    questionEn: 'You notice an unauthorized debit from your account. What is the safest immediate action?',
    questionHi: 'आपके खाते से अनधिकृत पैसे कटे हैं। सबसे सुरक्षित तत्काल कदम क्या है?',
    optionsEn: [
      'Wait a few days to see if the money returns.',
      'Pay a recovery agent an advance fee.',
      'Contact your bank immediately and report the cyber fraud at 1930.',
      'Delete the transaction message.',
    ],
    optionsHi: [
      'पैसे वापस आते हैं या नहीं, यह देखने के लिए कुछ दिन प्रतीक्षा करें।',
      'रिकवरी एजेंट को अग्रिम शुल्क दें।',
      'तुरंत बैंक से संपर्क करें और 1930 पर साइबर धोखाधड़ी की रिपोर्ट करें।',
      'लेन-देन का संदेश हटा दें।',
    ],
    correctIndex: 2,
    explanationEn: 'Act quickly: notify your bank and report the incident to India’s cybercrime helpline at 1930. Preserve transaction details and evidence.',
    explanationHi: 'तुरंत कार्रवाई करें: बैंक को सूचित करें और 1930 पर शिकायत करें। लेन-देन का विवरण और साक्ष्य सुरक्षित रखें।',
  },
];

export const IMPACT_COHORT_STUDY = {
  totalParticipants: 15,
  cohortDescriptionEn: 'Tested on 15 Indian retail investors aged 24-58 across tier-1 and tier-2 cities (Jaipur, Indore, Lucknow, Pune, Delhi NCR).',
  cohortDescriptionHi: 'टियर-1 और टियर-2 शहरों (जयपुर, इंदौर, लखनऊ, पुणे, दिल्ली एनसीआर) के 15 खुदरा निवेशकों (उम्र 24-58) पर परीक्षण किया गया।',
  preAverageScore: 33.3, // 1.0 out of 3
  postAverageScore: 93.3, // 2.8 out of 3
  improvementDelta: '+180%',
  metrics: [
    {
      metricEn: 'Recognized Personal UPI as Scam',
      metricHi: 'निजी UPI को फ्रॉड के रूप में पहचाना',
      pre: 27,
      post: 100,
    },
    {
      metricEn: 'Spotted Illegal "Guaranteed Return" Claim',
      metricHi: 'अवैध "गारंटीड मुनाफे" के दावे को पकड़ा',
      pre: 40,
      post: 93,
    },
    {
      metricEn: 'Refused to Pay Fake "Withdrawal Tax"',
      metricHi: 'फर्जी "निकासी टैक्स" देने से साफ इनकार किया',
      pre: 33,
      post: 87,
    },
  ],
};
