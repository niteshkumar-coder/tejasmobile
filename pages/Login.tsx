import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      // Success handled by App.tsx observer
    } catch (err: any) {
      console.error("Login Error:", err);
      if (err.code === 'auth/popup-blocked') {
        setError('Popup Blocked! Please allow popups for this site or open the app in a "New Tab" using the icon at the top right of the preview.');
      } else {
        setError(err.message || 'Failed to connect to Google Security Services.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 transition-colors duration-300 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="h-28 w-28 rounded-full border-4 border-brand-accent/10 overflow-hidden bg-white shadow-2xl flex items-center justify-center">
              <img 
                src="https://i.ibb.co/V80WYm0/ded959f5-18df-4f63-87a5-7d5364ac524f.png" 
                alt="Tejas Mobile Hub Logo" 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tighter mb-2">
            Tejas Mobile Hub
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest bg-slate-100 dark:bg-slate-900 inline-block px-3 py-1 rounded-full">
            Professional Access Portal
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 py-10 px-6 shadow-2xl shadow-slate-200 dark:shadow-none sm:rounded-3xl sm:px-10 border border-slate-100 dark:border-slate-800 transition-colors duration-300">
          <div className="text-center mb-8">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Mandatory Verification</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">To maintain inventory security and track repairs, Google Authentication is required for all hub users.</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-400 px-4 py-3 rounded-r text-sm font-bold flex items-center gap-2">
              <span className="flex-shrink-0 animate-pulse">⚠️</span>
              {error}
            </div>
          )}

          <div className="space-y-6">
            <button
              onClick={handleGoogleLogin}
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-4 py-4 px-4 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm text-sm font-black text-slate-700 dark:text-white bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {isLoading ? 'Verifying Secure Channel...' : 'SIGN IN WITH GOOGLE'}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-white dark:bg-slate-900 text-slate-500 font-bold tracking-widest">Secure Link</span>
              </div>
            </div>

            <p className="text-center text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-tighter leading-tight">
              By connecting, you agree to Tejas Mobile Hub's Professional Terms of Service and Data Privacy protocols.
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-center">
           <p className="text-xs text-slate-500 dark:text-slate-600 font-medium tracking-tight">Looking for bulk orders? Contact Support.</p>
        </div>
      </div>
    </div>
  );
};
