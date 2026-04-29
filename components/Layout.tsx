import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Smartphone, User as UserIcon, LogOut, Package, Sun, Moon, Lock, ShieldCheck, Star, Award, CheckCircle } from 'lucide-react';
import { User } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: User | null;
  onLogout: () => void;
  cartCount: number;
}

export const Layout: React.FC<LayoutProps> = ({ children, user, onLogout, cartCount }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage or system preference
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      return true;
    }
    return false;
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-[#0a0f1c] dark:bg-slate-950 text-white sticky top-0 z-40 shadow-xl border-b border-white/5 dark:border-slate-800 transition-colors duration-300">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="h-12 w-12 rounded-full border-2 border-brand-accent/20 overflow-hidden bg-white flex items-center justify-center transition-transform group-hover:scale-105">
                <img 
                  src="https://i.ibb.co/V80WYm0/ded959f5-18df-4f63-87a5-7d5364ac524f.png" 
                  alt="Tejas Mobile Hub Logo" 
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="hidden sm:block">
                <span className="font-heading font-bold text-xl md:text-2xl tracking-tight leading-none block">TEJAS</span>
                <span className="text-[10px] text-brand-accent font-bold uppercase tracking-widest block leading-none">Mobile Hub</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-slate-300 hover:text-white font-medium transition-colors text-sm uppercase tracking-wide">Home</Link>
              <Link to="/shop" className="text-slate-300 hover:text-white font-medium transition-colors text-sm uppercase tracking-wide">Shop</Link>
              <Link to="/services" className="text-slate-300 hover:text-white font-medium transition-colors text-sm uppercase tracking-wide">Services</Link>
              <Link to="/wholesale" className="text-brand-accent hover:text-orange-400 font-bold transition-colors text-sm uppercase tracking-wide">Wholesale</Link>
              <Link to="/contact" className="text-slate-300 hover:text-white font-medium transition-colors text-sm uppercase tracking-wide">Contact</Link>
            </div>

            {/* Icons */}
            <div className="hidden md:flex items-center gap-6">
               <button onClick={toggleTheme} className="text-slate-300 hover:text-brand-accent transition-colors" title="Toggle Theme">
                 {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
               </button>

               <Link to="/cart" className="relative group">
                 <ShoppingCart size={24} className="text-slate-300 group-hover:text-white transition-colors" />
                 {cartCount > 0 && (
                   <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-bounce">
                     {cartCount}
                   </span>
                 )}
               </Link>

               {user ? (
                 <div className="flex items-center gap-4">
                    <Link to="/orders" className="flex items-center gap-2 text-slate-300 hover:text-white transition">
                       <Package size={20} />
                       <span className="text-sm font-medium hidden lg:inline">My Orders</span>
                    </Link>
                    <button onClick={handleLogout} className="flex items-center gap-2 text-slate-300 hover:text-red-400 transition" title="Logout">
                       <LogOut size={20} />
                    </button>
                 </div>
               ) : (
                 <Link to="/login" className="flex items-center gap-2 text-slate-300 hover:text-white transition">
                    <UserIcon size={24} />
                 </Link>
               )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
               <button onClick={toggleTheme} className="text-slate-300 hover:text-brand-accent transition-colors">
                 {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
               </button>
               <Link to="/cart" className="relative">
                 <ShoppingCart size={24} className="text-slate-300" />
                 {cartCount > 0 && (
                   <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                     {cartCount}
                   </span>
                 )}
               </Link>
               <button onClick={toggleMenu} className="text-slate-300 hover:text-white">
                 {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
               </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMenuOpen && (
          <div className="md:hidden bg-brand-800 dark:bg-slate-900 border-t border-brand-700 dark:border-slate-800 absolute w-full left-0 shadow-2xl animate-fade-in-down">
            <div className="flex flex-col p-4 space-y-4">
              <Link to="/" onClick={toggleMenu} className="text-slate-300 hover:text-white py-2 border-b border-brand-700 dark:border-slate-800">Home</Link>
              <Link to="/shop" onClick={toggleMenu} className="text-slate-300 hover:text-white py-2 border-b border-brand-700 dark:border-slate-800">Shop Parts</Link>
              <Link to="/services" onClick={toggleMenu} className="text-slate-300 hover:text-white py-2 border-b border-brand-700 dark:border-slate-800">Repair Services</Link>
              <Link to="/wholesale" onClick={toggleMenu} className="text-brand-accent hover:text-white py-2 border-b border-brand-700 dark:border-slate-800 font-bold">Wholesale Hub</Link>
              <Link to="/contact" onClick={toggleMenu} className="text-slate-300 hover:text-white py-2 border-b border-brand-700 dark:border-slate-800">Contact Us</Link>
              
              {user ? (
                <>
                  <Link to="/orders" onClick={toggleMenu} className="text-slate-300 hover:text-white py-2 border-b border-brand-700 dark:border-slate-800">My Orders</Link>
                  <button onClick={() => { handleLogout(); toggleMenu(); }} className="text-red-400 hover:text-red-300 py-2 text-left">Logout</button>
                </>
              ) : (
                <Link to="/login" onClick={toggleMenu} className="text-slate-300 hover:text-white py-2">Login / Sign Up</Link>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-grow bg-[#f5f5f5] dark:bg-slate-950 transition-colors duration-300">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-[#050810] dark:bg-slate-950 text-slate-400 pb-8 transition-colors duration-300">
        
        {/* Trust Badges Banner */}
        <div className="bg-[#0a0f1c] dark:bg-slate-900/50 border-b border-white/5 py-8 md:py-10">
          <div className="container px-4 sm:px-6 lg:px-8">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-x-4">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                   <div className="p-2 bg-brand-accent/10 rounded-lg text-brand-accent">
                      <CheckCircle size={20} />
                   </div>
                   <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-200">Certified Technicians</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                   <div className="p-2 bg-brand-accent/10 rounded-lg text-brand-accent">
                      <ShieldCheck size={20} />
                   </div>
                   <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-200">90-Day Repair Warranty</span>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                   <div className="flex flex-col items-center md:items-start">
                      <div className="flex gap-0.5 text-brand-accent mb-1">
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                      </div>
                      <span className="text-sm md:text-lg font-black text-white">4.9/5 Rating</span>
                   </div>
                </div>
                <div className="flex items-center gap-3 justify-center md:justify-start">
                   <div className="p-2 bg-brand-accent/10 rounded-lg text-brand-accent">
                      <Award size={20} />
                   </div>
                   <span className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-200">Quality Assured Service</span>
                </div>
             </div>
          </div>
        </div>

        <div className="container px-4 sm:px-6 lg:px-8 pt-12 md:pt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            <div className="space-y-6">
               <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full border-2 border-white/10 overflow-hidden bg-white/5 flex items-center justify-center">
                    <img 
                      src="https://i.ibb.co/V80WYm0/ded959f5-18df-4f63-87a5-7d5364ac524f.png" 
                      alt="Tejas Mobile Hub Logo" 
                      className="h-full w-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <span className="font-heading font-black text-white text-2xl tracking-tight">TEJAS</span>
               </div>
               <p className="text-xs md:text-sm leading-relaxed text-slate-500 max-w-xs">
                 Your trusted partner for genuine mobile parts, professional repairs, and wholesale electronics in Bihar.
               </p>
            </div>
            
            <div>
              <h4 className="text-white font-black mb-6 uppercase text-xs tracking-[0.2em]">Shop & Services</h4>
              <ul className="space-y-3 text-xs md:text-sm">
                <li><Link to="/mobile-parts" className="hover:text-brand-accent transition flex items-center gap-2">Mobile Parts</Link></li>
                <li><Link to="/accessories" className="hover:text-brand-accent transition flex items-center gap-2">Accessories</Link></li>
                <li><Link to="/services" className="hover:text-brand-accent transition flex items-center gap-2">Repair Services</Link></li>
                <li><Link to="/wholesale" className="hover:text-brand-accent transition flex items-center gap-2">Wholesale Catalog</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black mb-6 uppercase text-xs tracking-[0.2em]">Support</h4>
              <ul className="space-y-3 text-xs md:text-sm">
                <li><Link to="/contact" className="hover:text-brand-accent transition flex items-center gap-2">Contact Us</Link></li>
                <li><Link to="/shipping" className="hover:text-brand-accent transition flex items-center gap-2">Shipping Policy</Link></li>
                <li><Link to="/refund" className="hover:text-brand-accent transition flex items-center gap-2">Returns & Refunds</Link></li>
                <li><Link to="/terms" className="hover:text-brand-accent transition flex items-center gap-2">Terms & Conditions</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black mb-6 uppercase text-xs tracking-[0.2em]">Visit Us</h4>
              <div className="space-y-4 text-xs md:text-sm">
                <div className="text-slate-500">
                  <p>JP Nagar, Lauriya</p>
                  <p>West Champaran, Bihar</p>
                </div>
                <div className="pt-2">
                  <p className="text-brand-accent font-black text-sm md:text-base">+91 97735 64409</p>
                  <p className="text-slate-500 mt-1">tejasmobilehubhelp@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 mt-16 md:mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] md:text-xs">
            <p className="text-slate-600 font-medium">&copy; {new Date().getFullYear()} Tejas Mobile Hub. All rights reserved.</p>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
               <Link to="/admin/login" className="text-slate-600 hover:text-brand-accent transition font-black uppercase tracking-[0.2em] flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                 <Lock size={12} /> Admin Login
               </Link>
               <p className="text-slate-600 font-bold uppercase tracking-[0.1em]">Designed for Performance & Trust.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};