import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [dark]);

  const isActive = (path: string) => location.pathname === path;

  const links = [
    { label: 'Home',      path: '/'          },
    { label: 'Services',  path: '/services'  },
    { label: 'Gallery',   path: '/gallery'   },
    { label: 'Contact',   path: '/contact'   },
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Cart',      path: '/cart'       },
    { label: 'Review',    path: '/review'     },
    { label: 'Profile',   path: '/profile'    },
    { label: 'Team',      path: '/team'       },
    { label: 'Login',     path: '/login'      },
  ];

  return (
    <nav className="flex items-center justify-between bg-gradient-to-br from-navy to-navy-dark dark:from-gray-900 dark:to-black px-10 h-16 sticky top-0 z-50 shadow-lg">
      <div className="font-heading text-gold text-2xl font-bold cursor-pointer"
        onClick={() => navigate('/')}>
        Dream Wedding
      </div>
      <div className="flex items-center gap-1 flex-wrap">
        {links.map((link) => (
          <button key={link.path}
            onClick={() => navigate(link.path)}
            className={`px-3 py-2 rounded-lg text-xs text-white border-none bg-transparent cursor-pointer transition-colors hover:bg-gray-700 hover:text-gold ${isActive(link.path) ? 'text-gold' : ''}`}>
            {link.label}
          </button>
        ))}
        <button onClick={() => setDark(!dark)}
          className="ml-2 px-3 py-2 rounded-lg bg-gold text-black text-xs font-bold hover:bg-gold-dark transition-all">
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>
        <button onClick={() => navigate('/signup')}
          className="ml-1 bg-gold text-black font-bold px-4 py-2 rounded-lg text-xs hover:bg-gold-dark hover:text-white transition-all">
          Sign Up
        </button>
      </div>
    </nav>
  );
}