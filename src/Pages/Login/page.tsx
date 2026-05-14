import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../Components/Navbar/page';
import Footer from '../../Components/Footer/page';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword]  = useState('');
  const [alert, setAlert]        = useState<{ msg: string; type: string } | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setAlert({ msg: 'Please fill in all fields.', type: 'error' }); return;
    }
    setAlert({ msg: 'Login successful! Redirecting...', type: 'success' });
    setTimeout(() => navigate('/dashboard'), 1500);
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-amber-50 dark:bg-gray-900 py-10 px-5">
        <div className="bg-white dark:bg-gray-800 border border-amber-100 dark:border-gray-700 rounded-xl p-12 w-full max-w-md shadow-lg">
          <h2 className="font-heading text-3xl text-gold-dark text-center mb-2">Welcome Back</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-8">Login to manage your booking</p>

          {alert && (
            <div className={`rounded-lg px-4 py-3 mb-5 text-sm ${alert.type === 'success' ? 'bg-green-100 text-green-800 border border-green-300' : 'bg-red-50 text-red-800 border border-red-200'}`}>
              {alert.msg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Username or Email</label>
              <input type="text" placeholder="Enter your username" value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-amber-100 dark:border-gray-600 rounded-lg text-sm bg-amber-50 dark:bg-gray-700 dark:text-white outline-none focus:border-gold focus:ring-2 focus:ring-yellow-200" />
            </div>
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200 mb-1">Password</label>
              <input type="password" placeholder="Enter your password" value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-amber-100 dark:border-gray-600 rounded-lg text-sm bg-amber-50 dark:bg-gray-700 dark:text-white outline-none focus:border-gold focus:ring-2 focus:ring-yellow-200" />
            </div>
            <button type="submit"
              className="w-full bg-gold text-black font-semibold py-3 rounded-lg hover:bg-gold-dark hover:text-white transition-all mt-2">
              Login Now
            </button>
          </form>

          <p className="text-center mt-5 text-sm text-gray-500">
            Don't have an account?{' '}
            <span onClick={() => navigate('/signup')} className="text-gold-dark font-semibold cursor-pointer hover:text-gold">
              Sign Up here
            </span>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}