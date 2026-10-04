import { Language } from '../types';

export interface LocalizedAudioScript {
  nativeText: string;
  phoneticSpeech: string; // Used when browser lacks regional TTS engine
  bcp47: string;
  nativeTitle: string;
}

// 8 Indian Languages with high fidelity fraud prevention scripts
export const SIMULATOR_AUDIO_SCRIPTS: Record<
  string,
  Record<Language, { narrator: string; phonetic: string; voiceNote?: string; voiceNotePhonetic?: string }>
> = {
  step_intro: {
    hi: {
      narrator: 'ध्यान से सुनिए। 95% स्टॉक घोटाले ऐसे ही शुरू होते हैं: बिना अनुमति आपको ग्रुप में जोड़ा गया, 400% गारंटीड मुनाफे का लालच दिया गया, और झूठे बॉट मेंबर्स से तारीफ कराई जा रही है।',
      phonetic: 'Dhyan se suniye. 95 percent stock ghotaale aise hi shuru hote hain. Bina permission aapko group me joda gaya, 400 percent guaranteed profit ka lalach diya gaya, aur jhoothe bot members se taareef karayi jaa rahi hai.',
    },
    en: {
      narrator: 'Listen closely. This is how 95% of WhatsApp stock scams start: a stranger adds you without permission, promises impossible 400% guaranteed returns, and plants fake group members to establish trust.',
      phonetic: 'Listen closely. This is how 95 percent of WhatsApp stock scams start: a stranger adds you without permission, promises impossible 400 percent guaranteed returns, and plants fake group members to establish trust.',
    },
    hinglish: {
      narrator: 'Dhyan se suno. 95% share bazaar scams aisi hi fake groups se start hote hain. Anjaan person add karta hai, 400% guaranteed returns ka lalach deta hai, aur fake members tareef karte hain.',
      phonetic: 'Dhyan se suno. 95 percent share bazaar scams aisi hi fake groups se start hote hain. Anjaan person add karta hai, 400 percent guaranteed returns ka lalach deta hai, aur fake members tareef karte hain.',
    },
    mr: {
      narrator: 'काळजीपूर्वक ऐका. 95% स्टॉक घोटाळे असेच सुरू होतात: परवानगीशिवाय तुम्हाला ग्रुपमध्ये जोडले जाते, 400% हमी नफ्याचे आमिष दाखवले जाते, आणि खोटे सदस्य कौतुक करतात.',
      phonetic: 'Kaaljipoorvak aika. Panchyaan-nav takke stock ghotaale asech suru hotaath. Parvaangi-shivaay tumhaala group madhe jodle jaate, chaar-she takke guaranteed profit che aamish daakhvile jaate.',
    },
    bn: {
      narrator: 'মনোযোগ দিয়ে শুনুন। ৯৫% স্টক প্রতারণা এভাবেই শুরু হয়: বিনা অনুমতিতে গ্রুপে যোগ করা, ৪০০% নিশ্চিত মুনাফার লোভ দেখানো এবং ভুয়ো সদস্যদের প্রশংসা করানো।',
      phonetic: 'Monojog diye shunoon. Pachaanobboi percent stock protarona ebhabei shuru hoy. Bina onumotite groupe jog kora, char-sho percent nishchit munafar lobh dekhano.',
    },
    gu: {
      narrator: 'ધ્યાનથી સાંભળો. 95% સ્ટોક ફ્રોડ આ રીતે જ શરૂ થાય છે: મંજૂરી વગર ગ્રૂપમાં ઉમેરવા, 400% ગેરંટીડ નફાની લાલચ આપવી, અને બનાવટી સભ્યો દ્વારા પ્રશંસા કરાવવી.',
      phonetic: 'Dhyan thi saambhalo. Panchaanu takaa stock fraud aa rite j sharu thaay chhe. Manjoori vagar group ma umer-va, chaar-so takaa guaranteed nafaa ni lalach aapvi.',
    },
    ta: {
      narrator: 'கவனமாகக் கேளுங்கள். 95% வாட்ஸ்அப் பங்கு மோசடிகள் இப்படித்தான் தொடங்குகின்றன: அனுமதியின்றி உங்களைச் சேர்த்து, 400% உத்தரவாத லாபம் என ஆசைகாட்டி ஏமாற்றுகிறார்கள்.',
      phonetic: 'Kavanamaaga kelungal. Thon-nootru aindhu sathaveedham stock frauds ippadithan thodangukinrana. Anumadhi-yindri ungalai serthu, naanooru sathaveedham urudhi-yaana laabam ena aasaikaati e-maatrugiraargal.',
    },
    te: {
      narrator: 'జాగ్రత్తగా వినండి. 95% స్టాక్ మార్కెట్ మోసాలు ఇలాగే మొదలవుతాయి: మీ అనుమతి లేకుండా గ్రూప్‌లో చేర్చి, 400% గ్యారెంటీ లాభాలు అని ఆశచూపుతారు.',
      phonetic: 'Jaagrathaga vinandi. Thom-bhai aidhu shatham stock market mosaalu ilaage modhalavutaayi. Mee anumathi lekunda group lo cherchi, naalu-vandhala shatham guaranteed laabhaalu ani aasha chooputaaru.',
    },
  },

  step_urgency: {
    hi: {
      narrator: 'सावधान! 5 मिनट का टाइमर केवल आपके दिमाग में घबराहट पैदा करने के लिए है। किसी भी अधिकृत सेबी ब्रोकर को पैसे केवल आधिकारिक बैंक चैनल से दिए जाते हैं, किसी के निजी यूपीआई पर नहीं।',
      phonetic: 'Saavdhan! 5 minute ka timer keval aapke dimaag me ghabrahat paida karne ke liye hai. Kisi bhi registered broker ko paise official bank channel se diye jaate hain, private UPI par nahi.',
    },
    en: {
      narrator: 'Warning! The 5-minute countdown is artificial urgency created to trigger fear of missing out. SEBI brokers never accept funds on personal UPI handles ending in okaxis or paytm.',
      phonetic: 'Warning! The 5-minute countdown is artificial urgency created to trigger fear of missing out. SEBI brokers never accept funds on personal UPI handles ending in okaxis or paytm.',
    },
    hinglish: {
      narrator: 'Alert! 5 minute ka timer FOMO aur panic create karne ke liye hai. Asli institutional shares personal UPI ID par kabhi transfer nahi hote.',
      phonetic: 'Alert! 5 minute ka timer FOMO aur panic create karne ke liye hai. Asli institutional shares personal UPI ID par kabhi transfer nahi hote.',
    },
    mr: {
      narrator: 'सावधान! 5 मिनिटांचा टायमर केवळ भीती आणि घाई निर्माण करण्यासाठी आहे. सेबी नोंदणीकृत ब्रोकर कधीही वैयक्तिक यूपीआयवर पैसे घेत नाहीत.',
      phonetic: 'Saavdhan! Paach minitan-cha timer keval bheeti aani ghaai nirmaan karnyasathi aahe. SEBI nondani-krut broker kadhihi vyaktigat UPI var paise ghet naahit.',
    },
    bn: {
      narrator: 'সতর্ক থাকুন! ৫ মিনিটের টাইমার কেবল আতঙ্ক এবং তাড়াহুড়ো তৈরির জন্য। সেবি অনুমোদিত কোনো প্রতিষ্ঠান কখনো ব্যক্তিগত ইউপিআইতে টাকা চায় না।',
      phonetic: 'Sotorko thaakun! Paanch miniter timer kebol aatongko toirir jonyo. SEBI onumodito kono protishthan kokhono byaktigoto UPI te taka chaay na.',
    },
    gu: {
      narrator: 'ચેતવણી! 5 મિનિટનો ટાઈમર માત્ર તમને ગભરાવવા અને ઉતાવળ કરાવવા માટે છે. સેબી માન્ય બ્રોકર ક્યારેય વ્યક્તિગત UPI પર નાણાં માંગતા નથી.',
      phonetic: 'Chetavani! Paanch minute no timer maatra tamne ghabraav-va maate chhe. SEBI maanya broker kyaare-ya vyaktigat UPI par naana maang-ta nathi.',
    },
    ta: {
      narrator: 'எச்சரிக்கை! 5 நிமிட கவுண்டவுன் உங்களை அவசரப்படுத்தவே வைக்கப்பட்டுள்ளது. செபி அங்கீகாரம் பெற்ற எந்த தரகரும் தனிநபர் யுபிஐக்கு பணம் கேட்க மாட்டார்கள்.',
      phonetic: 'Echarikkai! Aindhu nimidam countdown ungalai avasarapadutha-ve vaikkappattulladhu. SEBI angigaaram petra endha tharagaram thaninabar UPI-kku panam ketka maattaargal.',
    },
    te: {
      narrator: 'హెచ్చరిక! 5 నిమిషాల కౌంట్‌డౌన్ కేవలం మిమ్మల్ని ఆందోళనకు గురిచేసేందుకే. సెబీ బ్రోకర్లు ఎప్పుడూ వ్యక్తిగత యూపీఐ ఖాతాలకు డబ్బులు బదిలీ చేయమని అడగరు.',
      phonetic: 'Heccharika! Aidhu nimishaala countdown kevalam mimmalanu aandholanaku guri chey-saenduke. SEBI brokerlu eppudoo vyaktigatha UPI ki dabbulu adagaru.',
    },
  },

  step_extortion: {
    hi: {
      narrator: 'यह जालसाजी का अंतिम चरण है! स्क्रीन पर दिख रहा ₹4.8 लाख का मुनाफा पूरी तरह फर्जी है। अगर आपने ₹15,150 और दिए, तो वे पैसे भी डूब जाएंगे। तुरंत 1930 पर कॉल करें।',
      phonetic: 'Yeh jalsaazi ka antim charan hai! Screen par dikh raha 4.8 lakh ka profit poori tarah fake hai. Agar aapne 15,150 rupaye aur diye, to wo paise bhi doob jaenge. Turant 1930 par call karein.',
    },
    en: {
      narrator: 'Critical alert! The 4.8 Lakh profit on your screen is 100% fabricated. Legitimate brokers never demand upfront tax fees to release your own profits. Paying more will only increase your loss.',
      phonetic: 'Critical alert! The 4.8 Lakh profit on your screen is 100 percent fabricated. Legitimate brokers never demand upfront tax fees to release your own profits. Paying more will only increase your loss.',
    },
    hinglish: {
      narrator: 'Extreme Red Alert! Screen par dikhne wala profit bilkul fake hai. Apne hi paise withdraw karne ke liye alag se tax ya fee maangna pure fraud hai.',
      phonetic: 'Extreme Red Alert! Screen par dikhne wala profit bilkul fake hai. Apne hi paise withdraw karne ke liye alag se tax ya fee maangna pure fraud hai.',
    },
    mr: {
      narrator: 'धोक्याचा इशारा! स्क्रीनवर दिसणारा ४.८ लाखांचा नफा पूर्णपणे खोटा आहे. स्वतःचे पैसे काढण्यासाठी आगाऊ फी किंवा टॅक्स मागणे ही १००% फसवणूक आहे.',
      phonetic: 'Dhokyaacha ishaara! Screen var disnaara chaar point aath laakhan-cha nafaa poornapane khota aahe. Swatahache paise kaadnyasathi aagaau fee maangne he 100 percent fasavnook aahe.',
    },
    bn: {
      narrator: 'জরুরি সতর্কতা! স্ক্রিনে প্রদর্শিত ৪.৮ লক্ষ টাকার লাভ সম্পূর্ণ ভুয়ো। নিজের টাকা তোলার জন্য অগ্রিম কর চাওয়া পুরোপুরি সাইবার প্রতারণা। আর কোনো টাকা দেবেন না।',
      phonetic: 'Joruri sotorkota! Screen-e prodorshito chaar point aat lokkho takar laabh shompoorno bhuyo. Nijer taka tolar jonyo ogrim kor chaowa puro-puri fraud.',
    },
    gu: {
      narrator: 'ગંભીર ચેતવણી! સ્ક્રીન પર દેખાતો 4.8 લાખનો નફો સંપૂર્ણપણે નકલી છે. તમારા પોતાના પૈસા ઉપાડવા માટે એડવાન્સ ટેક્સ માંગવો એ 100% સાયબર ફ્રોડ છે.',
      phonetic: 'Gambhir chetavani! Screen par dekhaato chaar point aath laakh no nafo sampoornapane nakli chhe. Tamaara potaana paisa upaadva maate advance tax maangvo e 100 percent fraud chhe.',
    },
    ta: {
      narrator: 'ஆபத்து எச்சரிக்கை! திரையில் தெரியும் ₹4.8 லட்சம் லாபம் முற்றிலும் போலியானது. உங்கள் சொந்த பணத்தை எடுக்க முன்பண வரி கேட்பது 100% பண மோசடி. மேலும் பணம் செலுத்தாதீர்கள்.',
      phonetic: 'Aabathu echarikkai! Thiraiyil theriyum naangu point ettu latcham laabam muttrilum poliyaanadhu. Ungal sontha panathai edukka mun-pana vari ketpadhu nooru sathaveedham fraud.',
    },
    te: {
      narrator: 'ప్రమాదకర హెచ్చరిక! స్క్రీన్‌పై కనిపిస్తున్న ₹4.8 లక్షల లాభం పూర్తిగా నకిలీది. మీ సొంత డబ్బు ఉపసంహరణకు ముందస్తు పన్ను అడగడం 100% సైబర్ మోసం. ఇంకెప్పుడూ డబ్బు పంపకండి.',
      phonetic: 'Pramaadhakara heccharika! Screen pai kanipisthunna chaar point aath laakshala laabham poorthigaa nakeeli-dhi. Mee sontha dabbulu teesukovadaaniki mundhuga tax adagadam 100 percent fraud.',
    },
  },
};

// Localized scam analyzer verdicts
export const LOCALIZED_VERDICTS: Record<
  string,
  Record<Language, { title: string; speech: string }>
> = {
  HIGH_SCAM_RISK: {
    hi: {
      title: '🚨 अत्यधिक उच्च जोखिम — संगठित धोखाधड़ी',
      speech: 'सावधान! यह अत्यधिक उच्च जोखिम वाला संगठित घोटाला है। इसमें बिना सेबी पंजीकरण गारंटीड रिटर्न और अज्ञात यूपीआई पर पैसे मांगे गए हैं। तुरंत इस नंबर को ब्लॉक करें।',
    },
    en: {
      title: '🚨 CRITICAL RISK — High Probability Financial Scam',
      speech: 'Critical alert! This message exhibits severe red flags of organized financial fraud: impossible guaranteed returns, artificial urgency, and unregulated UPI payment demands. Do not transfer any money.',
    },
    hinglish: {
      title: '🚨 High Scam Risk — Farzi Offer Alert',
      speech: 'Warning! Yeh 100 percent fraud scheme lag rahi hai. Guaranteed profit ka jhootha waada aur unknown UPI par payment maanga gaya hai. Koi paise na bhejein.',
    },
    mr: {
      title: '🚨 अति उच्च धोका — संघटित आर्थिक फसवणूक',
      speech: 'सावधान! हा अत्यंत धोकादायक आर्थिक घोटाळा आहे. यात अशक्य नफ्याचे आमिष आणि वैयक्तिक यूपीआय खात्यावर पैसे मागण्यात आले आहेत.',
    },
    bn: {
      title: '🚨 চরম ঝুঁকি — সংগঠিত আর্থিক প্রতারণা',
      speech: 'সতর্ক থাকুন! এটি অত্যন্ত ঝুঁকিপূর্ণ সাইবার প্রতারণা। নিশ্চিত মুনাফার প্রলোভন ও অপরিচিত ইউপিআইতে টাকা চাওয়া হয়েছে। কোনো অর্থ পাঠাবেন না।',
    },
    gu: {
      title: '🚨 અતિ જોખમી — સંગઠિત આર્થિક છેતરપિંડી',
      speech: 'ચેતવણી! આ અતિ જોખમી સાયબર છેતરપિંડી છે. અશક્ય નફાની ગેરંટી અને અજાણ્યા UPI પર નાણાં માંગવામાં આવ્યા છે. કોઈ પણ વ્યવહાર કરશો નહીં.',
    },
    ta: {
      title: '🚨 மிக அதிக ஆபத்து — திட்டமிட்ட நிதி மோசடி',
      speech: 'எச்சரிக்கை! இது திட்டமிட்ட நிதி மோசடி. சாத்தியமற்ற உத்தரவாத லாபம் மற்றும் தனிநபர் யுபிஐயில் பணம் கோரப்பட்டுள்ளது. உடனடியாக பிளாக் செய்யுங்கள்.',
    },
    te: {
      title: '🚨 అత్యధిక ప్రమాదం — ఆర్థిక మోసం',
      speech: 'హెచ్చరిక! ఇది తీవ్రమైన ఆర్థిక మోసం. అసాధ్యమైన లాభాలు మరియు వ్యక్తిగత యూపీఐ ఖాతాకు డబ్బులు అడుగుతున్నారు. వెంటనే బ్లాక్ చేయండి.',
    },
  },

  SUSPICIOUS: {
    hi: {
      title: '⚠️ संदिग्ध संदेश — सावधानी से जांच करें',
      speech: 'चेतावनी! इस संदेश में कई संदिग्ध संकेत मिले हैं। किसी भी अपंजीकृत सलाहकार के सुझाव पर निर्णय न लें और सेबी पोर्टल पर जांच करें।',
    },
    en: {
      title: '⚠️ SUSPICIOUS — Multiple Unverified Red Flags',
      speech: 'Caution. Several suspicious indicators detected. Never execute trades based on unverified tips received via messaging apps.',
    },
    hinglish: {
      title: '⚠️ Suspicious Message — Check Karein',
      speech: 'Alert. Is message me suspicious indicators mile hain. Kisi unverified group ke kehne par paisa mat lagaiye.',
    },
    mr: {
      title: '⚠️ संशयास्पद संदेश — पडताळणी करा',
      speech: 'सावध राहा! या संदेशात संशयास्पद बाबी आढळल्या आहेत. सेबी पोर्टलवर नोंदणी तपासल्याशिवाय कोणताही व्यवहार करू नका.',
    },
    bn: {
      title: '⚠️ সন্দেহজনক বার্তা — যাচাই করুন',
      speech: 'সাবধান! এই বার্তায় সন্দেহজনক লক্ষণ রয়েছে। সেবি পোর্টাল ছাড়া কোনো পরামর্শ বিশ্বাস করবেন না।',
    },
    gu: {
      title: '⚠️ શંકાસ્પદ સંદેશ — સાવધાની રાખો',
      speech: 'સાવધાન! આ સંદેશમાં શંકાસ્પદ સંકેતો છે. સેબી પોર્ટલ પર પુષ્ટિ કર્યા વગર કોઈ રોકાણ કરશો નહીં.',
    },
    ta: {
      title: '⚠️ சந்தேகத்திற்கிடமான செய்தி — கவனமாக இருங்கள்',
      speech: 'கவனம்! இதில் பல சந்தேகங்கள் உள்ளன. செபி இணையதளத்தில் சரிபார்க்காமல் முதலீடு செய்யாதீர்கள்.',
    },
    te: {
      title: '⚠️ అనుమానాస్పద సందేశం — ధృవీకరించుకోండి',
      speech: 'జాగ్రత్త! ఈ సందేశంలో అనుమానాస్పద అంశాలు ఉన్నాయి. సెబీ పోర్టల్‌లో తనిఖీ చేయకుండా ఎవరికీ డబ్బు పంపకండి.',
    },
  },

  POTENTIALLY_SAFE: {
    hi: {
      title: '✅ प्राथमिक दृष्टि से सामान्य प्रतीत होता है',
      speech: 'इस संदेश में स्पष्ट घोटाले के लक्षण नहीं मिले हैं। फिर भी आधिकारिक सेबी या ब्रोकर ऐप से ही पुष्टि करें।',
    },
    en: {
      title: '✅ NO CRITICAL THREATS DETECTED',
      speech: 'No immediate scam patterns detected. Always verify stock recommendations through your registered SEBI depository participant.',
    },
    hinglish: {
      title: '✅ Safe Lag Raha Hai',
      speech: 'Isme direct scam patterns nahi mile hain. Hamesha official SEBI registered broker se hi trade karein.',
    },
    mr: {
      title: '✅ सुरक्षित संदेश वाटत आहे',
      speech: 'यात फसवणुकीचे थेट पुरावे आढळले नाहीत. तरीही अधिकृत ब्रोकर ॲपवरून खात्री करा.',
    },
    bn: {
      title: '✅ প্রাথমিক দৃষ্টিতে নিরাপদ',
      speech: 'কোনো প্রত্যক্ষ প্রতারণার লক্ষণ নেই। তবুও অনুমোদিত ব্রোকার অ্যাপের মাধ্যমেই লেনদেন করুন।',
    },
    gu: {
      title: '✅ સામાન્ય સંકેત — પ્રમાણમાં સુરક્ષિત',
      speech: 'કોઈ સીધા ફ્રોડ ચિહ્નો મળ્યા નથી. છતાં તમારા રજિસ્ટર્ડ બ્રોકર દ્વારા જ પુષ્ટિ કરો.',
    },
    ta: {
      title: '✅ ஆரம்ப பார்வையில் பாதுகாப்பானது',
      speech: 'நேரடி மோசடி அறிகுறிகள் இல்லை. ஆயினும் உங்கள் பதிவுசெய்யப்பட்ட தரகர் மூலம் உறுதிப்படுத்தவும்.',
    },
    te: {
      title: '✅ సాధారణంగా సురక్షితంగా ఉంది',
      speech: 'ప్రత్యక్ష మోసపూరిత సంకేతాలు కనిపించలేదు. అయినప్పటికీ అధికారిక బ్రోకర్ ద్వారానే తనిఖీ చేయండి.',
    },
  },

  UNKNOWN: {
    hi: {
      title: '❓ अपर्याप्त जानकारी — अधिक विवरण दें',
      speech: 'संदेश में पर्याप्त जानकारी नहीं मिली। कृपया पूरा संदेश, लिंक या यूपीआई आईडी दर्ज करें।',
    },
    en: {
      title: '❓ INSUFFICIENT DATA FOR FORENSIC VERIFICATION',
      speech: 'Insufficient data provided. Please paste the complete message, sender number, or payment link to perform verification.',
    },
    hinglish: {
      title: '❓ Aur Information Chahiye',
      speech: 'Message me poori details nahi hain. Full message ya UPI ID paste karke check karein.',
    },
    mr: {
      title: '❓ अपुरी माहिती — अधिक तपशील द्या',
      speech: 'तपासासाठी माहिती अपुरी आहे. कृपया संपूर्ण संदेश किंवा यूपीआय आयडी प्रविष्ट करा.',
    },
    bn: {
      title: '❓ অপর্যাপ্ত তথ্য — আরও বিবরণ দিন',
      speech: 'যাচাই করার জন্য পর্যাপ্ত তথ্য নেই। সম্পূর্ণ বার্তা বা লিংক প্রদান করুন।',
    },
    gu: {
      title: '❓ અપૂરતી માહિતી — વધુ વિગત આપો',
      speech: 'તપાસ માટે પૂરતી માહિતી નથી. કૃપા કરીને સંપૂર્ણ મેસેજ અથવા UPI આઈડી દાખલ કરો.',
    },
    ta: {
      title: '❓ போதிய தகவல்கள் இல்லை',
      speech: 'சரிபார்க்க கூடுதல் தகவல்கள் தேவை. முழு செய்தி அல்லது யுபிஐ ஐடியை உள்ளிடவும்.',
    },
    te: {
      title: '❓ సరిపడా సమాచారం లేదు',
      speech: 'ధృవీకరణకు సమాచారం సరిపోలేదు. దయచేసి పూర్తి సందేశం లేదా యూపీఐ వివరాలు నమోదు చేయండి.',
    },
  },
};

// Voice test sample phrases
export const VOICE_TEST_PHRASES: Record<Language, { native: string; phonetic: string; bcp47: string }> = {
  hi: {
    native: 'नमस्ते! मैं रक्षक हूँ, आपका सुरक्षित वित्तीय साथी।',
    phonetic: 'Namaste! Main Rakshak hoon, aapka surakshit vittiya saathi.',
    bcp47: 'hi-IN',
  },
  en: {
    native: 'Hello! I am Rakshak, your verified investor defense guide.',
    phonetic: 'Hello! I am Rakshak, your verified investor defense guide.',
    bcp47: 'en-IN',
  },
  hinglish: {
    native: 'Hello! Rakshak app me aapka swagat hai. Kisi bhi fake stock tip se bachein!',
    phonetic: 'Hello! Rakshak app me aapka swagat hai. Kisi bhi fake stock tip se bachein!',
    bcp47: 'hi-IN',
  },
  mr: {
    native: 'नमस्कार! मी रक्षक आहे, तुमचा सुरक्षित गुंतवणूक मार्गदर्शक.',
    phonetic: 'Namaskar! Mee Rakshak aahe, tumcha surakshit guntavanook maargadarshak.',
    bcp47: 'mr-IN',
  },
  bn: {
    native: 'নমস্কার! আমি রক্ষক, আপনার সুরক্ষিত আর্থিক সহযোগী।',
    phonetic: 'Nomoshkar! Aami Rokkhok, aapnar shurokkhito aarthik shohoyogi.',
    bcp47: 'bn-IN',
  },
  gu: {
    native: 'નમસ્તે! હું રક્ષક છું, આપનો સુરક્ષિત નાણાકીય સાથી.',
    phonetic: 'Namaste! Hoon Rakshak chhun, aapno surakshit naanaakiya saathi.',
    bcp47: 'gu-IN',
  },
  ta: {
    native: 'வணக்கம்! நான் ரக்ஷக், உங்கள் நிதி பாதுகாப்பு வழிகாட்டி.',
    phonetic: 'Vanakkam! Naan Rakshak, ungal nidhi paadukaappu vazhikaatti.',
    bcp47: 'ta-IN',
  },
  te: {
    native: 'నమస్కారం! నేను రక్షక్, మీ పెట్టుబడుల భద్రతా మార్గదర్శిని.',
    phonetic: 'Namaskaaram! Nenu Rakshak, mee pettubadula bhadratha maargadarshini.',
    bcp47: 'te-IN',
  },
};
