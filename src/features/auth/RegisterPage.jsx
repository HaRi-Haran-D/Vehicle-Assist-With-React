import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../api/client';
import { ArrowLeft, User, Wrench, Shield } from 'lucide-react';

export function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('CUSTOMER');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please try again.');
      return;
    }

    try {
      const data = await register(username, email, password, role);
      // Wait, register returns user but not token currently in DRF if we used RegisterSerializer directly
      // Ah, RegisterView returns user and token in views.py!
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.user.role);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please check your details and try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-primary">
      <Link to="/" className="absolute top-8 left-8 flex items-center text-brandDark hover:text-brandYellow transition-colors font-medium">
        <ArrowLeft className="mr-2" size={20} /> Back to Home
      </Link>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-2xl sm:px-10 border border-borderLight">
          <h2 className="text-center text-3xl py-2 font-display font-bold text-brandDark">
            Create an Account
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm text-center">
                {error}
              </div>
            )}

            {/* Role Selection */}
            <div>
              {/* <label className="block text-sm font-medium text-textMain mb-2">
                I am a...
              </label> */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('CUSTOMER')}
                  className={`flex flex-col items-center p-3 rounded-xl border transition-all ${role === 'CUSTOMER' ? 'border-brandYellow bg-brandYellow/10 text-brandDark' : 'border-borderDark hover:border-brandYellow/50 text-textMuted'
                    }`}
                >
                  <User size={24} className="mb-1" />
                  <span className="text-xs font-semibold">Customer</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('MECHANIC')}
                  className={`flex flex-col items-center p-3 rounded-xl border transition-all ${role === 'MECHANIC' ? 'border-brandYellow bg-brandYellow/10 text-brandDark' : 'border-borderDark hover:border-brandYellow/50 text-textMuted'
                    }`}
                >
                  <Wrench size={24} className="mb-1" />
                  <span className="text-xs font-semibold">Mechanic</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-textMain">
                Username
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  value={username}
                  placeholder='Enter Your Name'
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-borderDark rounded-lg shadow-sm focus:outline-none focus:ring-brandYellow focus:border-brandYellow transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-textMain">
                Email
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  required
                  value={email}
                  placeholder='Enter Your Email'
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-borderDark rounded-lg shadow-sm focus:outline-none focus:ring-brandYellow focus:border-brandYellow transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-textMain">
                Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={password}
                  placeholder='Enter Your Password'
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-borderDark rounded-lg shadow-sm focus:outline-none focus:ring-brandYellow focus:border-brandYellow transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-textMain">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  placeholder='Confirm Your Password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-borderDark rounded-lg shadow-sm focus:outline-none focus:ring-brandYellow focus:border-brandYellow transition-colors"
                />
              </div>
            </div>

            {confirmPassword && password !== confirmPassword && (
              <div className="text-red-500 text-sm mt-1 mb-2 font-medium">
                Passwords do not match.
              </div>
            )}
            <div>
              <button
                type="submit"
                disabled={password !== confirmPassword && confirmPassword !== ''}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-brandDark bg-brandYellow hover:bg-brandYellowHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandYellow transition-colors mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-borderLight" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-textMuted">
                  Already have an account?
                </span>
                <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  Sign in
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
