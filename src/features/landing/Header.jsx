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
            <Link to="/" className="font-display font-bold text-2xl tracking-tight text-brandDark">
              Vehicle<span className="text-brandYellow">Assist</span>
            </Link>
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
                <Link to="/login" className="text-brandDark font-semibold hover:text-brandYellow transition-colors px-4 py-2">
                  Login
                </Link>
                <Link to="/register" className="bg-brandDark text-white px-6 py-2.5 rounded-full font-bold hover:bg-black transition-all shadow-md hover:shadow-lg">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-brandDark hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-borderLight shadow-2xl">
          <div className="px-4 pt-3 pb-6 space-y-2">
            <Link to="/" className="block px-4 py-2.5 text-brandDark font-medium hover:bg-secondary rounded-xl transition-colors" onClick={() => setIsOpen(false)}>Home</Link>
            <a href="#services" className="block px-4 py-2.5 text-brandDark font-medium hover:bg-secondary rounded-xl transition-colors" onClick={() => setIsOpen(false)}>Services</a>
            <a href="#earn" className="block px-4 py-2.5 text-brandDark font-medium hover:bg-secondary rounded-xl transition-colors" onClick={() => setIsOpen(false)}>Earn</a>
            {isAuthenticated && (
              <Link to="/dashboard" className="block px-4 py-2.5 text-brandDark font-medium hover:bg-secondary rounded-xl transition-colors" onClick={() => setIsOpen(false)}>Dashboard</Link>
            )}

            <div className="pt-3 border-t border-slate-100 space-y-2">
              {isAuthenticated ? (
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full text-center block px-4 py-3 text-red-600 font-semibold hover:bg-red-50 rounded-full transition-colors">
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="block text-center px-4 py-2.5 text-brandDark font-semibold hover:bg-slate-100 rounded-full transition-colors" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                  <Link to="/register" className="w-fit mx-auto text-center block px-6 py-3 text-white bg-brandDark font-bold rounded-full shadow-md hover:bg-black transition-all" onClick={() => setIsOpen(false)}>
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
