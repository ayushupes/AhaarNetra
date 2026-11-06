import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Eye, 
  Shield, 
  Camera, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Heart,
  Swords,
  Globe
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from '../components/LanguageToggle';

// Custom Instagram SVG Icon
const InstagramIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

export default function Home({ onStartScan }) {
  const [barcodeInput, setBarcodeInput] = useState('');
  const navigate = useNavigate();

  // Try accessing language context safely
  let t = (key) => key;
  try {
    const langCtx = useLanguage();
    if (langCtx && langCtx.t) t = langCtx.t;
  } catch (e) {
    // Fallback if context is not wrapped
  }

  const handleSearch = (e) => {
    e?.preventDefault();
    if (barcodeInput.trim()) {
      navigate(`/product/${barcodeInput.trim()}`);
    }
  };

  const handleSampleClick = (code) => {
    setBarcodeInput(code);
    navigate(`/product/${code}`);
  };

  const handleCameraClick = () => {
    if (onStartScan) {
      onStartScan();
    } else {
      navigate('/scan');
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1F2937] px-4 py-8 md:px-12 lg:px-20 font-sans selection:bg-[#FF671F] selection:text-white">
      {/* Top Navbar */}
      <nav className="flex justify-between items-center mb-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <div className="bg-[#1F2937] p-2.5 rounded-2xl text-[#FF671F] shadow-md">
            <Heart className="w-6 h-6 fill-[#FF671F]" />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#1F2937]">आहार नेत्र</h1>
            <p className="text-xs font-semibold text-gray-500 tracking-wider">खाने का असली सच • समझो • चुनो • स्वस्थ रहो</p>
          </div>
        </div>
        
        {/* Working Language Toggle */}
        <div className="flex items-center gap-3">
          {LanguageToggle ? <LanguageToggle /> : (
            <div className="bg-white border border-gray-200 rounded-full px-4 py-1.5 text-xs font-bold text-gray-700 shadow-sm flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#FF671F]" />
              <span>EN / हि</span>
            </div>
          )}
        </div>
      </nav>

      {/* Hero + Scanner Split Layout */}
      <main className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center mb-24">
        
        {/* Left Column: Hero Text */}
        <motion.section 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 bg-[#FF671F]/10 border border-[#FF671F]/30 text-[#FF671F] px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
            <Eye className="w-4 h-4" />
            <span>अपना त्रिनेत्र खोलें (Open your Third Eye)</span>
          </div>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.1] text-[#1F2937] tracking-tight">
            Scan karo. <br />
            <span className="text-[#FF671F] underline decoration-[#FF671F]/30 decoration-wavy underline-offset-8">Sach dekho.</span> <br />
            Yoddha bano.
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed font-medium max-w-xl">
            फूड लेबल समझें और सही विकल्प चुनें। इस स्कैनर को अपना 'त्रिनेत्र' बनाएं और जानें कि आपके खाने में वास्तव में क्या है।
          </p>

          <div className="flex flex-wrap gap-4 pt-2 text-sm font-bold text-gray-700">
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
              <Check className="w-4 h-4 text-green-600" /> Free to use
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
              <Check className="w-4 h-4 text-green-600" /> No sign-up
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 shadow-sm">
              <Check className="w-4 h-4 text-green-600" /> Food-first analysis
            </span>
          </div>
        </motion.section>

        {/* Right Column: Floating Scanner Card */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Top Floating Badge */}
          <motion.div 
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-5 right-4 z-20 bg-amber-100 border border-amber-300 text-amber-900 text-xs font-black px-4 py-2 rounded-2xl shadow-lg flex items-center gap-1.5 transform rotate-2"
          >
            <Sparkles className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span>आसान भाषा, साफ़ जवाब</span>
          </motion.div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-100 relative z-10 space-y-6">
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] font-black tracking-widest text-[#FF671F] uppercase">INSTANT FOOD CHECK</p>
                <h3 className="text-xl font-bold text-[#1F2937]">Barcode Scanner</h3>
              </div>
              <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Ready
              </div>
            </div>

            {/* Dark Scanner Visual Area */}
            <div className="bg-[#1F2937] h-52 rounded-2xl relative flex flex-col items-center justify-center overflow-hidden p-4 border border-gray-800 shadow-inner">
              
              {/* Laser Scan Animation Line */}
              <motion.div 
                animate={{ top: ['10%', '85%', '10%'] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="absolute left-1/2 -translate-x-1/2 w-4/5 h-1 bg-[#FF671F] rounded-full shadow-[0_0_15px_#FF671F]"
              />

              {/* Barcode Lines Graphic */}
              <div className="flex gap-1.5 opacity-30 my-auto items-center h-20">
                <div className="w-1 h-full bg-white"></div>
                <div className="w-2 h-full bg-white"></div>
                <div className="w-0.5 h-full bg-white"></div>
                <div className="w-3 h-full bg-white"></div>
                <div className="w-1 h-full bg-white"></div>
                <div className="w-2 h-full bg-white"></div>
                <div className="w-1.5 h-full bg-white"></div>
                <div className="w-3 h-full bg-white"></div>
                <div className="w-1 h-full bg-white"></div>
              </div>

              {/* Camera Launch Button */}
              <button 
                onClick={handleCameraClick}
                className="relative z-10 bg-[#FF671F] hover:bg-[#e05610] text-white font-bold px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition transform active:scale-95 text-sm"
              >
                <Camera className="w-4 h-4 text-white" />
                <span>Camera खोलें</span>
              </button>
            </div>

            {/* Manual Barcode Search */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-gray-500 block">या barcode number डालें</label>
              <form onSubmit={handleSearch} className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="8-14 digit barcode"
                  value={barcodeInput}
                  onChange={(e) => setBarcodeInput(e.target.value)}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#FF671F] focus:ring-1 focus:ring-[#FF671F] transition"
                />
                <button 
                  type="submit"
                  className="bg-[#1F2937] hover:bg-black text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition flex items-center gap-1"
                >
                  <span>Check</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* Sample Buttons */}
            <div className="flex items-center gap-2 pt-1 text-xs font-semibold text-gray-500">
              <span>Try a sample:</span>
              <button 
                onClick={() => handleSampleClick('3017620422003')} 
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-full transition"
              >
                🍫 Nutella
              </button>
              <button 
                onClick={() => handleSampleClick('5449000000996')} 
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1.5 rounded-full transition"
              >
                🥤 Coca-Cola
              </button>
            </div>

          </div>

          {/* Bottom Floating Badge */}
          <motion.div 
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-5 left-4 z-20 bg-white border border-gray-200 text-gray-800 text-xs font-bold px-4 py-2 rounded-2xl shadow-lg flex items-center gap-2"
          >
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Nutrition & ingredients</span>
          </motion.div>
        </motion.section>

      </main>

      {/* Founder Section (@trinetra_tandav) */}
      <motion.section 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 bg-[#FF671F]/10 w-48 h-48 rounded-full blur-3xl -z-0"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          
          {/* Profile Photo */}
          <div className="flex-shrink-0 text-center">
            <div className="relative inline-block">
              <img 
                src="https://ui-avatars.com/api/?name=Ayush+Bajpai&background=1F2937&color=FF671F&size=200" 
                alt="Ayush Bajpai" 
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-[#FF671F] shadow-lg"
              />
              <span className="absolute bottom-2 right-2 bg-[#1F2937] text-white p-2 rounded-full shadow">
                <Swords className="w-4 h-4 text-[#FF671F]" />
              </span>
            </div>
            <h3 className="text-xl font-extrabold mt-3 text-[#1F2937]">Ayush Bajpai</h3>
            <p className="text-xs font-bold text-[#FF671F] tracking-wide uppercase">Founder & Fitness Yoddha</p>
          </div>

          {/* Bio Content */}
          <div className="space-y-4 text-center md:text-left flex-1">
            <div className="inline-block bg-amber-50 text-amber-900 border border-amber-200 text-xs font-black px-3 py-1 rounded-full">
              The Vision Behind Ahaar Netra 🔱
            </div>

            <p className="text-sm sm:text-base font-black text-[#1F2937] italic">
              "साम्ब सदाशिव 🙏 🔱 — Weak Mind → Warrior Body"
            </p>

            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              Trinetra (तीसरा नेत्र) का अर्थ है वो सच देखना जो सामान्य आँखों से छिप जाता है। एक फिटनेस ट्रेनर के रूप में मैंने देखा है कि कैसे सही जानकारी ना होने से हम गलत चीजें चुन लेते हैं। 'Ahaar Netra' आपका वो त्रिनेत्र है, जो फूड लेबल्स का सच आसान भाषा में आपके सामने लाएगा। No Excuses, Only Discipline. ⚔️
            </p>

            <div className="pt-2">
              <a 
                href="https://instagram.com/trinetra_tandav" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#1F2937] to-[#374151] hover:from-[#FF671F] hover:to-[#e05610] text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md transition-all transform active:scale-95"
              >
                <InstagramIcon className="w-4 h-4" />
                <span>Join the Tandav on Instagram</span>
              </a>
            </div>
          </div>

        </div>
      </motion.section>

      {/* Simple Footer */}
      <footer className="max-w-7xl mx-auto mt-20 pt-8 border-t border-gray-200 text-center text-xs text-gray-500 space-y-2">
        <p>Data provided by Open Food Facts • Not medical advice. Consult a doctor for health concerns.</p>
        <p className="font-semibold text-gray-600">Made with ❤️ for better health • Ahaar Netra 🇮🇳</p>
      </footer>

    </div>
  );
}