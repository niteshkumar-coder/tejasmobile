import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Package, Truck, Award, Zap, Phone, CheckCircle, ShieldCheck, 
  MapPin, Search, Calculator, TrendingDown, Users, FileText, 
  RefreshCcw, HelpCircle, ChevronDown, ChevronUp, Clock, ShoppingCart,
  ArrowRight, Info, Tag
} from 'lucide-react';
import { WHOLESALE_CATALOG, MOBILE_PARTS } from '../constants';

export const Wholesale: React.FC = () => {
  const [calcQuantity, setCalcQuantity] = useState<number>(50);
  const basePrice = 500; 

  const getDiscountRate = (qty: number) => {
    if (qty >= 100) return 0.30;
    if (qty >= 51) return 0.25;
    if (qty >= 11) return 0.15;
    return 0;
  };

  const discountRate = getDiscountRate(calcQuantity);
  const totalOriginal = calcQuantity * basePrice;
  const savings = totalOriginal * discountRate;
  const finalPrice = totalOriginal - savings;

  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen font-sans text-slate-800 dark:text-slate-200 transition-colors duration-300">
      
      {/* 1. HERO SECTION */}
      <div className="bg-brand-900 dark:bg-slate-950 text-white py-24 relative overflow-hidden transition-colors duration-300">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0 opacity-20 mix-blend-overlay"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1920&q=80')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-900/80 to-brand-900 dark:from-slate-950/80 dark:to-slate-950 z-0"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-brand-accent/20 border border-brand-accent/40 rounded-full px-4 py-1.5 mb-8 backdrop-blur-sm">
             <Tag size={14} className="text-brand-accent" />
             <span className="text-brand-accent text-xs font-black tracking-widest uppercase">Official B2B Distribution Hub</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-heading font-bold mb-6 tracking-tight">
            Wholesale <span className="text-brand-accent">Inventory</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
            Direct sourcing from manufacturers. We supply verified genuine parts and accessories to 500+ repair centers across India with tiered wholesale pricing.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={scrollToCatalog}
              className="w-full sm:w-auto bg-brand-accent text-white px-10 py-4 rounded-xl font-black hover:bg-green-600 transition shadow-2xl shadow-green-500/40 flex items-center justify-center gap-3 text-lg group"
            >
              <Package size={22} className="group-hover:rotate-12 transition-transform" /> VIEW BULK RATES
            </button>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-white/10 text-white border border-white/20 px-10 py-4 rounded-xl font-black hover:bg-white/20 transition backdrop-blur-md uppercase tracking-widest text-sm"
            >
              Request Price List
            </Link>
          </div>
        </div>
      </div>

      {/* 2. TRUST STRIP */}
      <div className="bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 py-8 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
             {[
               { icon: Truck, t: "Same Day Dispatch", d: "Order by 2 PM" },
               { icon: ShieldCheck, t: "QC Verified", d: "Zero Dead On Arrival" },
               { icon: RefreshCcw, t: "Easy RMA", d: "7-Day Return Policy" },
               { icon: Calculator, t: "Tiered Pricing", d: "Save up to 40%" }
             ].map((item, i) => (
               <div key={i} className="flex flex-col items-center text-center gap-2">
                 <div className="bg-brand-accent/10 p-3 rounded-full text-brand-accent mb-1">
                    <item.icon size={24} />
                 </div>
                 <h4 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-tighter">{item.t}</h4>
                 <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">{item.d}</p>
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* 3. FULL WHOLESALE CATALOG */}
      <section id="catalog" className="py-24 scroll-mt-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
             <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 dark:text-white mb-4">Bulk Product Showcase</h2>
                <p className="text-slate-600 dark:text-slate-400 font-medium">Browse our complete live inventory. Pricing is tiered based on order volume. Click any item for specialized wholesale quotes.</p>
             </div>
             <div className="bg-brand-900 dark:bg-slate-800 text-white px-6 py-4 rounded-2xl flex items-center gap-4 shadow-xl">
                <div className="bg-brand-accent p-2 rounded-lg"><Info size={20} /></div>
                <div className="text-xs">
                   <p className="font-black uppercase tracking-widest">Pricing Policy</p>
                   <p className="text-slate-400">Quotes vary by market daily rates</p>
                </div>
             </div>
          </div>

          <div className="space-y-24">
            {WHOLESALE_CATALOG.map((category, idx) => (
              <div key={idx} className="relative">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-10">
                   <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                   <h3 className="text-xl md:text-2xl font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-4">
                      {category.title}
                   </h3>
                   <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {category.items.map((item, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden flex flex-col">
                       {/* Product Image Area */}
                       <div className="aspect-[4/5] relative overflow-hidden bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-4">
                          <div className="absolute inset-0 opacity-10 blur-xl scale-110">
                            <img src={item.image} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                          </div>
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="relative z-10 w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-md" 
                            referrerPolicy="no-referrer"
                          />
                          
                          {/* Floating Badges */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                             <span className="bg-brand-900 text-white text-[9px] font-black px-2.5 py-1 rounded shadow-lg uppercase tracking-tighter">
                               MOQ: 10 PCS
                             </span>
                             <span className="bg-green-600 text-white text-[9px] font-black px-2.5 py-1 rounded shadow-lg uppercase tracking-tighter">
                               In Stock
                             </span>
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-brand-900/90 dark:bg-slate-950/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center p-6 text-white translate-y-4 group-hover:translate-y-0 duration-300">
                             <h4 className="text-brand-accent font-black text-xs uppercase mb-4 tracking-widest">Tiered Wholesale Rates</h4>
                             <div className="space-y-3">
                                <div className="flex justify-between border-b border-white/10 pb-1.5 text-xs">
                                   <span className="text-slate-400">11 - 50 Units</span>
                                   <span className="font-bold">15% OFF</span>
                                </div>
                                <div className="flex justify-between border-b border-white/10 pb-1.5 text-xs">
                                   <span className="text-slate-400">51 - 100 Units</span>
                                   <span className="font-bold text-green-400">25% OFF</span>
                                </div>
                                <div className="flex justify-between pb-1.5 text-xs">
                                   <span className="text-slate-400">100+ Units</span>
                                   <span className="font-black text-brand-accent">B2B DEAL</span>
                                </div>
                             </div>
                             <Link to="/contact" className="mt-8 bg-white text-brand-900 w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-accent hover:text-white transition text-center block">
                                Request Quote
                             </Link>
                          </div>
                       </div>

                       {/* Product Info Area */}
                       <div className="p-6 flex-1 flex flex-col bg-white dark:bg-slate-900">
                          <div className="mb-4">
                             <p className="text-[10px] text-brand-accent font-black uppercase tracking-[0.2em] mb-1">Genuine Sourcing</p>
                             <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight group-hover:text-brand-accent transition-colors">
                               {item.name}
                             </h3>
                          </div>
                          
                          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6 font-medium italic">
                            {item.description}
                          </p>

                          <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                             <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Wholesale Starting</p>
                                <p className="text-brand-900 dark:text-white font-black text-xl">₹ Quote</p>
                             </div>
                             <Link to="/contact" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 p-3 rounded-2xl hover:bg-brand-accent hover:text-white transition-all shadow-sm group/btn">
                                <Phone size={20} className="group-hover/btn:rotate-12 transition-transform" />
                             </Link>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* NEW SECTION: MAIN MOBILE PARTS */}
            <div className="relative">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-10">
                   <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                   <h3 className="text-xl md:text-2xl font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] px-4 text-center">
                      Main Mobile Parts (Ready Stock)
                   </h3>
                   <div className="h-px bg-slate-200 dark:bg-slate-800 flex-1"></div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {MOBILE_PARTS.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl transition-all duration-500 group overflow-hidden flex flex-col">
                       {/* Product Image Area */}
                       <div className="aspect-[4/5] relative overflow-hidden bg-slate-50 dark:bg-slate-800 flex items-center justify-center p-4">
                          <div className="absolute inset-0 opacity-10 blur-xl scale-110">
                            <img src={item.image} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                          </div>
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="relative z-10 w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-md" 
                            referrerPolicy="no-referrer"
                          />
                          
                          {/* Floating Badges */}
                          <div className="absolute top-4 left-4 flex flex-col gap-2">
                             <span className="bg-brand-900 text-white text-[9px] font-black px-2.5 py-1 rounded shadow-lg uppercase tracking-tighter">
                               Verified Part
                             </span>
                          </div>

                          {/* Hover Overlay */}
                          <div className="absolute inset-0 bg-brand-900/90 dark:bg-slate-950/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center p-6 text-white translate-y-4 group-hover:translate-y-0 duration-300">
                             <h4 className="text-brand-accent font-black text-xs uppercase mb-4 tracking-widest">Bulk Quote</h4>
                             <p className="text-xs text-slate-300 mb-6 font-medium">
                               Looking for quantity? Request a quote for {item.name}.
                             </p>
                             <Link to="/contact" className="bg-white text-brand-900 w-full py-3 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-brand-accent hover:text-white transition text-center">
                                Request Quote
                             </Link>
                          </div>
                       </div>

                       {/* Product Info Area */}
                       <div className="p-6 flex-1 flex flex-col bg-white dark:bg-slate-900">
                          <div className="mb-4">
                             <p className="text-[10px] text-brand-accent font-black uppercase tracking-[0.2em] mb-1">OEM / Original</p>
                             <h3 className="font-bold text-slate-900 dark:text-white text-lg leading-tight group-hover:text-brand-accent transition-colors">
                               {item.name}
                             </h3>
                          </div>
                          
                          <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-6 font-medium italic">
                            {item.description}
                          </p>

                          <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                             <div className="flex flex-col">
                                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Single Unit Price</span>
                                <span className="text-brand-900 dark:text-white font-black text-xl">₹{item.price}</span>
                             </div>
                             <Link to="/contact" className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 p-3 rounded-2xl hover:bg-brand-accent hover:text-white transition-all shadow-sm group/btn">
                                <FileText size={20} className="group-hover/btn:rotate-12 transition-transform" />
                             </Link>
                          </div>
                       </div>
                    </div>
                  ))}
                </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. SAVINGS CALCULATOR */}
      <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="bg-brand-900 dark:bg-slate-800 rounded-[3rem] overflow-hidden shadow-2xl relative transition-colors duration-300">
             <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-accent/10 -skew-x-12 translate-x-1/2"></div>
             
             <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 md:p-16 items-center">
                <div>
                   <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Bulk Savings <br/> <span className="text-brand-accent text-6xl">Calculator</span></h2>
                   <p className="text-slate-400 text-lg mb-8">See how much you can save on your monthly inventory sourcing. Adjust the slider to see the tiered discount impact.</p>
                   
                   <ul className="space-y-4">
                      {[
                        "Zero Upfront Membership Fees",
                        "Dedicated Account Manager",
                        "Priority Stock Reservation",
                        "API Access for Bulk Tracking"
                      ].map((txt, i) => (
                        <li key={i} className="flex items-center gap-3 text-white font-medium">
                           <CheckCircle className="text-brand-accent" size={20} />
                           {txt}
                        </li>
                      ))}
                   </ul>
                </div>

                <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl text-slate-900 dark:text-white">
                    <div className="space-y-8">
                       <div>
                         <label className="block text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4">Select Order Quantity</label>
                         <input 
                          type="range" 
                          min="1" 
                          max="200" 
                          value={calcQuantity} 
                          onChange={(e) => setCalcQuantity(parseInt(e.target.value))}
                          className="w-full h-3 bg-slate-100 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-accent"
                         />
                         <div className="mt-4 flex justify-between items-center">
                           <span className="text-xs font-bold text-slate-400">1 UNIT</span>
                           <span className="bg-brand-900 dark:bg-slate-700 text-white px-4 py-1.5 rounded-full font-black text-xl">{calcQuantity} UNITS</span>
                           <span className="text-xs font-bold text-slate-400">200+ UNITS</span>
                         </div>
                       </div>

                       <div className="bg-slate-50 dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 space-y-4">
                          <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                            <span className="text-sm font-bold">Standard MRP Value</span>
                            <span className="font-bold">₹{totalOriginal.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between items-center text-green-600">
                            <span className="text-sm font-bold uppercase tracking-tighter">B2B Savings ({(discountRate * 100).toFixed(0)}%)</span>
                            <span className="font-black text-lg">- ₹{savings.toLocaleString()}</span>
                          </div>
                          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex justify-between items-center">
                            <span className="font-black text-brand-900 dark:text-white uppercase tracking-widest text-sm">Wholesale Total</span>
                            <span className="text-4xl font-black text-brand-900 dark:text-white">₹{finalPrice.toLocaleString()}</span>
                          </div>
                       </div>

                       <Link to="/contact" className="w-full bg-brand-accent text-white py-5 rounded-2xl font-black text-lg hover:bg-green-600 transition shadow-xl shadow-green-500/20 uppercase tracking-widest block text-center">
                          Contact Sourcing Team
                       </Link>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 5. QUICK QUOTE CTA */}
      <section className="py-24 bg-slate-900 dark:bg-slate-950 text-white text-center relative overflow-hidden transition-colors duration-300">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_#16a34a10_0%,_transparent_70%)] opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10">
           <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 uppercase tracking-tighter">Scale Your Business with <br/> <span className="text-brand-accent">Tejas Mobile Hub</span></h2>
           <p className="text-slate-400 max-w-2xl mx-auto mb-12 text-lg">Partner with JP Nagar's leading distributor. Join our network of 500+ successful repair businesses today.</p>
           <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="tel:+919773564409" className="bg-white text-brand-900 px-12 py-5 rounded-2xl font-black text-lg hover:bg-slate-100 transition shadow-2xl flex items-center justify-center gap-3">
                 <Phone size={24} /> CALL SALES DESK
              </a>
              <a href="https://wa.me/+919773564409" className="bg-green-600 text-white px-12 py-5 rounded-2xl font-black text-lg hover:bg-green-700 transition shadow-2xl flex items-center justify-center gap-3">
                 <Zap size={24} /> WHATSAPP B2B
              </a>
           </div>
        </div>
      </section>

    </div>
  );
};