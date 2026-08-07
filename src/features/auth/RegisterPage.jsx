import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../api/client';
import { ArrowLeft, User, Wrench, ShieldCheck, Clock, MapPin } from 'lucide-react';

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
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-primary">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-borderLight overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[680px]">
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
            Join thousands of users getting instant vehicle repairs.
          </div>
        </div>

        {/* Right Panel: Register Form */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-center bg-white">
          <div className="max-w-md w-full mx-auto my-auto py-2">
            <div className="mb-5">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-brandDark">
                Create an Account
              </h2>
              <p className="text-textMuted text-xs sm:text-sm mt-1">
                Select your account type and fill in your details to get started.
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 text-red-600 p-3.5 rounded-xl text-sm font-medium text-center border border-red-100">
                  {error}
                </div>
              )}

              {/* Role Selection */}
              <div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setRole('CUSTOMER')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border font-medium text-sm transition-all ${role === 'CUSTOMER'
                        ? 'border-brandYellow bg-brandYellow/15 text-brandDark font-semibold shadow-sm'
                        : 'border-borderDark hover:border-brandYellow/50 text-textMuted'
                      }`}
                  >
                    <User size={18} />
                    <span>Customer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('MECHANIC')}
                    className={`flex items-center justify-center gap-2 p-3 rounded-xl border font-medium text-sm transition-all ${role === 'MECHANIC'
                        ? 'border-brandYellow bg-brandYellow/15 text-brandDark font-semibold shadow-sm'
                        : 'border-borderDark hover:border-brandYellow/50 text-textMuted'
                      }`}
                  >
                    <Wrench size={18} />
                    <span>Mechanic</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-textMain mb-1">
                  Username
                </label>
                <input
                  type="text"
                  required
                  value={username}
                  placeholder="Enter Your Name"
                  onChange={(e) => setUsername(e.target.value)}
                  className="appearance-none block w-full px-3.5 py-2.5 border border-borderDark rounded-xl shadow-sm placeholder:text-textMuted/60 focus:outline-none focus:ring-2 focus:ring-brandYellow focus:border-brandYellow transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-textMain mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  placeholder="Enter Your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3.5 py-2.5 border border-borderDark rounded-xl shadow-sm placeholder:text-textMuted/60 focus:outline-none focus:ring-2 focus:ring-brandYellow focus:border-brandYellow transition-all text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-textMain mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  required
                  value={mobileNumber}
                  placeholder="Enter Your Mobile Number"
                  onChange={(e) => setMobileNumber(e.target.value)}
                  className="appearance-none block w-full px-3.5 py-2.5 border border-borderDark rounded-xl shadow-sm placeholder:text-textMuted/60 focus:outline-none focus:ring-2 focus:ring-brandYellow focus:border-brandYellow transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-textMain mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="appearance-none block w-full px-3.5 py-2.5 border border-borderDark rounded-xl shadow-sm placeholder:text-textMuted/60 focus:outline-none focus:ring-2 focus:ring-brandYellow focus:border-brandYellow transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-textMain mb-1">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    placeholder="Confirm"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="appearance-none block w-full px-3.5 py-2.5 border border-borderDark rounded-xl shadow-sm placeholder:text-textMuted/60 focus:outline-none focus:ring-2 focus:ring-brandYellow focus:border-brandYellow transition-all text-sm"
                  />
                </div>
              </div>

              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-500 text-xs font-medium">
                  Passwords do not match.
                </p>
              )}

              <div>
                <button
                  type="submit"
                  disabled={password !== confirmPassword && confirmPassword !== ''}
                  className="w-full flex justify-center py-3 px-4 rounded-xl shadow-md text-sm font-semibold text-brandDark bg-brandYellow hover:bg-brandYellowHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brandYellow transition-all mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Account
                </button>
              </div>
            </form>

            <div className="mt-6 text-center text-sm">
              <span className="text-textMuted">Already have an account? </span>
              <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors ml-1">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

