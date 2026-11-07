import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';

export default function Scan() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('camera'); // 'camera' | 'manual'
  const [manualBarcode, setManualBarcode] = useState('');
  const [cameraError, setCameraError] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);

  // Stop camera stream safely
  const stopCamera = async () => {
    if (scannerRef.current) {
      try {
        if (scannerRef.current.isScanning) {
          await scannerRef.current.stop();
        }
        scannerRef.current.clear();
      } catch (err) {
        console.warn("Scanner cleanup warning:", err);
      } finally {
        scannerRef.current = null;
        setIsScanning(false);
      }
    }
  };

  // Start camera stream safely
  const startCamera = async () => {
    setCameraError(null);
    await stopCamera(); // Stop any existing instance

    const element = document.getElementById("qr-reader");
    if (!element) {
      setCameraError("Scanner element not ready in DOM.");
      return;
    }

    try {
      const html5QrCode = new Html5Qrcode("qr-reader");
      scannerRef.current = html5QrCode;

      const config = { fps: 10, qrbox: { width: 250, height: 180 } };

      await html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          // Success callback
          stopCamera();
          navigate(`/product/${decodedText}`);
        },
        (errorMessage) => {
          // Scanning in progress (ignore normal frame read failures)
        }
      );
      setIsScanning(true);
    } catch (err) {
      console.error("Camera Start Error:", err);
      setIsScanning(false);
      if (err.toString().includes("NotAllowedError") || err.toString().includes("Permission")) {
        setCameraError("Camera access denied. Please allow camera permissions in browser address bar.");
      } else if (err.toString().includes("NotFoundError")) {
        setCameraError("No camera hardware found on this device.");
      } else {
        setCameraError("Could not start camera. Try restarting browser or using manual search.");
      }
    }
  };

  // Auto handle camera based on tab
  useEffect(() => {
    if (activeTab === 'camera') {
      // Small timeout ensures DOM element #qr-reader is mounted before initializing
      const timer = setTimeout(() => {
        startCamera();
      }, 300);
      return () => {
        clearTimeout(timer);
        stopCamera();
      };
    } else {
      stopCamera();
    }
  }, [activeTab]);

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualBarcode.trim()) {
      stopCamera();
      navigate(`/product/${manualBarcode.trim()}`);
    }
  };

  // File Upload Barcode Handler
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const html5QrCode = new Html5Qrcode("qr-reader-file-fallback");
      const decodedText = await html5QrCode.scanFile(file, true);
      html5QrCode.clear();
      navigate(`/product/${decodedText}`);
    } catch (err) {
      alert("Could not read barcode from image. Try a clearer photo or enter number manually.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 flex flex-col items-center justify-center">
      {/* Hidden container for file fallback scan */}
      <div id="qr-reader-file-fallback" className="hidden"></div>

      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
        <h2 className="text-xl font-extrabold text-center mb-1 text-emerald-400">AhaarNetra Scanner</h2>
        <p className="text-slate-400 text-xs text-center mb-6">Scan product barcode to view nutritional details</p>

        {/* Clean Tab Selector */}
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-slate-800 mb-6">
          <button
            onClick={() => setActiveTab('camera')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              activeTab === 'camera' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            📷 Live Scanner
          </button>
          <button
            onClick={() => setActiveTab('manual')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
              activeTab === 'manual' ? 'bg-emerald-500 text-slate-950 shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            ⌨️ Manual Search
          </button>
        </div>

        {/* TAB 1: LIVE CAMERA SCANNER */}
        {activeTab === 'camera' && (
          <div className="space-y-4">
            <div className="relative w-full h-64 bg-slate-950 border-2 border-dashed border-slate-800 rounded-2xl overflow-hidden flex flex-col items-center justify-center">
              
              {/* Target div for scanner */}
              <div id="qr-reader" className="w-full h-full"></div>

              {/* Error Message Box */}
              {cameraError && (
                <div className="absolute inset-0 bg-slate-950/95 p-4 flex flex-col items-center justify-center text-center">
                  <p className="text-red-400 text-xs mb-4">{cameraError}</p>
                  <button
                    onClick={startCamera}
                    className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold px-4 py-2 rounded-xl border border-slate-700"
                  >
                    Retry Camera
                  </button>
                </div>
              )}
            </div>

            {/* File Upload Option */}
            <div className="text-center">
              <label className="cursor-pointer text-xs text-slate-400 hover:text-emerald-400 font-semibold underline">
                Upload Barcode Image Instead
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
            </div>
          </div>
        )}

        {/* TAB 2: MANUAL BARCODE INPUT */}
        {activeTab === 'manual' && (
          <form onSubmit={handleManualSubmit} className="space-y-4 py-4">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Enter Barcode Number
              </label>
              <input
                type="text"
                placeholder="e.g. 8901764012914"
                value={manualBarcode}
                onChange={(e) => setManualBarcode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold py-3 rounded-xl transition text-sm"
            >
              Search Product
            </button>
          </form>
        )}

      </div>
    </div>
  );
}