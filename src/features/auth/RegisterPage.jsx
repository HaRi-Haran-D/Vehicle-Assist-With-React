import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../api/client';
import { ArrowLeft, User, Wrench } from 'lucide-react';

export function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
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
      const data = await register(username, email, password, mobileNumber, role);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.user.role);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please check your details and try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-6 sm:px-6 lg:px-8 bg-primary">
      <Link to="/" className="absolute top-6 left-6 flex items-center text-brandDark hover:text-brandYellow transition-colors text-sm font-medium">
        <ArrowLeft className="mr-1.5" size={18} /> Back to Home
      </Link>

      <div className="mt-4 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-6 px-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-2xl sm:px-8 border border-borderLight">
          <h2 className="text-center text-2xl font-display font-bold text-brandDark mb-4">
            Create an Account
          </h2>
          <form className="space-y-3.5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 p-2.5 rounded-md text-xs text-center">
                {error}
              </div>
            )}

            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setRole('CUSTOMER')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border transition-all ${role === 'CUSTOMER' ? 'border-brandYellow bg-brandYellow/10 text-brandDark' : 'border-borderDark text-textMuted hover:border-brandYellow/50'
                  }`}
              >
                <User size={18} />
                <span className="text-xs font-semibold">Customer</span>
              </button>
              <button
                type="button"
                onClick={() => setRole('MECHANIC')}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-lg border transition-all ${role === 'MECHANIC' ? 'border-brandYellow bg-brandYellow/10 text-brandDark' : 'border-borderDark text-textMuted hover:border-brandYellow/50'
                  }`}
              >
                <Wrench size={18} />
                <span className="text-xs font-semibold">Mechanic</span>
              </button>
            </div>

            <div>
              <label className="block text-xs font-medium text-textMain mb-1">
                Username
              </label>
              <input
                type="text"
                required
                value={username}
                placeholder='Enter Your Name'
                onChange={(e) => setUsername(e.target.value)}
                className="appearance-none block w-full px-3 py-1.5 text-sm border border-borderDark rounded-lg shadow-sm focus:outline-none focus:ring-brandYellow focus:border-brandYellow transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-textMain mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  placeholder='Enter Email'
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-1.5 text-sm border border-borderDark rounded-lg shadow-sm focus:outline-none focus:ring-brandYellow focus:border-brandYellow transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-textMain mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={mobileNumber}
                  placeholder='Mobile Number'
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="appearance-none block w-full px-3 py-1.5 text-sm border border-borderDark rounded-lg shadow-sm focus:outline-none focus:ring-brandYellow focus:border-brandYellow transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-textMain mb-1">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  placeholder='Enter Password'
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-1.5 text-sm border border-borderDark rounded-lg shadow-sm focus:outline-none focus:ring-brandYellow focus:border-brandYellow transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-textMain mb-1">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  placeholder='Confirm Password'
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-1.5 text-sm border border-borderDark rounded-lg shadow-sm focus:outline-none focus:ring-brandYellow focus:border-brandYellow transition-colors"
                />
              </div>
            </div>

            {confirmPassword && password !== confirmPassword && (
              <div className="text-red-500 text-xs font-medium">
                Passwords do not match.
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={password !== confirmPassword && confirmPassword !== ''}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-brandDark bg-brandYellow hover:bg-brandYellowHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandYellow transition-colors mt-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Account
              </button>
            </div>
          </form>

          <div className="mt-4 pt-3 border-t border-borderLight text-center text-xs">
            <span className="text-textMuted">Already have an account? </span>
            <Link to="/login" className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
