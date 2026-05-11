import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/page';
import Footer from '../../Components/Footer/page';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alert, setAlert] = useState<{ msg: string; type: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setAlert({ msg: 'Please fill in all fields.', type: 'error' }); return;
    }
    setAlert({ msg: 'Login successful! Redirecting to your dashboard...', type: 'success' });
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  return (
    <>
      <Navbar />

      <div className="form-page">
        <div className="form-container">
          <h2 className="form-title">Welcome Back</h2>
          <p className="form-tagline">Login to manage your booking</p>

          {alert && (
            <div className={`alert-box ${alert.type === 'success' ? 'alert-success' : 'alert-error'}`}>
              {alert.msg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username" className="form-label">Username or Email</label>
              <input type="text" id="username" className="form-input" placeholder="Enter your username" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" id="password" className="form-input" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-gold form-submit">Login Now</button>
          </form>

          <p className="form-footer">
            Don't have an account?{' '}
            <span className="form-link" onClick={() => navigate('/signup')}>Sign Up here</span>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}