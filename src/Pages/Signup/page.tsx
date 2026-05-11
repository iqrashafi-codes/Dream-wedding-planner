import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/page';
import Footer from '../../Components/Footer/page';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert] = useState<{ msg: string; type: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setAlert({ msg: 'Please fill in all fields.', type: 'error' }); return;
    }
    if (password !== confirmPassword) {
      setAlert({ msg: 'Passwords do not match.', type: 'error' }); return;
    }
    if (password.length < 6) {
      setAlert({ msg: 'Password must be at least 6 characters.', type: 'error' }); return;
    }
    setAlert({ msg: 'Account created! Redirecting to login...', type: 'success' });
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <>
      <Navbar />

      <div className="form-page">
        <div className="form-container">
          <h2 className="form-title">Create Account</h2>
          <p className="form-tagline">Join us and start planning your dream wedding</p>

          {alert && (
            <div className={`alert-box ${alert.type === 'success' ? 'alert-success' : 'alert-error'}`}>
              {alert.msg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input type="email" id="email" className="form-input" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id="password" className="form-input" placeholder="Minimum 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <input type="password" id="confirmPassword" className="form-input" placeholder="Re-enter your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-gold form-submit">Create Account</button>
          
          </form>

          <p className="form-footer">
            Already have an account?{' '}
            <span className="form-link" onClick={() => navigate('/login')}>Login here</span>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}