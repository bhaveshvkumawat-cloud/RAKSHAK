export interface SampleScam {
  id: string;
  titleEn: string;
  titleHi: string;
  category: string;
  preview: string;
  fullText: string;
}

export const SAMPLE_SCAMS: SampleScam[] = [
  {
    id: 'sample_vip_tip',
    titleEn: 'WhatsApp VIP Stock Tip',
    titleHi: 'व्हाट्सएप VIP स्टॉक टिप',
    category: 'Stock Market',
    preview: '100% Guaranteed 400% return on Monday! Pay ₹5,000 to rahul.analyst@okaxis...',
    fullText: `🔥 SEBI REGISTERED VIP RESEARCH DESK 🔥
Special FII Institutional block allotment for Monday.
Target Stock: ABC Power & Tech
Current Market Price: ₹45 | Target Price: ₹220 (+380% UPPER CIRCUIT)
100% SURE SHOT GUARANTEED RETURN! Zero risk, SEBI approved.
Only 5 seats left. To book your allocation send ₹5,000 reservation margin to our Chief Advisor Desk UPI: rahul.investor99@okaxis
Send screenshot immediately. Offer expires in 10 minutes!
SEBI Reg No: INA200009182 (Check on Telegram t.me/vip_wealth_india)`,
  },
  {
    id: 'sample_pre_ipo',
    titleEn: 'Institutional Pre-IPO APK Trap',
    titleHi: 'प्री-IPO और फर्जी APK ऐप',
    category: 'Unregistered App',
    preview: 'Get 500 shares of Tata Technology Pre-IPO at 70% discount. Download APK now...',
    fullText: `EXCLUSIVE PRE-IPO ALLOTMENT WINDOW:
You are selected for Institutional Allotment of top tier Unlisted Pre-IPO shares at 70% discount to market price!
Guaranteed allocation before public listing on NSE/BSE.
Download our institutional terminal app APK from: http://bit.ly/vip-inst-trader-app.apk
Note: Install by allowing Unknown Sources in Android settings.
Minimum subscription: ₹25,000. Transfer directly to Clearing Account UPI: preipo.desk@ybl`,
  },
  {
    id: 'sample_task_scam',
    titleEn: 'Part-Time Task & YouTube Like Scam',
    titleHi: 'यूट्यूब लाइक और टास्क आधारित फ्रॉड',
    category: 'Work From Home',
    preview: 'Earn ₹3,000 to ₹8,000 daily by liking YouTube videos and Google reviews...',
    fullText: `Hello! I am Priya from Global Digital Media HR.
We have part-time work from home opportunity. Just like YouTube videos and write Google reviews.
Earn ₹150 per task, daily earnings ₹3,000 to ₹8,000!
Step 1: Like this video and send screenshot.
Step 2: Join Telegram group t.me/daily_task_payouts to receive payout on UPI.
Step 3: Upgrade to VIP Merchant Task tier by paying ₹3,000 refundable security deposit for 300% bonus return!`,
  },
  {
    id: 'sample_legit_sms',
    titleEn: 'Official Broker Order Alert (Legitimate Comparison)',
    titleHi: 'आधिकारिक ब्रोकर SMS (वैध उदाहरण)',
    category: 'Verified / Legitimate',
    preview: 'NSE Order Executed: Buy 10 shares of INFY @ 1480.00. Funds debited from trading account...',
    fullText: `NSE Order Executed: Bought 10 shares of INFY at Rs 1,480.00 on 03-Oct-2026. Trade ID: 20261003889102. Available trading balance in ledger: Rs 14,210.50. For queries, contact your SEBI registered broker through the official mobile app or visit scores.sebi.gov.in.`,
  },
];
