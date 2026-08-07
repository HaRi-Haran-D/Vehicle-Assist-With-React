import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../api/client';
import { ArrowLeft, ShieldCheck, Clock, MapPin, Wrench } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-primary">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-borderLight overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        {/* Left Panel: Logo, Name & Slogan */}
        <div className="lg:col-span-5 bg-gradient-to-br from-brandDark via-[#182333] to-brandBlue text-white p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden">
          {/* Subtle Glow & Background Accents */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-brandYellow/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-brandBlue/30 rounded-full blur-3xl pointer-events-none" />

          {/* Top Nav */}
          <div className="relative z-10">
            <Link to="/" className="inline-flex items-center text-white/80 hover:text-brandYellow transition-colors text-sm font-medium">
              <ArrowLeft className="mr-2" size={18} /> Back to Home
            </Link>
          </div>

          {/* Center Brand Identity */}
          <div className="my-8 relative z-10 flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-3.5 mb-6 flex items-center justify-center shadow-lg">
              <img src="/LogoWithoutBackground.png" alt="VehicleAssist Logo" className="w-full h-full object-contain" />
            </div>
            
            <h1 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-white mb-3">
              Vehicle<span className="text-brandYellow">Assist</span>
            </h1>

            <p className="text-white/80 text-base sm:text-lg font-normal leading-relaxed max-w-sm">
              On-Demand Vehicle Repair & Emergency Breakdown Assistance Anywhere, Anytime.
            </p>

            <div className="mt-8 space-y-3 hidden sm:block">
              <div className="flex items-center gap-3 text-sm text-white/70">
                <div className="p-1.5 rounded-lg bg-brandYellow/10 text-brandYellow">
                  <Clock size={16} />
                </div>
                <span>Fast 24/7 Emergency Assistance</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <div className="p-1.5 rounded-lg bg-brandYellow/10 text-brandYellow">
                  <ShieldCheck size={16} />
                </div>
                <span>Verified Mechanics & Transparent Pricing</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-white/70">
                <div className="p-1.5 rounded-lg bg-brandYellow/10 text-brandYellow">
                  <MapPin size={16} />
                </div>
                <span>Real-Time Live Mechanic Tracking</span>
              </div>
            </div>
          </div>

          {/* Bottom Footer Quote */}
          <div className="relative z-10 pt-6 border-t border-white/10 text-xs text-white/50 text-center lg:text-left">
            Trusted by thousands of drivers & mechanics across India.
          </div>
        </div>

        {/* Right Panel: Login Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto my-auto py-2">
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-brandDark">
                Sign in to your account
              </h2>
              <p className="text-textMuted text-sm mt-1">
                Enter your details to access your VehicleAssist dashboard.
              </p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 text-red-600 p-3.5 rounded-xl text-sm font-medium text-center border border-red-100">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-textMain mb-1.5">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  placeholder="Enter Your Name"
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-borderDark rounded-xl shadow-sm placeholder:text-textMuted/60 focus:outline-none focus:ring-2 focus:ring-brandYellow focus:border-brandYellow transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-textMain mb-1.5">
                  Password
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  placeholder="Enter Your Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-borderDark rounded-xl shadow-sm placeholder:text-textMuted/60 focus:outline-none focus:ring-2 focus:ring-brandYellow focus:border-brandYellow transition-all text-sm"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 rounded-xl shadow-md text-sm font-semibold text-brandDark bg-brandYellow hover:bg-brandYellowHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandYellow transition-all mt-2"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-8 text-center text-sm">
              <span className="text-textMuted">Don't have an account? </span>
              <Link to="/register" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors ml-1">
                Register now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

