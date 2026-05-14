import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/page';
import Footer from '../../Components/Footer/page';

export default function Signup() {
  const navigate = useNavigate();
  const [email, setEmail]                   = useState('');
  const [password, setPassword]             = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alert, setAlert]                   = useState<{ msg: string; type: string } | null>(null);

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

      <div className="min-h-screen flex items-center justify-center bg-amber-50 dark:bg-gray-900 py-10 px-5">
        <div className="bg-white dark:bg-gray-800 border border-amber-100 dark:border-gray-700 rounded-xl p-12 w-full max-w-md shadow-lg">
          <h2 className="font-heading text-3xl text-gold-dark text-center mb-2">Create Account</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-8">Join us and start planning your dream wedding</p>

          {alert && (
            <div className={`rounded-lg px-4 py-3 mb-5 text-sm ${alert.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              {alert.msg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Email Address</label>
              <input type="email" placeholder="your@email.com" value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-amber-100 dark:border-gray-600 rounded-lg text-sm bg-amber-50 dark:bg-gray-700 dark:text-white outline-none focus:border-gold focus:ring-2 focus:ring-yellow-200" />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Password</label>
              <input type="password" placeholder="Minimum 6 characters" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-amber-100 dark:border-gray-600 rounded-lg text-sm bg-amber-50 dark:bg-gray-700 dark:text-white outline-none focus:border-gold focus:ring-2 focus:ring-yellow-200" />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Confirm Password</label>
              <input type="password" placeholder="Re-enter your password" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-3 border border-amber-100 dark:border-gray-600 rounded-lg text-sm bg-amber-50 dark:bg-gray-700 dark:text-white outline-none focus:border-gold focus:ring-2 focus:ring-yellow-200" />
            </div>
            <button type="submit"
              className="w-full bg-gold text-black font-semibold py-3 rounded-lg hover:bg-gold-dark hover:text-white transition-all mt-2">
              Create Account
            </button>
          </form>

          <p className="text-center mt-5 text-sm text-gray-500">
            Already have an account?{' '}
            <span onClick={() => navigate('/login')} className="text-gold-dark font-semibold cursor-pointer hover:text-gold">
              Login here
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}