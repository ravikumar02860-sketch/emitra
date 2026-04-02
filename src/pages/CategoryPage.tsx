import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { toolSEOContent } from '../data/toolSEOContent';
import { ArrowLeft, ArrowRight, FileText, ImageIcon, Type, RefreshCw, Wrench } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface CategoryPageProps {
  category: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category }) => {
  const { t, language } = useLanguage();
  const isHi = language === 'hi';

  const categoryInfo: Record<string, { title: string; subtitle: string; icon: any }> = {
    'pdf': {
      title: isHi ? 'पीडीएफ टूल्स' : 'PDF Tools',
      subtitle: isHi ? 'सभी पीडीएफ फाइलों को मैनेज करने के लिए बेहतरीन टूल्स।' : 'The best tools to manage all your PDF files.',
      icon: FileText
    },
    'image': {
      title: isHi ? 'इमेज टूल्स' : 'Image Tools',
      subtitle: isHi ? 'इमेज को कंप्रेस, रिसाइज और कन्वर्ट करने के लिए शक्तिशाली टूल्स।' : 'Powerful tools to compress, resize, and convert images.',
      icon: ImageIcon
    },
    'text': {
      title: isHi ? 'टेक्स्ट टूल्स' : 'Text Tools',
      subtitle: isHi ? 'टेक्स्ट को फॉर्मेट और एनालाइज करने के लिए उपयोगी टूल्स।' : 'Useful tools to format and analyze text.',
      icon: Type
    },
    'converter': {
      title: isHi ? 'कन्वर्टर टूल्स' : 'Converter Tools',
      subtitle: isHi ? 'विभिन्न फाइल फॉर्मेट्स के बीच आसानी से कन्वर्ट करें।' : 'Easily convert between different file formats.',
      icon: RefreshCw
    },
    'utility': {
      title: isHi ? 'यूटिलिटी टूल्स' : 'Utility Tools',
      subtitle: isHi ? 'दैनिक कार्यों को आसान बनाने के लिए सहायक टूल्स।' : 'Helpful tools to make daily tasks easier.',
      icon: Wrench
    }
  };

  const info = categoryInfo[category] || categoryInfo['pdf'];
  const Icon = info.icon;

  // Filter tools by category
  // Since toolSEOContent doesn't have category info directly, we might need to map it or use the tools array from ToolsPage.
  // For now, I'll assume we can identify them or I'll just hardcode the mapping for this page.
  
  // Actually, I'll use a simple mapping based on the toolId prefixes or common knowledge of the tools I added.
  const categoryTools = Object.keys(toolSEOContent).filter(id => {
    if (category === 'pdf') return id.includes('pdf') || id === 'jpg-to-pdf' || id === 'word-to-pdf';
    if (category === 'image') return id.includes('image') || id.includes('jpg') || id === 'png-to-jpg';
    if (category === 'text') return id.includes('text') || id.includes('word-counter') || id.includes('case') || id.includes('lorem') || id.includes('json') || id.includes('sql') || id.includes('email') || id.includes('url') || id.includes('morse');
    if (category === 'converter') return id.includes('converter') || id.includes('to-') || id.includes('json') || id.includes('csv') || id.includes('xml');
    if (category === 'utility') return id.includes('password') || id.includes('qr') || id.includes('calc') || id.includes('shortener') || id.includes('bmi');
    return false;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <Helmet>
        <title>{info.title} - Free Online Tools | e-Mitra Portal</title>
        <meta name="description" content={info.subtitle} />
      </Helmet>

      {/* Hero Section */}
      <div className="bg-white border-b border-slate-100 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <a href="/tools" className="inline-flex items-center gap-2 text-indigo-600 font-bold mb-8 hover:gap-3 transition-all">
            <ArrowLeft size={20} /> Back to All Tools
          </a>
          <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Icon size={40} />
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight">
            {info.title}
          </h1>
          <p className="text-xl text-slate-500 max-w-2xl mx-auto">
            {info.subtitle}
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoryTools.map((toolId) => {
            const content = toolSEOContent[toolId];
            return (
              <div key={toolId} className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full">
                <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-indigo-600 transition-colors">
                  {content.toolName}
                </h3>
                <p className="text-slate-500 mb-8 flex-grow leading-relaxed">
                  {content.metaDescription}
                </p>
                <div className="flex flex-col gap-3">
                  <a 
                    href={`/tools/${toolId}`} 
                    className="w-full py-4 px-6 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
                  >
                    Use Tool <ArrowRight size={18} />
                  </a>
                  <a 
                    href={`/guides/${toolId}`} 
                    className="w-full py-4 px-6 bg-slate-50 text-slate-600 rounded-2xl font-bold hover:bg-slate-100 transition-all text-center text-sm"
                  >
                    Read Guide
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
