import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Home from './pages/Home';
import Scan from './pages/Scan';
import ProductResult from './pages/ProductResult';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/product/:barcode" element={<ProductResult />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
