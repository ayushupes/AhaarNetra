import { useNavigate } from 'react-router-dom'
import {
  ScanBarcode,
  ShieldCheck,
  Search,
  Sparkles,
} from 'lucide-react'

function Home() {
  const navigate = useNavigate()

  return (
    <div className="home">
      <nav className="navbar">
        <div className="brand">
          <ShieldCheck size={30} />
          <span>Ahaar Netra</span>
        </div>

        <span className="tagline">
          Scan. Understand. Choose Better.
        </span>
      </nav>

      <main className="hero-section">
        <div className="hero-content">

          <div className="badge">
            <Sparkles size={16} />
            Smart Product Health Assistant
          </div>

          <h1>
            Know what's inside
            <span> before you buy.</span>
          </h1>

          <p>
            Scan a product barcode and instantly understand its
            ingredients, nutrition, possible health concerns and
            discover better alternatives.
          </p>

          <button
            className="scan-button"
            onClick={() => navigate('/scan')}
          >
            <ScanBarcode size={24} />
            Scan a Product
          </button>

          <div className="features">

            <div>
              <Search size={20} />
              <span>Ingredient Analysis</span>
            </div>

            <div>
              <ShieldCheck size={20} />
              <span>Health Insights</span>
            </div>

            <div>
              <ScanBarcode size={20} />
              <span>Better Alternatives</span>
            </div>

          </div>

        </div>
      </main>
    </div>
  )
}

export default Home