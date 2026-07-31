import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../api/client';
import { ArrowLeft } from 'lucide-react';

export function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.user.role);
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-primary">
      <Link to="/" className="absolute top-8 left-8 flex items-center text-brandDark hover:text-brandYellow transition-colors font-medium">
        <ArrowLeft className="mr-2" size={20} /> Back to Home
      </Link>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:rounded-2xl sm:px-10 border border-borderLight flex flex-col items-center">
          <img src="/LogoWithoutBackground.png" alt="VehicleAssist Logo" className="h-14 w-auto object-contain mb-3" />
          <h2 className="text-center text-3xl py-2 font-display font-bold text-brandDark">
            Sign in to your account
          </h2>
          <form className="space-y-5 mt-4" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm text-center">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-textMain">
                Username
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  required
                  value={username}
                  placeholder="Enter Your Name"
                  onChange={(e) => setUsername(e.target.value)}
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
                  placeholder="Enter Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-borderDark rounded-lg shadow-sm focus:outline-none focus:ring-brandYellow focus:border-brandYellow transition-colors"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-brandDark bg-brandYellow hover:bg-brandYellowHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandYellow transition-colors mt-2"
              >
                Sign in
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
                  Don't have an account?
                </span>
                <Link to="/register" className="font-medium text-blue-600 hover:text-blue-700 transition-colors ml-1">
                  Register now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
