export interface BankContact {
  id: string;
  nameEn: string;
  nameHi: string;
  helpline: string;
  smsFreeze?: string;
  portalUrl?: string;
  type: 'bank' | 'upi' | 'regulator';
}

export const OFFICIAL_REGULATORS = [
  {
    nameEn: 'National Cyber Crime Helpline',
    nameHi: 'राष्ट्रीय साइबर अपराध हेल्पलाइन',
    helpline: '1930',
    descriptionEn: 'Call immediately within 2-4 hours (Golden Hour) to trigger financial fraud freeze across banks.',
    descriptionHi: 'वित्तीय धोखाधड़ी रोकने और खातों को फ्रीज कराने के लिए 2-4 घंटे (गोल्डन ऑवर) में तुरंत 1930 पर कॉल करें।',
    portalUrl: 'https://cybercrime.gov.in',
    actionTextEn: 'Call 1930 Now',
    actionTextHi: 'अभी 1930 पर कॉल करें',
  },
  {
    nameEn: 'SEBI SCORES Portal',
    nameHi: 'सेबी स्कोर्स (SCORES) पोर्टल',
    helpline: '1800 22 7575',
    descriptionEn: 'Lodge formal complaint against unauthorized investment advisors, fraudulent PMS, and unregistered entities.',
    descriptionHi: 'फर्जी निवेश सलाहकारों, अवैध पीएमएस और बिना पंजीकरण के टिप देने वालों के खिलाफ सेबी में शिकायत दर्ज करें।',
    portalUrl: 'https://scores.sebi.gov.in',
    actionTextEn: 'Visit SCORES Portal',
    actionTextHi: 'स्कोर्स पोर्टल खोलें',
  },
  {
    nameEn: 'RBI Sachet Portal',
    nameHi: 'आरबीआई सचेत (Sachet) पोर्टल',
    helpline: '14440',
    descriptionEn: 'Report illegal deposit taking schemes, unauthorized lending apps, and unregistered non-banking entities.',
    descriptionHi: 'अवैध पोंजी स्कीम, फर्जी लोन ऐप और बिना लाइसेंस पैसे जमा कराने वाली संस्थाओं की शिकायत करें।',
    portalUrl: 'https://sachet.rbi.gov.in',
    actionTextEn: 'Visit RBI Sachet',
    actionTextHi: 'आरबीआई सचेत खोलें',
  },
];

export const BANK_HELPLINES: BankContact[] = [
  {
    id: 'sbi',
    nameEn: 'State Bank of India (SBI)',
    nameHi: 'भारतीय स्टेट बैंक (SBI)',
    helpline: '1800111109',
    smsFreeze: 'BLOCK <Account No> to 567676',
    portalUrl: 'https://cms.onlinesbi.sbi',
    type: 'bank',
  },
  {
    id: 'hdfc',
    nameEn: 'HDFC Bank',
    nameHi: 'एचडीएफसी बैंक',
    helpline: '18002583838',
    smsFreeze: 'Send BLOCK to 5676712',
    portalUrl: 'https://www.hdfcbank.com',
    type: 'bank',
  },
  {
    id: 'icici',
    nameEn: 'ICICI Bank',
    nameHi: 'आईसीआईसीआई बैंक',
    helpline: '18001080',
    smsFreeze: 'BLOCK <Account No> to 5676766',
    portalUrl: 'https://www.icicibank.com',
    type: 'bank',
  },
  {
    id: 'axis',
    nameEn: 'Axis Bank',
    nameHi: 'एक्सिस बैंक',
    helpline: '18604195555',
    smsFreeze: 'BLOCK to 56161600',
    portalUrl: 'https://www.axisbank.com',
    type: 'bank',
  },
  {
    id: 'phonepe',
    nameEn: 'PhonePe Emergency Support',
    nameHi: 'फोनपे इमरजेंसी सपोर्ट',
    helpline: '080-68727374',
    portalUrl: 'https://support.phonepe.com',
    type: 'upi',
  },
  {
    id: 'gpay',
    nameEn: 'Google Pay India Support',
    nameHi: 'गूगल पे इंडिया सपोर्ट',
    helpline: '18004190157',
    portalUrl: 'https://support.google.com/pay/india',
    type: 'upi',
  },
  {
    id: 'paytm',
    nameEn: 'Paytm 24x7 Cyber Helpdesk',
    nameHi: 'पेटीएम साइबर हेल्पडेस्क',
    helpline: '0120-4456456',
    portalUrl: 'https://paytm.com/care',
    type: 'upi',
  },
];
