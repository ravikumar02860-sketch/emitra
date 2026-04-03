import React, { useState, useMemo, Suspense, lazy } from 'react';
import { 
  FileText, 
  Image as ImageIcon, 
  Type, 
  RefreshCw, 
  Wrench, 
  Search, 
  FileUp, 
  Download, 
  Copy, 
  Check, 
  Loader2,
  ArrowRight,
  RotateCw,
  Scissors,
  Merge,
  Maximize,
  Minimize,
  QrCode,
  Hash,
  Calculator,
  Clock,
  Calendar,
  Link,
  Shield,
  Languages,
  FileJson,
  FileCode,
  Binary,
  Activity,
  Volume2,
  Scan,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';

// Lazy load tool components
const MergePDF = lazy(() => import('../components/tools/PDFTools').then(module => ({ default: module.MergePDF })));
const SplitPDF = lazy(() => import('../components/tools/PDFTools').then(module => ({ default: module.SplitPDF })));
const RotatePDF = lazy(() => import('../components/tools/PDFTools').then(module => ({ default: module.RotatePDF })));
const JPGtoPDF = lazy(() => import('../components/tools/PDFTools').then(module => ({ default: module.JPGtoPDF })));
const CompressPDF = lazy(() => import('../components/tools/PDFTools').then(module => ({ default: module.CompressPDF })));
const PDFtoJPG = lazy(() => import('../components/tools/PDFTools').then(module => ({ default: module.PDFtoJPG })));
const PDFtoWord = lazy(() => import('../components/tools/PDFTools').then(module => ({ default: module.PDFtoWord })));
const WordtoPDF = lazy(() => import('../components/tools/PDFTools').then(module => ({ default: module.WordtoPDF })));
const PDFtoText = lazy(() => import('../components/tools/PDFTools').then(module => ({ default: module.PDFtoText })));

const ImageCompressor = lazy(() => import('../components/tools/ImageTools').then(module => ({ default: module.ImageCompressor })));
const ImageResizer = lazy(() => import('../components/tools/ImageTools').then(module => ({ default: module.ImageResizer })));
const ImageConverter = lazy(() => import('../components/tools/ImageTools').then(module => ({ default: module.ImageConverter })));
const ImageToBase64 = lazy(() => import('../components/tools/ImageTools').then(module => ({ default: module.ImageToBase64 })));
const ImageFilters = lazy(() => import('../components/tools/ImageTools').then(module => ({ default: module.ImageFilters })));
const ImageCropper = lazy(() => import('../components/tools/ImageTools').then(module => ({ default: module.ImageCropper })));
const ImageToText = lazy(() => import('../components/tools/ImageTools').then(module => ({ default: module.ImageToText })));

const UnitConverter = lazy(() => import('../components/tools/ConverterTools').then(module => ({ default: module.UnitConverter })));
const JsonCsvConverter = lazy(() => import('../components/tools/ConverterTools').then(module => ({ default: module.JsonCsvConverter })));
const XmlJsonConverter = lazy(() => import('../components/tools/ConverterTools').then(module => ({ default: module.XmlJsonConverter })));
const Base64ToImage = lazy(() => import('../components/tools/ConverterTools').then(module => ({ default: module.Base64ToImage })));

const WordCounter = lazy(() => import('../components/tools/TextTools').then(module => ({ default: module.WordCounter })));
const CaseConverter = lazy(() => import('../components/tools/TextTools').then(module => ({ default: module.CaseConverter })));
const LoremIpsumGenerator = lazy(() => import('../components/tools/TextTools').then(module => ({ default: module.LoremIpsumGenerator })));
const TextToSpeech = lazy(() => import('../components/tools/TextTools').then(module => ({ default: module.TextToSpeech })));
const RemoveDuplicateLines = lazy(() => import('../components/tools/TextTools').then(module => ({ default: module.RemoveDuplicateLines })));
const ReverseText = lazy(() => import('../components/tools/TextTools').then(module => ({ default: module.ReverseText })));
const BinaryConverter = lazy(() => import('../components/tools/TextTools').then(module => ({ default: module.BinaryConverter })));
const JsonFormatter = lazy(() => import('../components/tools/TextTools').then(module => ({ default: module.JsonFormatter })));
const SqlFormatter = lazy(() => import('../components/tools/TextTools').then(module => ({ default: module.SqlFormatter })));
const ExtractEmails = lazy(() => import('../components/tools/TextTools').then(module => ({ default: module.ExtractEmails })));
const ExtractURLs = lazy(() => import('../components/tools/TextTools').then(module => ({ default: module.ExtractURLs })));
const TextToMorse = lazy(() => import('../components/tools/TextTools').then(module => ({ default: module.TextToMorse })));
const MorseToText = lazy(() => import('../components/tools/TextTools').then(module => ({ default: module.MorseToText })));

const PasswordGenerator = lazy(() => import('../components/tools/UtilityTools').then(module => ({ default: module.PasswordGenerator })));
const BMICalculator = lazy(() => import('../components/tools/UtilityTools').then(module => ({ default: module.BMICalculator })));
const AgeCalculator = lazy(() => import('../components/tools/UtilityTools').then(module => ({ default: module.AgeCalculator })));
const DateCalculator = lazy(() => import('../components/tools/UtilityTools').then(module => ({ default: module.DateCalculator })));
const URLShortener = lazy(() => import('../components/tools/UtilityTools').then(module => ({ default: module.URLShortener })));
const QRGenerator = lazy(() => import('../components/tools/UtilityTools').then(module => ({ default: module.QRGenerator })));
const QRScanner = lazy(() => import('../components/tools/UtilityTools').then(module => ({ default: module.QRScanner })));

// Tool categories and their icons
const CATEGORIES = [
  { id: 'all', name: 'All Tools', icon: Wrench },
  { id: 'pdf', name: 'PDF Tools', icon: FileText },
  { id: 'image', name: 'Image Tools', icon: ImageIcon },
  { id: 'text', name: 'Text Tools', icon: Type },
  { id: 'converter', name: 'Converter Tools', icon: RefreshCw },
  { id: 'utility', name: 'Utility Tools', icon: Wrench },
];

const ToolsPage = () => {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const isHi = language === 'hi';

  // Tool definitions
  const tools = useMemo(() => [
    // PDF Tools
    { id: 'merge-pdf', category: 'pdf', icon: Merge, name: 'Merge PDF', desc: 'Combine multiple PDF files into one.' },
    { id: 'split-pdf', category: 'pdf', icon: Scissors, name: 'Split PDF', desc: 'Extract pages from your PDF or split into multiple files.' },
    { id: 'rotate-pdf', category: 'pdf', icon: RotateCw, name: 'Rotate PDF', desc: 'Rotate your PDF pages to the correct orientation.' },
    { id: 'compress-pdf', category: 'pdf', icon: Minimize, name: 'Compress PDF', desc: 'Optimize PDF structure to reduce file size.' },
    { id: 'pdf-to-word', category: 'pdf', icon: FileText, name: 'PDF to Word', desc: 'Convert PDF documents to editable Word files.' },
    { id: 'word-to-pdf', category: 'pdf', icon: FileUp, name: 'Word to PDF', desc: 'Convert Word documents to PDF format.' },
    { id: 'pdf-to-text', category: 'pdf', icon: Type, name: 'PDF to Text', desc: 'Extract plain text from your PDF file.' },
    { id: 'pdf-to-jpg', category: 'pdf', icon: ImageIcon, name: 'PDF to JPG', desc: 'Convert PDF pages into JPG images.' },
    { id: 'jpg-to-pdf', category: 'pdf', icon: FileText, name: 'JPG to PDF', desc: 'Convert JPG images to PDF documents.' },

    // Image Tools
    { id: 'image-compressor', category: 'image', icon: Minimize, name: 'Image Compressor', desc: 'Compress images to reduce file size.' },
    { id: 'image-resizer', category: 'image', icon: Maximize, name: 'Image Resizer', desc: 'Resize images to specific dimensions.' },
    { id: 'image-converter', category: 'image', icon: RefreshCw, name: 'Image Converter', desc: 'Convert images between PNG, JPG, WebP.' },
    { id: 'image-filters', category: 'image', icon: ImageIcon, name: 'Image Filters', desc: 'Apply filters like grayscale, sepia, and blur.' },
    { id: 'image-cropper', category: 'image', icon: Scissors, name: 'Image Cropper', desc: 'Crop images to specific aspect ratios.' },
    { id: 'image-to-text', category: 'image', icon: Type, name: 'Image to Text', desc: 'Extract text from images using OCR.' },
    { id: 'image-to-base64', category: 'image', icon: Binary, name: 'Image to Base64', desc: 'Convert images to Base64 strings.' },
    { id: 'base64-to-image', category: 'image', icon: ImageIcon, name: 'Base64 to Image', desc: 'Convert Base64 strings back to images.' },

    // Text Tools
    { id: 'word-counter', category: 'text', icon: Hash, name: 'Word Counter', desc: 'Count words, characters, and lines in your text.' },
    { id: 'case-converter', category: 'text', icon: Type, name: 'Case Converter', desc: 'Change text case (UPPER, lower, Title, etc.).' },
    { id: 'lorem-ipsum-generator', category: 'text', icon: FileText, name: 'Lorem Ipsum', desc: 'Generate placeholder text for your designs.' },
    { id: 'text-to-speech', category: 'text', icon: Volume2, name: 'Text to Speech', desc: 'Convert text into spoken audio.' },
    { id: 'remove-duplicate-lines', category: 'text', icon: Scissors, name: 'Remove Duplicates', desc: 'Remove duplicate lines from your text.' },
    { id: 'reverse-text', category: 'text', icon: RefreshCw, name: 'Reverse Text', desc: 'Flip your text backwards.' },
    { id: 'binary-converter', category: 'text', icon: Binary, name: 'Binary Converter', desc: 'Convert text to binary and vice versa.' },
    { id: 'json-formatter', category: 'text', icon: FileJson, name: 'JSON Formatter', desc: 'Format and minify JSON data.' },
    { id: 'sql-formatter', category: 'text', icon: FileCode, name: 'SQL Formatter', desc: 'Format SQL queries for readability.' },
    { id: 'extract-emails', category: 'text', icon: Type, name: 'Extract Emails', desc: 'Extract email addresses from any text.' },
    { id: 'extract-urls', category: 'text', icon: Type, name: 'Extract URLs', desc: 'Extract website links from any text.' },
    { id: 'text-to-morse', category: 'text', icon: Binary, name: 'Text to Morse', desc: 'Convert text to Morse code signals.' },
    { id: 'morse-to-text', category: 'text', icon: Binary, name: 'Morse to Text', desc: 'Convert Morse code back to plain text.' },

    // Converter Tools
    { id: 'unit-converter', category: 'converter', icon: RefreshCw, name: 'Unit Converter', desc: 'Convert length, weight, and temperature.' },
    { id: 'json-to-csv', category: 'converter', icon: FileJson, name: 'JSON to CSV', desc: 'Convert JSON data to CSV format.' },
    { id: 'csv-to-json', category: 'converter', icon: FileCode, name: 'CSV to JSON', desc: 'Convert CSV data to JSON format.' },
    { id: 'xml-to-json', category: 'converter', icon: FileCode, name: 'XML to JSON', desc: 'Convert XML data to JSON format.' },

    // Utility Tools
    { id: 'password-gen', category: 'utility', icon: Shield, name: 'Password Generator', desc: 'Create secure, random passwords.' },
    { id: 'qr-generator', category: 'utility', icon: QrCode, name: 'QR Generator', desc: 'Create custom QR codes for URLs or text.' },
    { id: 'qr-scanner', category: 'utility', icon: Scan, name: 'QR Scanner', desc: 'Scan and decode QR codes from images.' },
    { id: 'age-calc', category: 'utility', icon: Calculator, name: 'Age Calculator', desc: 'Calculate your exact age from birth date.' },
    { id: 'date-calc', category: 'utility', icon: Calendar, name: 'Date Calculator', desc: 'Calculate difference between dates or add days.' },
    { id: 'url-shortener', category: 'utility', icon: Link, name: 'URL Shortener', desc: 'Create short, easy to share links.' },
    { id: 'bmi-calc', category: 'utility', icon: Activity, name: 'BMI Calculator', desc: 'Calculate your Body Mass Index.' },
  ], []);

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tool.desc.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
        >
          {t('tools.title')}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl text-slate-500 max-w-2xl mx-auto"
        >
          {t('tools.subtitle')}
        </motion.p>
      </div>

      {/* Search and Filter Section */}
      <div className="mb-12 space-y-8">
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input
            type="text"
            placeholder={t('tools.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all outline-none text-slate-700"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' 
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300 hover:text-indigo-600'
                }`}
              >
                <Icon size={18} />
                {cat.id === 'all' ? (isHi ? 'सभी टूल्स' : 'All Tools') : t(`tools.categories.${cat.id}`)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition-all group flex flex-col h-full"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    <Icon size={24} />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                    {t(`tools.categories.${tool.category}`)}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight">
                  {tool.name}
                </h3>
                <p className="text-sm text-slate-500 mb-6 flex-grow">
                  {tool.desc}
                </p>
                <div className="flex flex-col gap-2 mt-auto">
                  <a
                    href={`/tools/${tool.id}`}
                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    {t('tools.useTool')}
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href={`/guides/${tool.id}`}
                    className="w-full py-2 px-4 bg-white border border-slate-200 text-slate-600 hover:border-indigo-600 hover:text-indigo-600 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <BookOpen size={14} /> {isHi ? 'गाइड देखें' : 'View Guide'}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Tool Modal / Overlay */}
      <AnimatePresence>
        {selectedTool && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTool(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-indigo-50 rounded-lg text-indigo-600">
                    {React.createElement(tools.find(t => t.id === selectedTool)?.icon || Wrench, { size: 20 })}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {tools.find(t => t.id === selectedTool)?.name}
                  </h2>
                </div>
                <button 
                  onClick={() => setSelectedTool(null)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <Wrench size={20} className="rotate-45 text-slate-400" />
                </button>
              </div>
              
              <div className="p-4 sm:p-8 overflow-y-auto">
                <Suspense fallback={
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="animate-spin text-indigo-600 mb-4" size={32} />
                    <p className="text-slate-500 font-medium">Loading tool...</p>
                  </div>
                }>
                  <ToolRenderer toolId={selectedTool} />
                </Suspense>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Tool Renderer Component
export const ToolRenderer = ({ toolId }: { toolId: string }) => {
  switch (toolId) {
    // PDF Tools
    case 'merge-pdf': return <MergePDF />;
    case 'split-pdf': return <SplitPDF />;
    case 'rotate-pdf': return <RotatePDF />;
    case 'compress-pdf': return <CompressPDF />;
    case 'pdf-to-word': return <PDFtoWord />;
    case 'word-to-pdf': return <WordtoPDF />;
    case 'pdf-to-text': return <PDFtoText />;
    case 'pdf-to-jpg': return <PDFtoJPG />;
    case 'jpg-to-pdf': return <JPGtoPDF />;

    // Image Tools
    case 'image-compressor': return <ImageCompressor />;
    case 'image-resizer': return <ImageResizer />;
    case 'image-converter': return <ImageConverter />;
    case 'image-filters': return <ImageFilters />;
    case 'image-cropper': return <ImageCropper />;
    case 'image-to-text': return <ImageToText />;
    case 'image-to-base64': return <ImageToBase64 />;
    case 'base64-to-image': return <Base64ToImage />;
    case 'qr-generator': return <QRGenerator />;

    // Text Tools
    case 'word-counter': return <WordCounter />;
    case 'case-converter': return <CaseConverter />;
    case 'lorem-ipsum-generator': return <LoremIpsumGenerator />;
    case 'text-to-speech': return <TextToSpeech />;
    case 'remove-duplicate-lines': return <RemoveDuplicateLines />;
    case 'reverse-text': return <ReverseText />;
    case 'binary-converter': return <BinaryConverter />;
    case 'json-formatter': return <JsonFormatter />;
    case 'sql-formatter': return <SqlFormatter />;
    case 'extract-emails': return <ExtractEmails />;
    case 'extract-urls': return <ExtractURLs />;
    case 'text-to-morse': return <TextToMorse />;
    case 'morse-to-text': return <MorseToText />;

    // Converter Tools
    case 'unit-converter': return <UnitConverter />;
    case 'json-to-csv': return <JsonCsvConverter mode="json-to-csv" />;
    case 'csv-to-json': return <JsonCsvConverter mode="csv-to-json" />;
    case 'xml-to-json': return <XmlJsonConverter mode="xml-to-json" />;

    // Utility Tools
    case 'password-gen': return <PasswordGenerator />;
    case 'qr-generator': return <QRGenerator />;
    case 'qr-scanner': return <QRScanner />;
    case 'bmi-calc': return <BMICalculator />;
    case 'age-calc': return <AgeCalculator />;
    case 'date-calc': return <DateCalculator />;
    case 'url-shortener': return <URLShortener />;
    
    default:
      return (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Loader2 className="animate-spin" size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900 mb-2">Tool Under Development</h3>
          <p className="text-slate-500">This tool is being implemented. Please check back soon!</p>
        </div>
      );
  }
};

export default ToolsPage;
