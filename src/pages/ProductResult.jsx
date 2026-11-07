import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ChevronLeft, AlertTriangle, ShieldCheck, Zap, Info } from 'lucide-react';

const ProductResult = () => {
  const { barcode } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const calculateScore = (grade) => {
    const scores = { a: 95, b: 80, c: 60, d: 40, e: 20 };
    return scores[grade?.toLowerCase()] || 50;
  };

  const getRiskLevel = (score) => {
    if (score >= 80) return { label: 'Healthy', color: 'text-emerald-400', bg: 'bg-emerald-400/10' };
    if (score >= 60) return { label: 'Moderate', color: 'text-yellow-400', bg: 'bg-yellow-400/10' };
    return { label: 'High Risk', color: 'text-red-400', bg: 'bg-red-400/10' };
  };

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://world.openfoodfacts.org/api/v2/product/${barcode}.json`);
        if (response.data.status === 1) {
          setProduct(response.data.product);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        setError('Failed to fetch product data');
      } finally {
        setLoading(false);
      }
    };
    if (barcode) fetchProduct();
  }, [barcode]);

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen bg-slate-950 p-6 flex flex-col items-center justify-center text-center">
      <div className="bg-red-900/20 p-6 rounded-2xl border border-red-500/20">
        <p className="text-red-400 font-bold mb-4">{error}</p>
        <button onClick={() => navigate('/scan')} className="bg-red-500 text-slate-950 font-bold px-6 py-2 rounded-xl">Try Another</button>
      </div>
    </div>
  );

  const score = calculateScore(product.nutriscore_grade);
  const risk = getRiskLevel(score);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 pb-20 font-sans">
      <nav className="p-6 flex items-center gap-4">
        <button onClick={() => navigate('/')} className="bg-slate-900 p-2 rounded-full border border-slate-800"><ChevronLeft size={20} /></button>
        <h1 className="text-lg font-bold">Analysis</h1>
      </nav>

      <main className="px-6 space-y-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
          <img src={product.image_front_url || product.image_url} className="w-full h-64 object-contain rounded-2xl mb-6 bg-slate-950" />
          <h2 className="text-2xl font-bold">{product.product_name}</h2>
          <p className="text-slate-400 text-sm mb-4">{product.brands}</p>
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full font-bold ${risk.bg} ${risk.color}`}>
            {risk.label} Score: {score}/100
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6">
            <h3 className="flex items-center gap-2 text-emerald-400 font-bold mb-4"><Zap size={20}/> Quick Analysis</h3>
            <p className="text-sm leading-relaxed">{product.ingredients_text_en || 'Ingredients info not fully available in database.'}</p>
        </div>

        {score < 60 && (
            <div className="bg-slate-900 border border-red-900/30 rounded-3xl p-6">
                <h3 className="flex items-center gap-2 text-red-400 font-bold mb-4"><AlertTriangle size={20}/> Caution Items</h3>
                <ul className="text-sm space-y-2 text-slate-400">
                    {product.additives_tags?.slice(0, 3).map((tag, i) => (
                        <li key={i} className="flex items-center gap-2">• {tag.replace('en:', '').toUpperCase()}</li>
                    )) || <li className="text-slate-500">None detected specifically</li>}
                </ul>
            </div>
        )}
      </main>
    </div>
  );
};

export default ProductResult;
