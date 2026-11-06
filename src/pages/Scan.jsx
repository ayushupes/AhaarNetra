import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Scan = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="fixed inset-0 bg-black flex flex-col z-50">
      <div className="p-4 flex justify-between items-center text-white">
        <span className="font-medium">{t('scanInstructionCamera')}</span>
        <button onClick={() => navigate('/')}><X /></button>
      </div>
      <div className="flex-1 flex items-center justify-center border-4 border-dashed border-green-500 m-4 rounded-xl">
        {/* html5-qrcode implementation goes here */}
        <p className="text-white">Camera Preview Placeholder</p>
      </div>
    </div>
  );
};

export default Scan;
