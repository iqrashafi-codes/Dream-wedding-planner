import { useNavigate } from 'react-router-dom';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-col">
          <div className="footer-brand-wrap">
            <span className="footer-brand">Dream Wedding</span>
            <p className="footer-tagline">
              Islamabad's premier wedding hall and planning service. Making your most special day truly unforgettable.
            </p>
          </div>
        </div>

        <div className="footer-col">
          <span className="footer-heading">Quick Links</span>
          <button className="footer-link" onClick={() => navigate('/')}>Home</button>
          <button className="footer-link" onClick={() => navigate('/services')}>Services & Packages</button>
          <button className="footer-link" onClick={() => navigate('/gallery')}>Gallery</button>
          <button className="footer-link" onClick={() => navigate('/contact')}>Book Now</button>
          <button className="footer-link" onClick={() => navigate('/dashboard')}>Dashboard</button>
        </div>

        <div className="footer-col">
          <span className="footer-heading">Our Services</span>
          <span className="footer-link">Grand Wedding Halls</span>
          <span className="footer-link">Catering & Cuisine</span>
          <span className="footer-link">Stage & Decoration</span>
          <span className="footer-link">Photography</span>
          <span className="footer-link">Event Planning</span>
        </div>

        <div className="footer-col">
          <span className="footer-heading">Contact Us</span>
          <span className="footer-contact-item">
            <i className="footer-icon">📍</i> Hall No. 5, Blue Area, Islamabad, Pakistan
          </span>
          <span className="footer-contact-item">
            <i className="footer-icon">📞</i> +92 51 000 0000
          </span>
          <span className="footer-contact-item">
            <i className="footer-icon">✉️</i> info@dreamwedding.pk
          </span>
          <span className="footer-contact-item">
            <i className="footer-icon">🕐</i> Mon – Sun: 9:00 AM – 9:00 PM
          </span>
        </div>
      </div>

      <hr className="footer-divider" />
      <p className="footer-bottom">© 2025 Dream Wedding Planner. All rights reserved.</p>
    </footer>
  );
}