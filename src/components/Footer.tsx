import React from 'react';
import { Globe, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand */}
        <div className="space-y-6">
          <a href="/index.html" className="flex items-center gap-2 group">
            <div className="p-2 bg-indigo-600 rounded-lg text-white group-hover:rotate-12 transition-transform">
              <Globe size={24} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black text-white tracking-tight leading-none">e-Mitra</span>
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Bhilwara</span>
            </div>
          </a>
          <p className="text-slate-400 text-sm leading-relaxed">
            {t('footer.description')}
          </p>
          <div className="flex gap-4">
            <a href="https://wa.me/916350489219" className="p-2 bg-slate-800 rounded-lg text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all">
              <MessageCircle size={20} />
            </a>
            <a href="tel:+916350489219" className="p-2 bg-slate-800 rounded-lg text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all">
              <Phone size={20} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-bold mb-6">{t('footer.quickLinks')}</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><a href="/index.html" className="hover:text-white transition-colors">{t('nav.home')}</a></li>
            <li><a href="/services.html" className="hover:text-white transition-colors">{t('nav.services')}</a></li>
            <li><a href="/forms.html" className="hover:text-white transition-colors">{t('nav.forms')}</a></li>
            <li><a href="/jobs.html" className="hover:text-white transition-colors">{t('nav.jobs')}</a></li>
            <li><a href="/contact.html" className="hover:text-white transition-colors">{t('nav.contact')}</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-lg font-bold mb-6">{t('nav.services')}</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><a href="/services.html#aadhaar" className="hover:text-white transition-colors">Aadhaar Update</a></li>
            <li><a href="/services.html#pan" className="hover:text-white transition-colors">PAN Card Apply</a></li>
            <li><a href="/services.html#certificates" className="hover:text-white transition-colors">Income Certificate</a></li>
            <li><a href="/services.html#exams" className="hover:text-white transition-colors">Exam Form Filling</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-bold mb-6">{t('footer.contactUs')}</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li className="flex items-start gap-3">
              <MapPin size={18} className="text-indigo-500 flex-shrink-0" />
              <span>New Nagari, Mustafa Nagar, Pur-Bhilwara, Rajasthan</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone size={18} className="text-indigo-500 flex-shrink-0" />
              <span>+91 63504 89219</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail size={18} className="text-indigo-500 flex-shrink-0" />
              <span>murtazadarvesh@gmail.com</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-slate-800 text-center text-slate-500 text-xs space-y-4">
        <p>{t('footer.rights')}</p>
        <div className="flex justify-center gap-4">
          <a href="/sitemap.xml" className="hover:text-white transition-colors">Sitemap</a>
          <a href="/robots.txt" className="hover:text-white transition-colors">Robots.txt</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
