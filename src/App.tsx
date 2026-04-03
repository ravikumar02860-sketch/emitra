import React, { useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import { 
  Fingerprint, 
  CreditCard, 
  FileEdit, 
  ShieldCheck, 
  Car, 
  Home as HomeIcon, 
  ExternalLink, 
  MessageCircle, 
  Download, 
  MapPin, 
  Phone, 
  Mail, 
  Clock,
  Sprout,
  CookingPot,
  Zap,
  Activity,
  Accessibility,
  Loader2
} from 'lucide-react';
import { useLanguage } from './context/LanguageContext';

// Lazy load pages
const Home = lazy(() => import('./pages/Home'));
const FormsSection = lazy(() => import('./components/FormsSection'));
const ToolsPage = lazy(() => import('./pages/ToolsPage'));
const ToolSEOPage = lazy(() => import('./pages/ToolSEOPage'));
const ToolPage = lazy(() => import('./pages/ToolPage'));
const GuidePage = lazy(() => import('./pages/GuidePage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));

const ServiceDetail = ({ id, title, icon: Icon, about, who, docs, steps, notes, website, searchQuery }: any) => {
  const { t } = useLanguage();
  return (
    <div id={id} className="scroll-mt-24 mb-20 bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-8 md:p-12">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600">
            <Icon size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-900">{title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{t('services.aboutTitle')}</h3>
              <p className="text-slate-600 leading-relaxed">{about}</p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{t('services.whoTitle')}</h3>
              <p className="text-slate-600 leading-relaxed">{who}</p>
            </section>

            <section>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{t('services.docsTitle')}</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {docs.map((doc: string, i: number) => (
                  <li key={i} className="flex items-center gap-2 text-slate-600 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    {doc}
                  </li>
                ))}
              </ul>
            </section>

            {notes && (
              <section>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{t('services.notesTitle')}</h3>
                <p className="text-slate-600 text-sm italic leading-relaxed">{notes}</p>
              </section>
            )}
          </div>

          <div className="space-y-8">
            <section className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-4">{t('services.processTitle')}</h3>
              <div className="space-y-4">
                {steps.map((step: string, i: number) => (
                  <div key={i} className="flex gap-4">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <p className="text-slate-600 text-sm leading-snug">{step}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="flex flex-col gap-4">
              <a 
                href={website} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-indigo-600 font-bold hover:underline"
              >
                {t('services.officialLink')} <ExternalLink size={16} />
              </a>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href={`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-4 rounded-xl font-bold hover:bg-slate-800 transition-colors"
                >
                  <Download size={20} /> {t('forms.openPdf')}
                </a>
                <a 
                  href={`https://wa.me/916350489219?text=${encodeURIComponent(`Hello, I need help with ${title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-emerald-500 text-white px-6 py-4 rounded-xl font-bold hover:bg-emerald-600 transition-colors"
                >
                  <MessageCircle size={20} /> {t('forms.whatsappHelp')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesPage = () => {
  const { t, language } = useLanguage();
  const isHi = language === 'hi';

  const detailedServices = [
    {
      id: 'aadhaar',
      title: isHi ? 'आधार सेवाएं (Aadhaar Services)' : 'Aadhaar Services (आधार सेवाएं)',
      icon: Fingerprint,
      about: isHi 
        ? 'आधार कार्ड UIDAI द्वारा जारी एक अद्वितीय 12-अंकीय पहचान संख्या है। हमारे ई-मित्र केंद्र पर आप आधार अपडेट और सुधार आसानी से करवा सकते हैं। हम भीलवाड़ा में बेहतरीन आधार अपडेट सेवाएं प्रदान करते हैं।' 
        : 'Aadhaar card is a unique 12-digit identity number issued by UIDAI. Hamare e-Mitra center par aap Aadhaar update aur correction aasanise karwa sakte hain. We provide the best Aadhaar update Bhilwara services.',
      who: isHi ? 'कोई भी भारतीय निवासी (Any Indian resident)।' : 'Any Indian resident (कोई भी भारतीय निवासी).',
      docs: isHi 
        ? ['आधार कार्ड', 'मोबाइल नंबर', 'पते का प्रमाण (वोटर आईडी/राशन कार्ड)', 'जन्म तिथि का प्रमाण']
        : ['Aadhaar Card', 'Mobile number', 'Address proof (Voter ID/Ration Card)', 'Date of Birth proof'],
      steps: isHi
        ? [
            'भीलवाड़ा में हमारे ई-मित्र केंद्र पर आएं',
            'सत्यापन के लिए आवश्यक दस्तावेज प्रदान करें',
            'बायोमेट्रिक सत्यापन या ओटीपी प्रक्रिया',
            'पोर्टल पर अपडेट अनुरोध सबमिट करें',
            'ट्रैकिंग के लिए पावती पर्ची प्राप्त करें'
          ]
        : [
            'Visit our e-Mitra center in Bhilwara (हमारे केंद्र पर आएं)',
            'Provide required documents for verification (दस्तावेज जमा करें)',
            'Biometric verification or OTP process (बायोमेट्रिक या ओटीपी वेरिफिकेशन)',
            'Submit update request on portal (पोर्टल पर रिक्वेस्ट सबमिट करें)',
            'Receive acknowledgement slip for tracking (रसीद प्राप्त करें)'
          ],
      website: 'https://uidai.gov.in/',
      searchQuery: 'Aadhaar update form pdf'
    },
    {
      id: 'pan',
      title: isHi ? 'पैन कार्ड सेवाएं (PAN Card Services)' : 'PAN Card Services (पैन कार्ड)',
      icon: CreditCard,
      about: isHi
        ? 'वित्तीय लेनदेन और कर उद्देश्यों के लिए स्थायी खाता संख्या (PAN) आवश्यक है। हम नया पैन कार्ड बनवाने और पुराने में सुधार करने में मदद करते हैं। यहाँ तेज़ पैन कार्ड सेवा भीलवाड़ा प्राप्त करें।'
        : 'Permanent Account Number (PAN) is essential for financial transactions and tax purposes. Hum naya PAN card banwane aur purane mein sudhaar karne mein help karte hain. Get fast PAN card service Bhilwara here.',
      who: isHi ? 'व्यक्ति, कंपनियां और ट्रस्ट।' : 'Individuals, companies, and trusts (व्यक्ति, कंपनियां और ट्रस्ट).',
      docs: isHi
        ? ['आधार कार्ड', '2 पासपोर्ट साइज फोटो', 'मोबाइल नंबर', 'जन्म तिथि का प्रमाण']
        : ['Aadhaar Card', '2 Passport size photos', 'Mobile number', 'Date of Birth proof'],
      steps: isHi
        ? [
            'हमारे केंद्र पर फॉर्म 49A भरें',
            'फोटो और आवश्यक दस्तावेज संलग्न करें',
            'आवेदन जमा करें और शुल्क का भुगतान करें',
            '15-अंकीय पावती संख्या प्राप्त करें',
            'पैन कार्ड डाक द्वारा आपके पते पर वितरित किया जाएगा'
          ]
        : [
            'Fill Form 49A at our center (फॉर्म 49A भरें)',
            'Attach photos and required documents (फोटो और दस्तावेज लगाएं)',
            'Submit application and pay fee (आवेदन जमा करें और शुल्क दें)',
            'Receive 15-digit acknowledgement number (रसीद प्राप्त करें)',
            'PAN card delivered to your address by post (पैन कार्ड डाक से आएगा)'
          ],
      website: 'https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html',
      searchQuery: 'PAN card application form 49A pdf'
    },
    {
      id: 'exams',
      title: isHi ? 'परीक्षा फॉर्म (Exam Forms)' : 'Exam Forms (परीक्षा फॉर्म)',
      icon: FileEdit,
      about: isHi
        ? 'हम सभी सरकारी नौकरी और प्रवेश परीक्षाओं के ऑनलाइन फॉर्म भरते हैं। हम REET, CET, SSC, रेलवे आदि के लिए पेशेवर ऑनलाइन फॉर्म फिलिंग भीलवाड़ा प्रदान करते हैं।'
        : 'Hum sabhi sarkari naukri aur entrance exams ke online forms bharte hain. We offer professional online form filling Bhilwara for REET, CET, SSC, Railway, etc.',
      who: isHi ? 'पात्रता मानदंड पूरा करने वाले छात्र।' : 'Students meeting eligibility criteria (पात्र छात्र).',
      docs: isHi
        ? ['मार्क्सशीट (10वीं, 12वीं, डिग्री)', 'आधार कार्ड', 'स्कैन की गई फोटो और हस्ताक्षर', 'जाति प्रमाण पत्र (यदि लागू हो)']
        : ['Marksheets (10th, 12th, Degree)', 'Aadhaar Card', 'Scanned Photo & Signature', 'Caste Certificate (if applicable)'],
      steps: isHi
        ? [
            'उस परीक्षा का चयन करें जिसके लिए आप आवेदन करना चाहते हैं',
            'शैक्षिक और व्यक्तिगत विवरण प्रदान करें',
            'स्कैन की गई फोटो और हस्ताक्षर अपलोड करें',
            'परीक्षा शुल्क का सुरक्षित ऑनलाइन भुगतान करें',
            'रिकॉर्ड के लिए अंतिम आवेदन पत्र प्रिंट करें'
          ]
        : [
            'Select the exam you want to apply for (परीक्षा का चयन करें)',
            'Provide educational and personal details (शैक्षणिक विवरण दें)',
            'Upload scanned photo and signature (फोटो और साइन अपलोड करें)',
            'Pay exam fee online securely (ऑनलाइन फीस जमा करें)',
            'Print final application form for records (फाइनल प्रिंट प्राप्त करें)'
          ],
      website: 'https://sso.rajasthan.gov.in/',
      searchQuery: 'Government exam application form pdf'
    },
    {
      id: 'certificates',
      title: isHi ? 'प्रमाण पत्र सेवाएं (Certificate Services)' : 'Certificate Services (प्रमाण पत्र)',
      icon: ShieldCheck,
      about: isHi
        ? 'छात्रवृत्ति और सरकारी योजनाओं के लिए मूल निवास (Domicile), जाति (Caste) और आय (Income) प्रमाण पत्र आवश्यक हैं। हम इनके आवेदन में पूरी मदद करते हैं।'
        : 'Domicile (Mool Niwas), Caste (Jati), and Income certificates are essential for scholarships and government schemes. Hum inke aavedan mein poori madad karte hain.',
      who: isHi ? 'राजस्थान के निवासी।' : 'Residents of Rajasthan (राजस्थान के निवासी).',
      docs: isHi
        ? ['आधार कार्ड', 'जन आधार', 'राशन कार्ड', 'पुराने प्रमाण पत्र (यदि कोई हो)', 'स्व-घोषणा पत्र']
        : ['Aadhaar Card', 'Jan Aadhaar', 'Ration Card', 'Old certificates (if any)', 'Self-declaration form'],
      steps: isHi
        ? [
            'हमारे केंद्र पर ई-मित्र पोर्टल के माध्यम से आवेदन करें',
            'पटवारी या तहसीलदार द्वारा सत्यापन',
            'अधिकृत अधिकारी द्वारा डिजिटल हस्ताक्षर',
            'अंतिम प्रमाण पत्र डाउनलोड और प्रिंट करें'
          ]
        : [
            'Apply through e-Mitra portal at our center (ई-मित्र पोर्टल पर आवेदन)',
            'Verification by Patwari or Tehsildar (पटवारी या तहसीलदार द्वारा जांच)',
            'Digital signature by authorized officer (डिजिटल हस्ताक्षर)',
            'Download and print the final certificate (सर्टिफिकेट प्रिंट करें)'
          ],
      website: 'https://emitra.rajasthan.gov.in/',
      searchQuery: 'Caste Domicile Income certificate form Rajasthan pdf'
    },
    {
      id: 'driving',
      title: isHi ? 'ड्राइविंग लाइसेंस (Driving Licence)' : 'Driving Licence (ड्राइविंग लाइसेंस)',
      icon: Car,
      about: isHi
        ? 'नया ड्राइविंग लाइसेंस बनवाने या रिन्यू करने के लिए हमारे केंद्र पर संपर्क करें। हम लर्नर और परमानेंट DL दोनों में मदद करते हैं।'
        : 'Naya driving licence banwane ya renew karne ke liye hamare center par sampark karein. Hum Learner aur Permanent DL dono mein help karte hain.',
      who: isHi ? '18 वर्ष से अधिक आयु (बिना गियर वाले 16+)।' : 'Persons aged 18+ (gearless 16+) (18 वर्ष से अधिक आयु).',
      docs: isHi
        ? ['आधार कार्ड', 'ब्लड ग्रुप रिपोर्ट', '2 पासपोर्ट साइज फोटो', 'पते का प्रमाण']
        : ['Aadhaar Card', 'Blood Group report', '2 Passport size photos', 'Address proof'],
      steps: isHi
        ? [
            'पहले लर्नर लाइसेंस के लिए आवेदन करें',
            'ऑनलाइन ट्रैफिक नियमों का टेस्ट पास करें',
            '30 दिनों के बाद स्थायी लाइसेंस के लिए आवेदन करें',
            'RTO में ड्राइविंग टेस्ट पूरा करें',
            'अपने घर पर डाक द्वारा DL प्राप्त करें'
          ]
        : [
            'Apply for Learner\'s Licence first (लर्नर लाइसेंस के लिए आवेदन)',
            'Clear the online traffic rules test (ऑनलाइन टेस्ट दें)',
            'Apply for Permanent Licence after 30 days (स्थायी लाइसेंस के लिए आवेदन)',
            'Complete driving test at RTO (RTO में ड्राइविंग टेस्ट)',
            'Receive DL by post at your home (लाइसेंस डाक से प्राप्त करें)'
          ],
      website: 'https://parivahan.gov.in/',
      searchQuery: 'Driving licence application form pdf'
    },
    {
      id: 'scholarship',
      title: isHi ? 'छात्रवृत्ति फॉर्म (Scholarship Forms)' : 'Scholarship Forms (छात्रवृत्ति)',
      icon: FileEdit,
      about: isHi
        ? 'हम उत्तर मैट्रिक छात्रवृत्ति (Post Metric Scholarship) और अन्य सभी सरकारी छात्रवृत्ति फॉर्म भरते हैं। हम सुनिश्चित करते हैं कि आपके सभी दस्तावेज सही हों ताकि छात्रवृत्ति समय पर मिल सके।'
        : 'We fill Post Metric Scholarship and all other government scholarship forms. We ensure all your documents are correct so you receive your scholarship on time.',
      who: isHi ? 'SC, ST, OBC, SBC, EBC और अल्पसंख्यक छात्र।' : 'SC, ST, OBC, SBC, EBC, and Minority students (पात्र छात्र).',
      docs: isHi
        ? ['जन आधार कार्ड', 'आधार कार्ड', 'आय प्रमाण पत्र (नया)', 'जाति प्रमाण पत्र', 'मूल निवास', 'अंतिम वर्ष की मार्कशीट', 'फीस की रसीद']
        : ['Jan Aadhaar Card', 'Aadhaar Card', 'Income Certificate (New)', 'Caste Certificate', 'Domicile Certificate', 'Last year Marksheet', 'Fee Receipt'],
      steps: isHi
        ? [
            'SJE पोर्टल पर लॉगिन करें',
            'छात्रवृत्ति योजना का चयन करें',
            'व्यक्तिगत और शैक्षणिक विवरण भरें',
            'मार्कशीट और फीस रसीद अपलोड करें',
            'आवेदन सबमिट करें और रसीद प्राप्त करें'
          ]
        : [
            'Login to SJE portal (SJE पोर्टल पर लॉगिन)',
            'Select scholarship scheme (योजना चुनें)',
            'Fill personal and academic details (विवरण भरें)',
            'Upload marksheet and fee receipt (दस्तावेज अपलोड करें)',
            'Submit application and get receipt (आवेदन जमा करें)'
          ],
      notes: isHi 
        ? 'छात्रवृत्ति के लिए जन आधार में बैंक खाता और आय अपडेट होना अनिवार्य है।'
        : 'Bank account and income must be updated in Jan Aadhaar for scholarship.',
      website: 'https://sjms.rajasthan.gov.in/',
      searchQuery: 'Rajasthan scholarship form documents list pdf'
    },
    {
      id: 'birth-death',
      title: isHi ? 'जन्म और मृत्यु प्रमाण पत्र (Birth & Death Certificate)' : 'Birth & Death Certificate (जन्म/मृत्यु)',
      icon: ShieldCheck,
      about: isHi
        ? 'जन्म और मृत्यु का पंजीकरण कानूनी रूप से अनिवार्य है। हम पहचान पोर्टल के माध्यम से नए प्रमाण पत्र के लिए आवेदन करने और पुराने में सुधार करने में मदद करते हैं।'
        : 'Registration of birth and death is legally mandatory. We help in applying for new certificates and correcting old ones through the Pehchan portal.',
      who: isHi ? 'राजस्थान के सभी नागरिक।' : 'All citizens of Rajasthan (राजस्थान के सभी नागरिक).',
      docs: isHi
        ? ['अस्पताल की रसीद (यदि हो)', 'माता-पिता का आधार कार्ड', 'शपथ पत्र (यदि देरी हो)', 'गवाहों के आईडी प्रूफ']
        : ['Hospital receipt (if any)', 'Parents Aadhaar Card', 'Affidavit (if delayed)', 'Witness ID proofs'],
      steps: isHi
        ? [
            'पहचान पोर्टल पर विवरण भरें',
            'आवश्यक दस्तावेज और शपथ पत्र अपलोड करें',
            'रजिस्ट्रार द्वारा सत्यापन',
            'डिजिटल रूप से हस्ताक्षरित प्रमाण पत्र प्राप्त करें'
          ]
        : [
            'Fill details on Pehchan portal (पोर्टल पर विवरण भरें)',
            'Upload required documents and affidavit (दस्तावेज अपलोड करें)',
            'Verification by Registrar (रजिस्ट्रार द्वारा जांच)',
            'Get digitally signed certificate (सर्टिफिकेट प्राप्त करें)'
          ],
      notes: isHi
        ? 'जन्म या मृत्यु के 21 दिनों के भीतर पंजीकरण कराना सबसे आसान है। उसके बाद शपथ पत्र की आवश्यकता होती है।'
        : 'Registration within 21 days is easiest. After that, an affidavit is required.',
      website: 'https://pehchan.raj.nic.in/',
      searchQuery: 'Birth Death certificate application form Rajasthan pdf'
    },
    {
      id: 'schemes',
      title: isHi ? 'सरकारी योजनाएं (Government Schemes)' : 'Government Schemes (सरकारी योजनाएं)',
      icon: HomeIcon,
      about: isHi
        ? 'पीएम किसान, जन आधार, चिरंजीवी योजना और पेंशन योजनाओं के लिए आवेदन करें। हम सुनिश्चित करते हैं कि आपको सरकारी सेवाओं का पूरा लाभ मिले।'
        : 'Apply for PM Kisan, Jan Aadhaar, Chiranjeevi Yojana, and Pension schemes. Hum ensure karte hain ki aapko government services near me ka poora labh mile.',
      who: isHi ? 'योजना के अनुसार पात्र लाभार्थी।' : 'Eligible beneficiaries as per scheme (पात्र लाभार्थी).',
      docs: isHi
        ? ['जन आधार कार्ड', 'आधार कार्ड', 'बैंक पासबुक', 'आय प्रमाण दस्तावेज']
        : ['Jan Aadhaar Card', 'Aadhaar Card', 'Bank Passbook', 'Income proof documents'],
      steps: isHi
        ? [
            'विशिष्ट योजना के लिए पात्रता जांचें',
            'योजना विशिष्ट आवेदन पत्र भरें',
            'बैंक और पहचान प्रमाण संलग्न करें',
            'विभाग सत्यापन के लिए जमा करें',
            'ऑनलाइन आवेदन स्थिति ट्रैक करें'
          ]
        : [
            'Check eligibility for specific scheme (योजना की पात्रता जांचें)',
            'Fill the scheme specific application form (फॉर्म भरें)',
            'Attach bank and identity proofs (दस्तावेज़ लगाएं)',
            'Submit for department verification (वेरिफिकेशन के लिए भेजें)',
            'Track application status online (स्टेटस ट्रैक करें)'
          ],
      website: 'https://jansoochna.rajasthan.gov.in/',
      searchQuery: 'Rajasthan government scheme application form pdf'
    },
    {
      id: 'kusum-yojana',
      title: isHi ? 'कुसुम योजना (Kusum Yojana)' : 'Kusum Yojana (Solar Pump)',
      icon: Sprout,
      about: isHi
        ? 'कुसुम योजना के तहत किसानों को सिंचाई के लिए सौर ऊर्जा पंप (Solar Pump) पर भारी सब्सिडी दी जाती है। हम इसके ऑनलाइन आवेदन और आवश्यक दस्तावेजों में मदद करते हैं।'
        : 'Under Kusum Yojana, farmers are given heavy subsidies on solar energy pumps for irrigation. We help with online applications and required documents.',
      who: isHi ? 'राजस्थान के किसान जिनके पास स्वयं की कृषि भूमि है।' : 'Farmers of Rajasthan with their own agricultural land (किसान).',
      docs: isHi
        ? ['भूमि रिकॉर्ड (जमाबंदी)', 'आधार कार्ड', 'जन आधार', 'बैंक पासबुक', 'मोबाइल नंबर']
        : ['Land Records (Jamabandi)', 'Aadhaar Card', 'Jan Aadhaar', 'Bank Passbook', 'Mobile Number'],
      steps: isHi
        ? [
            'आधिकारिक कुसुम पोर्टल पर पंजीकरण करें',
            'भूमि और सिंचाई विवरण भरें',
            'आवश्यक दस्तावेज अपलोड करें',
            'पंप के प्रकार का चयन करें',
            'आवेदन शुल्क जमा करें'
          ]
        : [
            'Register on official Kusum portal (पोर्टल पर पंजीकरण)',
            'Fill land and irrigation details (भूमि विवरण भरें)',
            'Upload required documents (दस्तावेज अपलोड करें)',
            'Select pump type (पंप का चयन करें)',
            'Submit application fee (शुल्क जमा करें)'
          ],
      notes: isHi
        ? 'इस योजना में सब्सिडी पहले आओ-पहले पाओ के आधार पर दी जाती है।'
        : 'Subsidy in this scheme is given on a first-come, first-served basis.',
      website: 'https://rreda.org.in/',
      searchQuery: 'Kusum Yojana Rajasthan application form pdf'
    },
    {
      id: 'surya-ghar',
      title: isHi ? 'पीएम सूर्य घर योजना (Surya Ghar Yojana)' : 'Surya Ghar Yojana (Solar Rooftop)',
      icon: Zap,
      about: isHi
        ? 'पीएम सूर्य घर मुफ्त बिजली योजना के तहत अपने घर की छत पर सोलर पैनल लगवाएं और 300 यूनिट तक मुफ्त बिजली पाएं। हम सब्सिडी आवेदन में आपकी मदद करते हैं।'
        : 'Install solar panels on your roof under PM Surya Ghar Muft Bijli Yojana and get up to 300 units of free electricity. We help you with the subsidy application.',
      who: isHi ? 'सभी घरेलू बिजली उपभोक्ता।' : 'All residential electricity consumers (घरेलू उपभोक्ता).',
      docs: isHi
        ? ['नवीनतम बिजली बिल', 'आधार कार्ड', 'बैंक पासबुक', 'छत की फोटो']
        : ['Latest Electricity Bill', 'Aadhaar Card', 'Bank Passbook', 'Photo of Rooftop'],
      steps: isHi
        ? [
            'पीएम सूर्य घर पोर्टल पर पंजीकरण करें',
            'बिजली उपभोक्ता विवरण भरें',
            'सोलर वेंडर का चयन करें',
            'स्थापना के बाद सब्सिडी के लिए आवेदन करें'
          ]
        : [
            'Register on PM Surya Ghar portal (पोर्टल पर पंजीकरण)',
            'Fill electricity consumer details (उपभोक्ता विवरण भरें)',
            'Select solar vendor (वेंडर चुनें)',
            'Apply for subsidy after installation (सब्सिडी आवेदन)'
          ],
      notes: isHi
        ? 'सब्सिडी सीधे आपके बैंक खाते में जमा की जाएगी।'
        : 'Subsidy will be directly credited to your bank account.',
      website: 'https://pmsuryaghar.gov.in/',
      searchQuery: 'PM Surya Ghar Yojana application form pdf'
    }
  ];

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">{t('services.pageTitle')}</h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          {t('services.pageSubtitle')}
        </p>
      </div>
      
      <div className="space-y-12">
        {detailedServices.map((service) => (
          <ServiceDetail key={service.id} {...service} />
        ))}
      </div>
    </div>
  );
};

const ContactPage = () => {
  const { t } = useLanguage();
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">{t('contact.title')}</h1>
        <p className="text-xl text-slate-500">{t('contact.subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8">
            <div className="flex items-start gap-6">
              <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('contact.addressTitle')}</h3>
                <p className="text-slate-600 leading-relaxed">
                  {t('contact.address')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600">
                <Phone size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('contact.phoneTitle')}</h3>
                <p className="text-slate-600">+91 63504 89219</p>
                <p className="text-slate-400 text-sm">{t('contact.availableTitle')}: 9:00 AM - 8:00 PM</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600">
                <Mail size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('contact.emailTitle')}</h3>
                <p className="text-slate-600">murtazadarvesh@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="p-4 bg-indigo-50 rounded-2xl text-indigo-600">
                <Clock size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{t('contact.hoursTitle')}</h3>
                <p className="text-slate-600">{t('contact.hours')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="h-[500px] rounded-3xl overflow-hidden shadow-sm border border-slate-100">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14467.44754746654!2d74.583333!3d25.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3968c23637639955%3A0x3f4291069024097!2sPur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1711800000000!5m2!1sen!2sin" 
            width="100%" 
            height="100%" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="e-Mitra Bhilwara Location"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

function App() {
  const pathname = window.location.pathname;
  const hash = window.location.hash;

  // Scroll to top or to hash element
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  let content;
  if (pathname.endsWith('services.html') || pathname === '/services' || pathname === '/services.html') {
    content = <ServicesPage />;
  } else if (pathname.endsWith('forms.html') || pathname === '/forms' || pathname === '/forms.html') {
    content = <FormsSection />;
  } else if (pathname.endsWith('contact.html') || pathname === '/contact' || pathname === '/contact.html') {
    content = <ContactPage />;
  } else if (pathname.endsWith('tools.html') || pathname === '/tools' || pathname === '/tools.html') {
    content = <ToolsPage />;
  } else if (pathname.endsWith('jobs.html') || pathname === '/jobs' || pathname === '/jobs.html') {
    content = <Home />; // Default to Home if jobs page is not explicitly defined yet
  } else if (pathname.startsWith('/tools/')) {
    const toolId = pathname.split('/').pop()?.replace('.html', '');
    content = <ToolPage toolId={toolId} />;
  } else if (pathname.startsWith('/guides/')) {
    const toolId = pathname.split('/').pop()?.replace('.html', '');
    content = <GuidePage toolId={toolId} />;
  } else if (pathname === '/pdf-tools') {
    content = <CategoryPage category="pdf" />;
  } else if (pathname === '/image-tools') {
    content = <CategoryPage category="image" />;
  } else if (pathname === '/text-tools') {
    content = <CategoryPage category="text" />;
  } else if (pathname === '/converter-tools') {
    content = <CategoryPage category="converter" />;
  } else if (pathname === '/utility-tools') {
    content = <CategoryPage category="utility" />;
  } else if (pathname.includes('-tool.html') || pathname.endsWith('-tool')) {
    const toolId = pathname.split('/').pop()?.replace('-tool.html', '').replace('-tool', '');
    content = <ToolSEOPage toolId={toolId} />;
  } else {
    content = <Home />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Header />
      <main className="flex-grow">
        <Suspense fallback={
          <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
            <p className="text-slate-500 font-medium text-lg">Loading...</p>
          </div>
        }>
          {content}
        </Suspense>
      </main>
      <ChatBot />
      <Footer />
    </div>
  );
}

export default App;
