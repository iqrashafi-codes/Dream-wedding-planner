import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/page';
import Footer from '../../Components/Footer/page';

export default function Services() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="page-header">
        <h1 className="page-title">Our Packages</h1>
        <p className="page-subtitle">Choose the plan that suits your celebration</p>
      </div>

      <div className="packages-section">
        <h2 className="section-title">Wedding Packages</h2>
        <p className="section-subtitle">All packages include hall booking, staff, and basic decor</p>
        <div className="packages-grid">
          <div className="package-card">
            <h3 className="package-name silver">Silver Package</h3>
            <p className="package-price">140,700 PKR</p>
            <ul className="package-features">
              <li>Hall capacity: up to 200 guests</li>
              <li>Basic floral decoration</li>
              <li>Standard catering menu</li>
              <li>4-hour booking slot</li>
              <li>Parking included</li>
            </ul>
            <button className="btn btn-gold" onClick={() => navigate('/contact')}>Book Silver</button>
          </div>
          <div className="package-card">
            <h3 className="package-name gold">Gold Package</h3>
            <p className="package-price">281,400 PKR</p>
            <ul className="package-features">
              <li>Hall capacity: up to 500 guests</li>
              <li>Premium floral decoration</li>
              <li>Full catering menu with dessert</li>
              <li>8-hour booking slot</li>
              <li>Photography included</li>
            </ul>
            <button className="btn btn-gold" onClick={() => navigate('/contact')}>Book Gold</button>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}