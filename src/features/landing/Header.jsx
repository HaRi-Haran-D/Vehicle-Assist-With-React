import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-borderLight">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-2xl tracking-tight text-brandDark">Vehicle<span className="text-brandYellow">Repair</span></span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-brandDark">
            <Link to="/" className="hover:text-brandYellow transition-colors">Home</Link>
            <a href="#services" className="hover:text-brandYellow transition-colors">Services</a>
            <a href="#earn" className="hover:text-brandYellow transition-colors">Earn</a>
            {isAuthenticated && (
              <Link to="/dashboard" className="hover:text-brandYellow transition-colors">Dashboard</Link>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <button onClick={handleLogout} className="bg-red-50 text-red-600 px-6 py-2.5 rounded-full font-semibold hover:bg-red-100 transition-colors">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="text-brandDark font-semibold hover:text-brandYellow transition-colors">
                  Login
                </Link>
                <Link to="/register" className="bg-brandDark text-brandYellow px-6 py-2.5 rounded-full font-semibold hover:bg-black transition-colors shadow-lg shadow-brandDark/20">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-brandDark">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-borderLight">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
            <Link to="/" className="block px-3 py-2 text-brandDark font-medium hover:bg-secondary rounded-md" onClick={() => setIsOpen(false)}>Home</Link>
            <a href="#services" className="block px-3 py-2 text-brandDark font-medium hover:bg-secondary rounded-md" onClick={() => setIsOpen(false)}>Services</a>
            <a href="#earn" className="block px-3 py-2 text-brandDark font-medium hover:bg-secondary rounded-md" onClick={() => setIsOpen(false)}>Earn</a>
            {isAuthenticated && (
              <Link to="/dashboard" className="block px-3 py-2 text-brandDark font-medium hover:bg-secondary rounded-md" onClick={() => setIsOpen(false)}>Dashboard</Link>
            )}
            
            {isAuthenticated ? (
              <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full text-left block px-3 py-2 text-red-600 font-medium hover:bg-red-50 rounded-md mt-2">
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 text-brandDark font-medium hover:bg-secondary rounded-md mt-2" onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/register" className="w-full text-center block px-3 py-2 text-brandYellow bg-brandDark font-semibold rounded-md mt-2" onClick={() => setIsOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
