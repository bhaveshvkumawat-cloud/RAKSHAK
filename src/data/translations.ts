import { Language } from '../types';

export interface LocalizedStepContent {
  title: string;
  narrator: string;
}

export const STEP_TRANSLATIONS: Record<string, Record<Language, LocalizedStepContent>> = {
  step_intro: {
    hi: {
      title: '1. अचानक आया VIP इनविटेशन',
      narrator: 'ध्यान से सुनिए। 95% स्टॉक घोटाले ऐसे ही शुरू होते हैं: बिना अनुमति आपको ग्रुप में जोड़ा गया, 400% गारंटीड मुनाफे का लालच दिया गया, और झूठे बॉट मेंबर्स से तारीफ कराई जा रही है।',
    },
    en: {
      title: '1. The Unsolicited VIP Invitation',
      narrator: 'Listen closely. 95% of stock scams start this way: added without consent, promised impossible 400% guaranteed returns, and surrounded by fake shills.',
    },
    hinglish: {
      title: '1. Unsolicited VIP WhatsApp Group',
      narrator: 'Dhyan se suniye. 95% stock market scams aise hi shuru hote hain: bina permission group me add kiya, 400% guaranteed profit ka jhaansa diya, aur fake bot members taarif kar rahe hain.',
    },
    mr: {
      title: '1. अचानक आलेले VIP आमंत्रण',
      narrator: 'काळजीपूर्वक ऐका. 95% शेअर बाजार घोटाळे असेच सुरू होतात: परवानगीशिवाय ग्रुपमध्ये जोडले, 400% हमी परताव्याचे आमिष दाखवले आणि खोट्या सदस्यांकडून स्तुती करून घेतली जात आहे.',
    },
    bn: {
      title: '1. আচমকা আসা VIP ইনভিটেশন',
      narrator: 'মনোযোগ দিয়ে শুনুন। 95% শেয়ার বাজার স্ক্যাম এভাবেই শুরু হয়: অনুমতি ছাড়া গ্রুপে যোগ করা, 400% নিশ্চিত মুনাফার লোভ দেখানো এবং ফেক মেম্বারদের দিয়ে প্রশংসা করানো।',
    },
    gu: {
      title: '1. અણધાર્યું VIP આમંત્રણ',
      narrator: 'ધ્યાનથી સાંભળો. 95% શેરબજાર કૌભાંડો આ રીતે જ શરૂ થાય છે: પરવાનગી વિના ગ્રુપમાં ઉમેરવામાં આવ્યા, 400% ગેરંટીડ નફાની લાલચ આપી અને નકલી સભ્યો દ્વારા પ્રશંસા કરાવાઈ રહી છે.',
    },
    ta: {
      title: '1. எதிர்பாராத VIP அழைப்பு',
      narrator: 'கவனமாகக் கேளுங்கள். 95% பங்குச் சந்தை மோசடிகள் இப்படித்தான் தொடங்குகின்றன: அனுமதி இன்றி சேர்க்கப்பட்டு, 400% உத்தரவாத லாபம் காட்டி, போலி உறுப்பினர்கள் மூலம் நம்பிக்கை மூட்டுகிறார்கள்.',
    },
    te: {
      title: '1. అనుకోని VIP ఆహ్వానం',
      narrator: 'జాగ్రత్తగా వినండి. 95% స్టాక్ మార్కెట్ మోసాలు ఇలాగే ప్రారంభమవుతాయి: అనుమతి లేకుండా గ్రూప్‌లో చేర్చి, 400% గ్యారెంటీ లాభం ఆశచూపి, ఫేక్ మెంబర్లతో ప్రశంసలు కురిపిస్తారు.',
    },
  },
  step_urgency: {
    hi: {
      title: '2. 5 मिनट का टाइमर और पर्सनल UPI का जाल',
      narrator: 'रुकिए! यहाँ दो बड़े खतरे हैं: पहला, 5 मिनट की उल्टी गिनती ताकि आप सोच न सकें। दूसरा, व्यक्तिगत UPI आईडी! सेबी का नियम है कि अधिकृत ब्रोकर्स कभी पर्सनल UPI पर पैसे नहीं लेते।',
    },
    en: {
      title: '2. The 5-Minute Timer & Personal UPI Trap',
      narrator: 'Stop! Two fatal red flags here: 1. A 5-minute fake countdown to cause panic. 2. A personal UPI handle. Legitimate SEBI brokers NEVER accept client deposits on personal UPI VPAs!',
    },
    hinglish: {
      title: '2. 5-Minute Timer & Personal UPI Trap',
      narrator: 'Rukiye! Yahan do sabse bade khatre hain: 5 minute ka fake timer taaki aap soch na sakein, aur personal UPI ID! SEBI brokers kabhi personal UPI par paise nahi lete.',
    },
    mr: {
      title: '2. 5 मिनिटांचा टायमर आणि वैयक्तिक UPI चा सापळा',
      narrator: 'थांबा! येथे दोन मोठे धोके आहेत: 5 मिनिटांचे बनावट काउंटडाउन आणि वैयक्तिक UPI आयडी. सेबी नोंदणीकृत ब्रोकर कधीही वैयक्तिक UPI वर पैसे घेत नाहीत!',
    },
    bn: {
      title: '2. 5 মিনিটের টাইমার ও ব্যক্তিগত UPI ফাঁদ',
      narrator: 'থামুন! এখানে দুটি মারাত্মক বিপদ: প্রথমত 5 মিনিটের কাউন্টডাউন যাতে ভাবতে না পারেন, দ্বিতীয়ত ব্যক্তিগত UPI আইডি! সেবি রেজিস্টার্ড ব্রোকার কখনোই পার্সোনাল UPI-তে টাকা নেয় না।',
    },
    gu: {
      title: '2. 5 મિનિટનો ટાઈમર અને પર્સનલ UPI ની જાળ',
      narrator: 'રોકાઓ! અહીં બે મોટા જોખમો છે: 5 મિનિટનું નકલી કાઉન્ટડાઉન અને પર્સનલ UPI આઈડી! સેબી માન્ય બ્રોકર્સ ક્યારેય પર્સનલ UPI પર પૈસા લેતા નથી.',
    },
    ta: {
      title: '2. 5 நிமிட அவசரமும் தனிநபர் UPI வலையும்',
      narrator: 'நில்லுங்கள்! இரண்டு பெரிய எச்சரிக்கை அறிகுறிகள்: சிந்திக்க விடாமல் தடுக்கும் 5 நிமிட டைமர் மற்றும் தனிநபர் UPI ஐடி. செபி அங்கீகரித்த புரோக்கர்கள் ஒருபோதும் தனிநபர் UPI-ல் பணம் வாங்குவதில்லை!',
    },
    te: {
      title: '2. 5 నిమిషాల టైమర్ మరియు వ్యక్తిగత UPI ట్రాప్',
      narrator: 'ఆగండి! ఇక్కడ రెండు ప్రమాదాలు ఉన్నాయి: ఆలోచించకుండా చేసే 5 నిమిషాల కౌంట్‌డౌన్, మరియు వ్యక్తిగత UPI ID! సెబీ గుర్తింపు పొందిన బ్రోకర్లు ఎప్పుడూ పర్సనల్ UPI ద్వారా డబ్బులు తీసుకోరు.',
    },
  },
  step_defensive: {
    hi: {
      title: '3. फर्जी सर्टिफिकेट और मानसिक दबाव',
      narrator: 'इसे कहते हैं सोशल शेमिंग। ग्रुप के बाकी सदस्य (जो जालसाज के ही साथी या बॉट हैं) आप पर मिलकर दबाव बनाते हैं ताकि आप सवाल पूछना बंद कर दें।',
    },
    en: {
      title: '3. Fake Certificate & Social Pressure',
      narrator: 'Notice the psychological tactic: Social Proof Shaming. Accomplice accounts team up against you to make you feel stupid for being cautious.',
    },
    hinglish: {
      title: '3. Fake Certificate & Group Pressure',
      narrator: 'Ise social proof shaming kehte hain. Group ke doosre fake members aap par milkar pressure banate hain taaki aap enquiry band karke paise de dein.',
    },
    mr: {
      title: '3. बनावट प्रमाणपत्र आणि मानसिक दबाव',
      narrator: 'याला सोशल शेमिंग म्हणतात. ग्रुपमधील इतर सदस्य (जे घोटाळेबाजांचेच साथीदार आहेत) एकत्र येऊन तुमच्यावर दबाव आणतात जेणेकरून तुम्ही प्रश्न विचारणे थांबवाल.',
    },
    bn: {
      title: '3. জাল সার্টিফিকেট ও মানসিক চাপ',
      narrator: 'একে বলে সোশ্যাল শেমিং। গ্রুপের বাকি ফেক মেম্বাররা আপনার উপর চাপ সৃষ্টি করে যাতে আপনি প্রশ্ন করা বন্ধ করে টাকা পাঠিয়ে দেন।',
    },
    gu: {
      title: '3. નકલી સર્ટિફિકેટ અને માનસિક દબાણ',
      narrator: 'આને સોશિયલ શેમિંગ કહે છે. ગ્રુપના અન્ય નકલી સભ્યો તમારા પર સાથે મળીને દબાણ લાવે છે જેથી તમે સવાલ પૂછવાનું બંધ કરીને પૈસા આપી દો.',
    },
    ta: {
      title: '3. போலி சான்றிதழும் குழு அழுத்தமும்',
      narrator: 'இதை சமூக அழுத்தம் என்பார்கள். நீங்கள் எச்சரிக்கையாக இருப்பதை குற்ற உணர்வாக்க, கூட்டாளிக் கணக்குகள் இணைந்து உங்கள் மீது அழுத்தம் தருகின்றன.',
    },
    te: {
      title: '3. నకిలీ సర్టిఫికెట్ మరియు గ్రూప్ ఒత్తిడి',
      narrator: 'దీనిని సోషల్ ప్రెజర్ అంటారు. మీరు ప్రశ్నించడం ఆపేసి డబ్బులు పంపేలా, మోసగాడి గ్రూప్ సభ్యులు కలిసి మీపై మానసిక ఒత్తిడి పెంచుతారు.',
    },
  },
  step_trap_sprung: {
    hi: {
      title: '4. मुनाफे का झांसा और अवैध वसूली',
      narrator: 'यह संकेत लागत जाल (Sunk Cost Trap) है। स्क्रीन पर दिख रहा मुनाफा पूरी तरह फर्जी है। यदि आप ₹15,000 देंगे, तो वे ₹40,000 और मांगेंगे!',
    },
    en: {
      title: '4. The Sunk Cost Extortion Trap',
      narrator: 'This is the Sunk Cost Extortion Trap. The numbers on screen are totally fabricated. If you pay the tax fee, they will ask for 40,000 more.',
    },
    hinglish: {
      title: '4. Fake Profit & Advance Fee Trap',
      narrator: 'Yeh Sunk Cost extortion trap hai. Screen par dikhaya gaya profit fake hai. Agar aapne tax ke naam par ₹15,000 diye, toh woh ₹40,000 aur maangenge.',
    },
    mr: {
      title: '4. नफ्याचे आमिष आणि खंडणीचा सापळा',
      narrator: 'हा संक कॉस्ट सापळा आहे. स्क्रीनवर दिसणारा नफा पूर्णपणे खोटा आहे. जर तुम्ही 15,000 रुपये दिले, तर ते आणखी 40,000 रुपयांची मागणी करतील!',
    },
    bn: {
      title: '4. ভুয়ো লাভ ও চাঁদা আদায়ের ফাঁদ',
      narrator: 'এটি সান্ক কস্ট ট্র্যাপ। স্ক্রিনে দেখানো লাভ সম্পূর্ণ জাল। আপনি যদি ট্যাক্সের নামে 15,000 টাকা দেন, তবে তারা আরও 40,000 দাবি করবে!',
    },
    gu: {
      title: '4. ખોટો નફો અને બળજબરીથી વસૂલાત',
      narrator: 'આ સંક કોસ્ટ ટ્રેપ છે. સ્ક્રીન પર દેખાતો નફો સંપૂર્ણપણે નકલી છે. જો તમે ટેક્સ પેટે ₹15,000 આપશો, તો તેઓ વધુ ₹40,000 ની માંગણી કરશે!',
    },
    ta: {
      title: '4. போலி லாபமும் மிரட்டிப் பறித்தலும்',
      narrator: 'இது சன்க் காஸ்ட் பொறி. திரையில் தெரியும் லாபம் முற்றிலும் போலியானது. வரி என்ற பெயரில் நீங்கள் ரூ.15,000 கொடுத்தால், அவர்கள் மேலும் ரூ.40,000 கேட்பார்கள்!',
    },
    te: {
      title: '4. నకిలీ లాభం మరియు వసూళ్ల ఉచ్చు',
      narrator: 'ఇది సంక్ కాస్ట్ ఎక్స్‌టార్షన్ ట్రాప్. స్క్రీన్‌పై కనిపించే లాభం పూర్తిగా నకిలీ. మీరు టాక్స్ పేరుతో ₹15,000 చెల్లిస్తే, వాళ్ళు మరో ₹40,000 డిమాండ్ చేస్తారు!',
    },
  },
  step_analyst_bans: {
    hi: {
      title: '4. पोल खुलते ही जालसाज ने ब्लॉक किया',
      narrator: 'बधाई हो! असली सलाहकार कभी सत्यापन से नहीं डरते। जालसाज तुरंत ऐसे जागरूक व्यक्ति को बाहर कर देते हैं जो सेबी स्कोर्स या जांच की बात करे।',
    },
    en: {
      title: '4. The Scammer Panics & Blocks You',
      narrator: 'Victory! Real advisors welcome regulatory verification. Scammers immediately kick out anyone who mentions official SEBI SCORES checks.',
    },
    hinglish: {
      title: '4. Pol Khulte Hi Ban Kar Diya',
      narrator: 'Victory! Asli advisors SEBI verification se nahi darte. Scammers turant us investor ko remove kar dete hain jo official SCORES portal ki baat kare.',
    },
    mr: {
      title: '4. पोल उघड होताच ब्लॉक केले',
      narrator: 'अभिनंदन! खरे सल्लागार पडताळणीला घाबरत नाहीत. सेबी स्कोर्सची विचारणा करणाऱ्या सजग व्यक्तीला घोटाळेबाज लगेच ग्रुपमधून बाहेर काढतात.',
    },
    bn: {
      title: '4. জালিয়াতি ফাঁস হতেই ব্লক করল',
      narrator: 'অভিনন্দন! আসল উপদেষ্টারা কখনো যাচাইয়ে ভয় পান না। কিন্তু সেবি স্কোরসের কথা বললেই প্রতারক সাথে সাথে গ্রুপ থেকে বের করে দেয়।',
    },
    gu: {
      title: '4. ભાંડો ફૂટતા જ તમને બ્લોક કર્યા',
      narrator: 'અભિનંદન! સાચા સલાહકારો ક્યારેય ચકાસણીથી ડરતા નથી. સેબી સ્કોર્સ પોર્ટલનું નામ લેતા જ છેતરપિંડી કરનાર તરત ગ્રુપમાંથી કાઢી મૂકે છે.',
    },
    ta: {
      title: '4. உண்மை தெரிந்ததும் உங்களை நீக்கினர்',
      narrator: 'வெற்றி! உண்மையான ஆலோசகர்கள் சரிபார்ப்பை வரவேற்பார்கள். செபி ஸ்கோர்ஸ் பற்றிப் பேசும் விழிப்புணர்வுள்ளவர்களை மோசடி செய்பவர்கள் உடனே நீக்கிவிடுவார்கள்.',
    },
    te: {
      title: '4. బండారం బయటపడగానే బ్లాక్ చేశారు',
      narrator: 'విజయం! అసలైన సలహాదారులు వెరిఫికేషన్‌కు భయపడరు. సెబీ స్కోర్స్ గురించి ప్రశ్నించిన వెంటనే మోసగాడు మిమ్మల్ని గ్రూప్ నుండి తొలగిస్తాడు.',
    },
  },
  step_safe_exit: {
    hi: {
      title: '4. सुरक्षित बचाव और साइबर रिपोर्ट',
      narrator: 'बधाई हो! आपने बिना एक भी रुपया गंवाए इस घोटाले को मात दे दी। पर्सनल UPI और झूठी जल्दीबाजी को पहचानकर आपने खुद को बड़े नुकसान से बचा लिया।',
    },
    en: {
      title: '4. Safe Evasion & Cyber Report',
      narrator: 'Congratulations! You escaped the scam with zero real loss! By recognizing the personal UPI and urgency traps, you protected your life savings.',
    },
    hinglish: {
      title: '4. Safe Evasion & 1930 Report',
      narrator: 'Congratulations! Aapne bina ek bhi rupya gawaye scam ko maat de di. Personal UPI aur fake countdown pehchaankar aapne apni savings bacha li.',
    },
    mr: {
      title: '4. सुरक्षित बचाव आणि सायबर तक्रार',
      narrator: 'अभिनंदन! एकही रुपया न गमावता तुम्ही या घोटाळ्याला मात दिली. वैयक्तिक UPI आणि खोटी घाई ओळखून तुम्ही स्वतःचे मोठे आर्थिक नुकसान टाळले.',
    },
    bn: {
      title: '4. সুরক্ষিত নিস্তার ও সাইবার রিপোর্ট',
      narrator: 'অভিনন্দন! এক টাকাও না হারিয়ে আপনি এই প্রতারণাকে হারিয়ে দিলেন। ব্যক্তিগত UPI ও কৃত্রিম তাড়াহুড়ো চিনে নিয়ে নিজের অর্থ বাঁচালেন।',
    },
    gu: {
      title: '4. સુરક્ષિત બચાવ અને સાયબર રિપોર્ટ',
      narrator: 'અભિનંદન! એક પણ રૂપિયો ગુમાવ્યા વિના તમે આ કૌભાંડને હરાવી દીધું. પર્સનલ UPI અને નકલી ઉતાવળને ઓળખીને તમે તમારી બચત સુરક્ષિત રાખી.',
    },
    ta: {
      title: '4. பாதுகாப்பான தப்பித்தலும் புகாரும்',
      narrator: 'வாழ்த்துகள்! ஒரு ரூபாய் கூட இழக்காமல் மோசடியை வென்றுவிட்டீர்கள். தனிநபர் UPI மற்றும் அவசரப் பொறியை அடையாளம் கண்டு உங்கள் பணத்தைப் பாதுகாத்துவிட்டீர்கள்.',
    },
    te: {
      title: '4. సురక్షితమైన రక్షణ మరియు రిపోర్ట్',
      narrator: 'అభినందనలు! ఒక్క రూపాయి కూడా నష్టపోకుండా ఈ మోసం నుండి సురక్షితంగా బయటపడ్డారు. పర్సనల్ UPI ఉచ్చును గుర్తించి మీ కష్టార్జితాన్ని కాపాడుకున్నారు.',
    },
  },
  step_debrief: {
    hi: {
      title: 'मिशन डीब्रीफ: इस्तेमाल किए गए 5 हथियार',
      narrator: 'यह रहा व्हाट्सएप निवेश घोटाले का पूर्ण फॉरेंसिक विश्लेषण। ध्यान से देखें कि कैसे हर मनोवैज्ञानिक चाल आपकी सोचने-समझने की क्षमता को बंद करने के लिए बनाई गई थी।',
    },
    en: {
      title: 'Mission Debrief: The 5 Weapons Used',
      narrator: 'Here is the complete forensic debrief. Notice how each psychological trick was engineered to bypass your rational thinking.',
    },
    hinglish: {
      title: 'Mission Debrief: 5 Scam Weapons',
      narrator: 'Yeh raha complete forensic debrief. Dekhiye kaise shill army, fake SEBI badge, aur personal UPI se aap par psychological attack kiya gaya tha.',
    },
    mr: {
      title: 'मिशन डीब्रीफ: वापरलेली 5 शस्त्रे',
      narrator: 'हा आहे संपूर्ण फॉरेन्सिक विश्लेषण. प्रत्येक मानसिक युक्ती तुमची विचार करण्याची क्षमता बंद करण्यासाठी कशी तयार केली होती ते समजून घ्या.',
    },
    bn: {
      title: 'মিশন ডিব্রিফ: ব্যবহৃত 5টি অস্ত্র',
      narrator: 'এটি হল হোয়াটসঅ্যাপ স্ক্যামের ফরেনসিক বিশ্লেষণ। বুঝুন কিভাবে মনস্তাত্ত্বিক চাপ সৃষ্টি করে আপনার যুক্তি নষ্ট করার চেষ্টা করা হয়েছিল।',
    },
    gu: {
      title: 'મિશન ડીબ્રીફ: વપરાયેલા 5 હથિયારો',
      narrator: 'આ રહ્યો સંપુર્ણ ફોરેન્સિક વિશ્લેષણ. સમજો કે કેવી રીતે દરેક માનસિક ચાલ તમારી વિચારવાની શક્તિને બંધ કરવા માટે રચી ગઈ હતી.',
    },
    ta: {
      title: 'பணி ஆய்வு: பயன்படுத்தப்பட்ட 5 ஆயுதங்கள்',
      narrator: 'இது முழுமையான தடயவியல் ஆய்வு. உங்கள் பகுத்தறிவை மழுங்கடிக்க ஒவ்வொரு உளவியல் உத்தியும் எவ்வாறு திட்டமிடப்பட்டது என்பதை கவனியுங்கள்.',
    },
    te: {
      title: 'మిషన్ డీబ్రీఫ్: ఉపయోగించిన 5 ఆయుధాలు',
      narrator: 'ఇది పూర్తి ఫోరెన్సిక్ విశ్లేషణ. మీ ఆలోచనా శక్తిని స్తంభింపజేయడానికి ప్రతి మానసిక ఎత్తుగడ ఎలా రూపొందించబడిందో గమనించండి.',
    },
  },
};

export const VERDICT_TRANSLATIONS: Record<string, Record<Language, string>> = {
  HIGH_SCAM_RISK: {
    hi: 'सावधान! इस संदेश में कई गंभीर लाल झंडे हैं जैसे व्यक्तिगत UPI और गैर-कानूनी गारंटीड रिटर्न। इसमें कभी पैसे न भेजें।',
    en: 'Warning! This message exhibits critical scam signatures including personal UPI routing and illegal guaranteed returns. Do not transfer funds.',
    hinglish: 'Warning! Is message me personal UPI aur illegal guaranteed returns ke red flags hain. Kabhi paise transfer na karein.',
    mr: 'सावधान! या संदेशामध्ये वैयक्तिक UPI आणि बेकायदेशीर हमी परताव्यासारखे गंभीर धोक्याचे संकेत आहेत. कधीही पैसे पाठवू नका.',
    bn: 'সাবধান! এই বার্তায় ব্যক্তিগত UPI এবং বেআইনি নিশ্চিত মুনাফার মতো মারাত্মক সংকেত রয়েছে। ভুলেও টাকা পাঠাবেন না।',
    gu: 'સાવધાન! આ મેસેજમાં પર્સનલ UPI અને ગેરકાયદેસર ગેરંટીડ રિટર્ન જેવા ગંભીર લાલ ઝંડા છે. ક્યારેય પૈસા ન મોકલો.',
    ta: 'எச்சரிக்கை! இந்தச் செய்தியில் தனிநபர் UPI மற்றும் சட்டவிரோத உத்தரவாத லாபம் போன்ற கடுமையான ஆபத்துகள் உள்ளன. பணம் அனுப்பாதீர்கள்.',
    te: 'హెచ్చరిక! ఈ మెసేజ్‌లో వ్యక్తిగత UPI మరియు చట్టవిరుద్ధమైన గ్యారెంటీ రిటర్న్స్ వంటి ప్రమాదకర సంకేతాలు ఉన్నాయి. డబ్బులు పంపవద్దు.',
  },
  SUSPICIOUS: {
    hi: 'इस संदेश में कुछ संदिग्ध संकेत हैं। कोई भी कदम उठाने से पहले SEBI पोर्टल पर नाम जरूर जांचें।',
    en: 'This message contains unverified claims. Please check the SEBI intermediary list before proceeding.',
    hinglish: 'Is message me suspicious daave hain. Koi bhi decision lene se pehle official SEBI portal par verify karein.',
    mr: 'या संदेशात काही संशयास्पद दावे आहेत. कोणतीही कृती करण्यापूर्वी सेबी पोर्टलवर नाव नक्की तपासा.',
    bn: 'এই বার্তায় কিছু সন্দেহজনক দাবি রয়েছে। যেকোনো পদক্ষেপ নেওয়ার আগে সেবি পোর্টালে নাম যাচাই করুন।',
    gu: 'આ મેસેજમાં શંકાસ્પદ દાવાઓ છે. કોઈપણ નિર્ણય લેતા પહેલાં સેબી પોર્ટલ પર નામ જરૂર ચકાસો.',
    ta: 'இந்தச் செய்தியில் சந்தேகத்திற்குரிய தகவல்கள் உள்ளன. எந்த முடிவும் எடுப்பதற்கு முன் செபி போர்ட்டலில் சரிபார்க்கவும்.',
    te: 'ఈ మెసేజ్‌లో అనుమానాస్పద సంకేతాలు ఉన్నాయి. ఏదైనా చర్య తీసుకునే ముందు సెబీ పోర్టల్‌లో సరిచూసుకోండి.',
  },
};

export function getLocalizedStep(stepId: string, lang: Language): LocalizedStepContent {
  const step = STEP_TRANSLATIONS[stepId];
  if (!step) {
    return { title: 'Rehearsal Step', narrator: '' };
  }
  return step[lang] || step['hi'] || step['en'];
}

export function getLocalizedVerdict(riskLevel: string, lang: Language): string {
  const verdictObj = VERDICT_TRANSLATIONS[riskLevel] || VERDICT_TRANSLATIONS['HIGH_SCAM_RISK'];
  return verdictObj[lang] || verdictObj['hi'] || verdictObj['en'];
}
