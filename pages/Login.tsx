import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, User as UserIcon, ArrowRight, Lock, CheckCircle, Mail, ExternalLink } from 'lucide-react';
import { User } from '../types';
import { signInWithGoogle } from '../lib/firebase';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [isInIframe, setIsInIframe] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    address: '',
    otp: ''
  });
  const [error, setError] = useState('');
  const [showDemoOtp, setShowDemoOtp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPopupBlocked, setIsPopupBlocked] = useState(false);

  useEffect(() => {
    // Check if the app is running in an iframe
    setIsInIframe(window.self !== window.top);
  }, []);

  const handleOpenInNewTab = () => {
    window.open(window.location.href, '_blank');
  };

  const handleGoogleLogin = async () => {
    setError('');
    setIsPopupBlocked(false);
    setIsLoading(true);
    try {
      const user = await signInWithGoogle();
      if (user) {
        const userData: User = {
          name: user.displayName || 'Google User',
          mobile: '', // Google doesn't provide mobile by default
          email: user.email || '',
          address: ''
        };
        onLogin(userData);
        navigate('/');
      }
    } catch (err: any) {
      if (err.message === 'POPUP_BLOCKED') {
        setIsPopupBlocked(true);
        setError(isInIframe 
          ? 'Browsers block login windows inside this preview frame. Please use the "Open in New Tab" button.'
          : 'Your browser blocked the login popup. Please allow popups for this site in your browser settings.');
      } else if (err.message === 'POPUP_CLOSED') {
        setError('Login window was closed before completion. Please try again.');
        setIsPopupBlocked(true); // Offer new tab as fallback
      } else {
        setError(err.message || 'Failed to sign in with Google');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.name.trim().length < 2) {
      setError('Please enter a valid name.');
      return;
    }
    if (!/^[0-9]{10}$/.test(formData.mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(2);
      setShowDemoOtp(true);
    }, 1500);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.otp !== '1234') {
      setError('Invalid OTP. Please enter 1234.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const user: User = {
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        address: formData.address
      };
      onLogin(user);
      navigate('/');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-brand-900 dark:bg-slate-800 text-brand-accent mb-4">
            <Smartphone size={32} />
          </div>
          <h2 className="text-3xl font-heading font-bold text-slate-900 dark:text-white">
            {step === 1 ? 'Sign in to Tejas Mobile' : 'Verify Mobile Number'}
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {step === 1 
              ? 'Access your orders, repairs, and wholesale profile' 
              : `Enter the OTP sent to +91 ${formData.mobile}`
            }
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 py-8 px-4 shadow-xl shadow-slate-200 dark:shadow-none sm:rounded-lg sm:px-10 border border-slate-100 dark:border-slate-800 transition-colors duration-300">
          {error && (
            <div className="mb-6 space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-xl text-sm font-medium animate-shake">
                {error}
              </div>
              
              {isPopupBlocked && (
                <button
                  onClick={handleOpenInNewTab}
                  className="w-full flex items-center justify-center gap-2 bg-brand-accent text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-lg hover:scale-[1.02] active:scale-95 transition-all animate-bounce"
                >
                  <ExternalLink size={20} /> {isInIframe ? 'Open in New Tab to Login' : 'Try Opening Standalone Again'}
                </button>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="mb-8">
              <button
                type="button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 py-3 rounded-xl text-slate-700 dark:text-slate-200 font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm group"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Sign in with Google
              </button>

              {isInIframe && (
                <p className="mt-3 text-[10px] text-slate-400 text-center uppercase tracking-tight font-bold">
                  Note: If popup fails, open in <span className="text-brand-accent">New Tab</span> using the icon above
                </p>
              )}

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-100 dark:border-slate-800"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-slate-900 px-4 text-slate-400 font-bold tracking-widest">Or login with Phone</span>
                </div>
              </div>
            </div>
          )}

          {step === 1 ? (
            <form className="space-y-4" onSubmit={handleSendOtp}>
              <div>
                <label htmlFor="name" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Full Name
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-4 w-4 text-slate-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="focus:ring-brand-accent focus:border-brand-accent block w-full pl-10 py-3 sm:text-sm border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl"
                    placeholder="Arvind Kumar"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Gmail Address (Optional)
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="focus:ring-brand-accent focus:border-brand-accent block w-full px-4 py-3 sm:text-sm border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl"
                  placeholder="name@gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="mobile" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                   Mobile Number
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Smartphone className="h-4 w-4 text-slate-400" />
                  </div>
                  <span className="absolute inset-y-0 left-10 flex items-center text-slate-500 font-bold text-sm">
                    +91
                  </span>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    maxLength={10}
                    required
                    className="focus:ring-brand-accent focus:border-brand-accent block w-full pl-20 py-3 sm:text-sm border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl"
                    placeholder="97735 64409"
                    value={formData.mobile}
                    onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, mobile: val });
                    }}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="address" className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  Shipping Address (Complete Details)
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows={2}
                  className="focus:ring-brand-accent focus:border-brand-accent block w-full px-4 py-3 sm:text-sm border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl"
                  placeholder="Village, Post, Block, District, PIN..."
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-accent transition disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleVerifyOtp}>
              
              {showDemoOtp && (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-start gap-3 animate-fade-in-down">
                  <CheckCircle className="text-green-600 dark:text-green-400 flex-shrink-0" size={20} />
                  <div>
                    <p className="text-green-800 dark:text-green-300 font-semibold text-sm">OTP Sent Successfully!</p>
                    <p className="text-green-700 dark:text-green-400 text-xs mt-1">
                      (Demo Mode: Use code <strong className="text-lg bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-green-200 dark:border-green-800 ml-1">1234</strong>)
                    </p>
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  One Time Password (OTP)
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    maxLength={4}
                    className="focus:ring-brand-accent focus:border-brand-accent block w-full pl-10 py-3 sm:text-sm border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-md tracking-widest font-bold text-lg"
                    placeholder="XXXX"
                    value={formData.otp}
                    onChange={(e) => setFormData({ ...formData, otp: e.target.value })}
                  />
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 text-right">
                  Didn't receive code? <button type="button" onClick={() => setStep(1)} className="text-brand-accent font-medium hover:underline">Resend</button>
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand-accent hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition disabled:opacity-70 disabled:cursor-not-allowed items-center gap-2"
              >
                {isLoading ? 'Verifying...' : (
                    <>
                        Verify & Login <ArrowRight size={16} />
                    </>
                )}
              </button>
              
              <button 
                type="button" 
                onClick={() => setStep(1)}
                className="w-full text-center text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200"
              >
                Change Mobile Number
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
