import { useState } from 'react';
import Navbar from '../../Components/Navbar/page';
import Footer from '../../Components/Footer/page';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', eventDate: '', guests: '', message: '' });
  const [alert, setAlert] = useState<{ msg: string; type: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.eventDate || !form.guests) {
      setAlert({ msg: 'Please fill in all required fields.', type: 'error' }); return;
    }
    setAlert({ msg: 'Booking request sent! We will contact you within 24 hours.', type: 'success' });
    setForm({ name: '', email: '', phone: '', eventDate: '', guests: '', message: '' });
  };

  return (
    <>
      <Navbar />

      <div className="form-page">
        <div className="form-container">
          <h2 className="form-title">Book Your Date</h2>
          <p className="form-tagline">Fill out the form and we will get back to you within 24 hours</p>

          {alert && (
            <div className={`alert-box ${alert.type === 'success' ? 'alert-success' : 'alert-error'}`}>
              {alert.msg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Full Name *</label>
              <input type="text" id="name" className="form-input" placeholder="Your full name" value={form.name} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address *</label>
              <input type="email" id="email" className="form-input" placeholder="your@email.com" value={form.email} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="form-label">Phone Number</label>
              <input type="tel" id="phone" className="form-input" placeholder="+92 300 0000000" value={form.phone} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="eventDate" className="form-label">Event Date *</label>
              <input type="date" id="eventDate" className="form-input" value={form.eventDate} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="guests" className="form-label">Number of Guests *</label>
              <input type="number" id="guests" className="form-input" placeholder="e.g. 300" value={form.guests} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">Special Requirements</label>
              <input type="text" id="message" className="form-input" placeholder="Any special requests..." value={form.message} onChange={handleChange} />
            </div>
            <button type="submit" className="btn btn-gold form-submit">Send Booking Request</button>
          </form>

          <p className="form-footer">Need help? Call us at <strong>+92 51 000 0000</strong></p>
        </div>
      </div>

      <Footer />
    </>
  );
}