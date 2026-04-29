import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Smartphone, ShieldCheck, X, LogIn } from 'lucide-react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../lib/firebase';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // The rules will handle the email check. 
      // We check it here too for UI feedback.
      if (result.user.email === 'niteshk142udhd@gmail.com') {
        onLoginSuccess();
        navigate('/admin/dashboard');
      } else {
        setError('Unauthorized account. Access Denied.');
        await auth.signOut();
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'Tejas9142@') {
      onLoginSuccess();
      navigate('/admin/dashboard');
    } else {
      setError('Invalid admin password. Access Denied.');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] flex items-center justify-center px-4 noise-bg">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="h-28 w-28 rounded-full border-4 border-brand-accent/20 overflow-hidden bg-white/5 backdrop-blur-sm shadow-2xl shadow-brand-accent/20 flex items-center justify-center">
              <img 
                src="https://i.ibb.co/V80WYm0/ded959f5-18df-4f63-87a5-7d5364ac524f.png" 
                alt="Tejas Mobile Hub Logo" 
                className="h-full w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <h1 className="text-3xl font-heading font-black text-white uppercase tracking-tighter">
            Tejas Admin <span className="text-brand-accent">Portal</span>
          </h1>
          <p className="text-slate-400 mt-2 font-medium">Authorized personnel only</p>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl">
          <button 
            onClick={handleGoogleLogin}
            disabled={isLoading}
            className="w-full mb-6 bg-white hover:bg-slate-100 text-slate-900 font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <LogIn size={20} />
            {isLoading ? 'Connecting...' : 'Sign in with Google'}
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#111827] text-slate-500 uppercase tracking-widest text-[10px] font-bold">Or use password</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-slate-300 text-sm font-bold mb-2 uppercase tracking-wide">Enter Admin Key</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                <input 
                  type="password"
                  placeholder="••••••••••••"
                  className="w-full bg-slate-800 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white outline-none focus:ring-2 focus:ring-brand-accent transition-all font-mono"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-xs mt-2 font-bold flex items-center gap-1">
                <X size={12} /> {error}
              </p>}
            </div>

            <button 
              type="submit"
              className="w-full bg-brand-accent hover:bg-orange-600 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20 uppercase tracking-widest flex items-center justify-center gap-2 group"
            >
              <ShieldCheck size={20} className="group-hover:scale-110 transition-transform" />
              Verify & Enter
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.2em]">Security Protocol Active</p>
          </div>
        </div>
        
        <p className="text-center mt-8 text-slate-500 text-xs font-medium italic">
          If you are not the owner, please depart immediately.
        </p>
      </div>
    </div>
  );
};
