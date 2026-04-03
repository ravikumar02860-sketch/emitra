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
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const FormsSection = lazy(() => import('./components/FormsSection'));
const ToolsPage = lazy(() => import('./pages/ToolsPage'));
const ToolSEOPage = lazy(() => import('./pages/ToolSEOPage'));
const ToolPage = lazy(() => import('./pages/ToolPage'));
const GuidePage = lazy(() => import('./pages/GuidePage'));
const CategoryPage = lazy(() => import('./pages/CategoryPage'));
const JobsPage = lazy(() => import('./pages/JobsPage'));

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
    content = <JobsPage />;
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
