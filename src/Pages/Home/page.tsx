import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/page';
import Footer from '../../Components/Footer/page';

export default function Home() {
  const navigate = useNavigate();

  const previewItems = [
    { src: '/images/image1.jpeg', label: 'Royal Banquet Hall' },
    { src: '/images/image2.jpg',  label: 'Luxury Wedding Stage' },
    { src: '/images/image3.jpg',  label: 'Classic Indoor Reception' },
    { src: '/images/image4.jpeg', label: 'Modern Suite' },
    { src: '/images/image5.jpg',  label: 'Rustic Barn' },
    { src: '/images/image6.jpg',  label: 'Premium Decor' },
  ];

  const features = [
    { icon: '🏛️', title: 'Grand Halls',     text: 'Capacity for 50 to 1000 guests with multiple hall styles to suit your vision.' },
    { icon: '🍽️', title: 'Fine Catering',   text: 'Curated menus from experienced chefs covering traditional and contemporary cuisine.' },
    { icon: '💐',  title: 'Full Decoration', text: 'In-house decoration team to bring your theme and colour palette to life.' },
    { icon: '📸', title: 'Photography',      text: 'Professional photographers and videographers capturing every precious moment.' },
  ];

  return (
    <>
      <Navbar />

      <header className="hero">
        <div className="hero-content">
          <p className="hero-tag">Islamabad's Premier Wedding Venue</p>
          <h1 className="hero-title">Your Perfect Day,<br />Beautifully Planned</h1>
          <p className="hero-desc">From elegant halls to world-class catering, we handle every detail so you can enjoy every moment.</p>
          <div className="hero-buttons">
            <button className="btn btn-gold" onClick={() => navigate('/contact')}>Book Your Date</button>
            <button className="btn btn-outline" onClick={() => navigate('/gallery')}>View Gallery</button>
          </div>
        </div>
      </header>

      <section className="features">
        {features.map((f) => (
          <div className="feature-card" key={f.title}>
            <div className="feature-icon">{f.icon}</div>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-text">{f.text}</p>
          </div>
        ))}
      </section>

      <section className="gallery-preview">
        <h2 className="section-title">A Glimpse of Our Venue</h2>
        <p className="section-subtitle">Elegance in every corner</p>
        <div className="preview-grid">
          {previewItems.map((item) => (
            <div className="preview-item" key={item.label}>
              <img src={item.src} alt={item.label} className="preview-img" />
              <div className="preview-overlay">
                <span className="preview-label">{item.label}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="center-btn">
          <button className="btn btn-gold" onClick={() => navigate('/gallery')}>View Full Gallery</button>
        </div>
      </section>

      <section className="cta-section">
        <h2 className="cta-title">Ready to Plan Your Dream Wedding?</h2>
        <p className="cta-desc">Contact us today and let our expert team make your special day unforgettable.</p>
        <button className="btn btn-gold" onClick={() => navigate('/contact')}>Book a Consultation</button>
      </section>

      <Footer />
    </>
  );
}