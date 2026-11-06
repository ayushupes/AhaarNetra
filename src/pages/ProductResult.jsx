import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductResult = () => {
  const { barcode } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold">Product: {barcode}</h1>
      <button 
        onClick={() => navigate('/')}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Back
      </button>
    </div>
  );
};

export default ProductResult;
