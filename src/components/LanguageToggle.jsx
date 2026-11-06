import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  return (
    <select 
      value={lang} 
      onChange={(e) => setLang(e.target.value)}
      className="bg-white border border-[#1F2937] text-[#1F2937] px-3 py-1.5 rounded-full text-xs font-bold shadow-sm focus:outline-none cursor-pointer"
    >
      <option value="en">EN (English)</option>
      <option value="hi">हि (Hindi)</option>
      <option value="es">ES (Español)</option>
    </select>
  );
};

export default LanguageToggle;
