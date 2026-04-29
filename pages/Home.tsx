import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Wrench, ShieldCheck, 
  Clock, Battery, Droplets, Star, MapPin, BadgeCheck,
  Award, Package, Smartphone, ArrowRight,
  Users, Search, ShoppingCart, ExternalLink, ChevronLeft, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';
import { MOBILE_PARTS, ACCESSORIES } from '../constants';

const HERO_IMAGES = [
  'https://i.ibb.co/WWjbhZLj/8e99f442-cf24-47e8-bbab-46cef0ccc3d2.png',
  'https://i.ibb.co/hx3C97YZ/9baac24d-47d5-400e-857e-74fdd6582f71.png',
  'https://i.ibb.co/PfMYGkx/71af8a4a-c221-484e-8547-bb1163638b57.png',
  'https://i.ibb.co/7xftq9hF/60553826-55ec-43d7-8c4a-184f163e2ae0.png'
];

interface HomeProps {
  addToCart: (id: string) => void;
  products: Product[];
}

export const Home: React.FC<HomeProps> = ({ addToCart, products }) => {
  const [[page, direction], setPage] = useState([0, 0]);
  const currentSlide = Math.abs(page % HERO_IMAGES.length);
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState('');

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [page]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 0.5
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    })
  };

  // Combine some parts and accessories for the showcase
  // We pick a variety of products to show on the home page
  const featuredProducts = products.slice(0, 8);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/shop?q=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  return (
    <div>
      {/* HERO SECTION - Immersive and High-Impact */}
      <section className="relative w-full h-auto overflow-hidden bg-slate-950">
        {/* Dynamic Aspect Ratio Container - Height adjusts to width */}
        <div className="w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[21/8] lg:aspect-[21/7] xl:h-[600px] relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={page}
              custom={direction}
              variants={{
                enter: (direction: number) => ({
                  x: direction > 0 ? '100%' : '-100%',
                  opacity: 0
                }),
                center: {
                  zIndex: 1,
                  x: 0,
                  opacity: 1
                },
                exit: (direction: number) => ({
                  zIndex: 0,
                  x: direction < 0 ? '50%' : '-50%',
                  opacity: 0
                })
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "tween", duration: 0.5, ease: [0.4, 0, 0.2, 1] },
                opacity: { duration: 0.4 }
              }}
              className="absolute inset-0 w-full h-full"
            >
              <div className="relative w-full h-full">
                {/* Background blurred layer - expanded to ensure NO side space is visible as "empty" */}
                <div className="absolute inset-0 overflow-hidden">
                  <img 
                    src={HERO_IMAGES[currentSlide]} 
                    className="w-full h-full object-cover blur-2xl opacity-60 scale-125 pointer-events-none select-none origin-center"
                    aria-hidden="true"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle darkening overlay for the background blur */}
                  <div className="absolute inset-0 bg-black/40"></div>
                </div>
                
                {/* Main hero image - object-contain ensures NO part of the banner is cut off. 
                    The blurred background above handles the "side space" gracefully. */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <img 
                    src={HERO_IMAGES[currentSlide]} 
                    className="w-full h-full object-contain block select-none pointer-events-none drop-shadow-2xl"
                    alt={`Tejas Mobile Hub Hero ${currentSlide + 1}`}
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                {/* Progressive bottom gradient for smoother blend with the next section */}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent pointer-events-none shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"></div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slider Controls */}
        <div className="absolute inset-y-0 left-2 sm:left-8 z-20 flex items-center pointer-events-none">
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); paginate(-1); }}
            className="p-2 sm:p-4 rounded-full bg-black/50 hover:bg-brand-accent text-white transition-all backdrop-blur-xl border border-white/20 group pointer-events-auto hover:scale-110 active:scale-95 shadow-2xl"
          >
            <ChevronLeft size={24} className="sm:w-10 sm:h-10 transition-transform group-hover:-translate-x-1" />
          </button>
        </div>
        <div className="absolute inset-y-0 right-2 sm:right-8 z-20 flex items-center pointer-events-none">
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); paginate(1); }}
            className="p-2 sm:p-4 rounded-full bg-black/50 hover:bg-brand-accent text-white transition-all backdrop-blur-xl border border-white/20 group pointer-events-auto hover:scale-110 active:scale-95 shadow-2xl"
          >
            <ChevronRight size={24} className="sm:w-10 sm:h-10 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-2.5 px-3 py-1.5 bg-black/20 backdrop-blur-sm rounded-full border border-white/5">
          {HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setPage([i, i > currentSlide ? 1 : -1])}
              className={`h-1 sm:h-1.5 rounded-full transition-all duration-500 ${
                currentSlide === i ? 'w-6 sm:w-8 bg-brand-accent shadow-[0_0_8px_rgba(249,115,22,0.6)]' : 'w-1.5 sm:w-2 bg-white/40'
              }`}
            />
          ))}
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION */}
      <section className="py-20 transition-colors duration-300 pb-10">
        <div className="container px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-2">Best Selling Products</h2>
                <p className="text-slate-600 dark:text-slate-400">Top-rated genuine parts and accessories selected for you.</p>
              </div>
              <Link to="/shop" className="text-brand-accent font-bold hover:text-brand-900 dark:hover:text-white flex items-center gap-2">
                 View All Products <ArrowRight size={18} />
              </Link>
           </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {featuredProducts.map((product) => (
                <div key={product.id} className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col">
                   <div className="aspect-square bg-slate-100 dark:bg-slate-800 p-2 sm:p-4 overflow-hidden relative flex items-center justify-center">
                      <div className="absolute inset-0 opacity-10 blur-xl scale-125">
                         <img src={product.image} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                      </div>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="relative z-10 w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-lg" 
                        referrerPolicy="no-referrer"
                      />
                      {product.originalPrice && (
                         <span className="absolute top-3 right-3 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded shadow-lg z-20">
                           SALE
                         </span>
                      )}
                   </div>
                   <div className="p-3 sm:p-4 flex flex-col flex-1">
                      <p className="text-[9px] sm:text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">{product.category === 'part' ? 'Spare Part' : 'Accessory'}</p>
                      <h3 className="text-xs sm:text-base font-bold text-slate-900 dark:text-white mb-1 leading-snug line-clamp-2 h-8 sm:h-auto">{product.name}</h3>
                      <div className="mt-auto pt-2 sm:pt-3 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                         <div>
                            <span className="text-sm sm:text-lg font-black text-brand-900 dark:text-brand-accent">₹{product.price}</span>
                            {product.originalPrice && (
                               <span className="text-[9px] sm:text-xs text-slate-400 line-through block">₹{product.originalPrice}</span>
                            )}
                         </div>
                         <button 
                           onClick={() => addToCart(product.id)}
                           className="bg-brand-900 text-white p-2 sm:p-2.5 rounded-lg hover:bg-brand-accent transition shadow-lg group/btn"
                         >
                            <ShoppingCart size={16} className="sm:w-[18px] sm:h-[18px] group-hover/btn:rotate-12 transition-transform" />
                         </button>
                      </div>
                   </div>
                </div>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
               <Link 
                 to="/shop" 
                 className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-brand-900 dark:border-brand-accent px-10 py-3.5 rounded-xl font-bold hover:bg-brand-900 hover:text-white dark:hover:bg-brand-accent transition shadow-lg group"
               >
                 View All Products <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
               </Link>
            </div>
           

        </div>
      </section>

      {/* QUICK SERVICES ACCESS */}
      <section className="py-10 md:py-20 transition-colors duration-300">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-heading font-bold text-slate-900 dark:text-white mb-2 md:mb-4">Choose Your Solution</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {/* Repair Service Card */}
            <div className="group bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl p-5 md:p-8 border border-slate-100 dark:border-slate-700 hover:border-brand-accent dark:hover:border-brand-accent hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center shadow-sm">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-accent/10 text-brand-accent rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Wrench size={24} className="md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white mb-2 md:mb-3">Professional Repairs</h3>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-6 md:mb-8 flex-grow">Broken screen? Dead battery? Water damage? Our certified experts provide fast chip-level repairs.</p>
              <Link to="/services" className="bg-brand-900 text-white px-6 py-2.5 md:px-8 md:py-3 rounded-lg font-bold hover:bg-brand-accent transition flex items-center gap-2 shadow-lg text-sm md:text-base">
                View Repairs <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
              </Link>
            </div>

            {/* Wholesale Hub */}
            <div className="group bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl p-5 md:p-8 border border-slate-100 dark:border-slate-700 hover:border-brand-accent dark:hover:border-brand-accent hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center shadow-sm">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-accent/10 text-brand-accent rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Package size={24} className="md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white mb-2 md:mb-3">Wholesale Hub</h3>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-6 md:mb-8 flex-grow">Running a repair shop? Get the best B2B rates for displays and IC chips. Same-day dispatch.</p>
              <Link to="/wholesale" className="bg-brand-900 text-white px-6 py-2.5 md:px-8 md:py-3 rounded-lg font-bold hover:bg-brand-accent transition flex items-center gap-2 shadow-lg text-sm md:text-base">
                B2B Catalog <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
              </Link>
            </div>

            {/* Gadgets & Accessories Card */}
            <div className="group bg-white dark:bg-slate-800 rounded-xl md:rounded-2xl p-5 md:p-8 border border-slate-100 dark:border-slate-700 hover:border-orange-500 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center shadow-sm">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-500/10 text-orange-600 rounded-full flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                <Smartphone size={24} className="md:w-8 md:h-8" />
              </div>
              <h3 className="text-lg md:text-2xl font-bold text-slate-900 dark:text-white mb-2 md:mb-3">Gadgets & Parts</h3>
              <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 mb-6 md:mb-8 flex-grow">Shop premium accessories, genuine spare parts, and the latest smart home gadgets online.</p>
              <Link to="/shop" className="bg-brand-900 text-white px-6 py-2.5 md:px-8 md:py-3 rounded-lg font-bold hover:bg-orange-500 transition flex items-center gap-2 shadow-lg text-sm md:text-base">
                Online Store <ArrowRight size={16} className="md:w-[18px] md:h-[18px]" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VISIT STORE SECTION */}
      <section className="py-10 transition-colors duration-300">
         <div className="container px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:gap-8 bg-white dark:bg-slate-900 rounded-2xl shadow-lg overflow-hidden border border-slate-100 dark:border-slate-800">
               {/* Contact/Location Info */}
               <div className="p-6 md:p-8 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 w-fit">
                    <MapPin size={12} /> Visit Our Store
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-slate-900 dark:text-white mb-4 leading-tight">
                    Repair Center <br/><span className="text-brand-accent">Location</span>
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm md:text-base">
                    Come visit us for a free diagnostic check or to browse our latest accessories collection.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                       <div className="bg-brand-900 text-white p-2.5 rounded-xl flex-shrink-0">
                          <MapPin size={20} />
                       </div>
                       <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-base">Tejas Mobile Hub</h4>
                          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">JP Nagar, Lauriya, West Champaran, Bihar</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="bg-brand-900 text-white p-2.5 rounded-xl flex-shrink-0">
                          <Clock size={20} />
                       </div>
                       <div>
                          <h4 className="font-bold text-slate-900 dark:text-white text-base">Opening Hours</h4>
                          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">Mon - Sat: 10:00 AM - 8:00 PM</p>
                          <p className="text-slate-400 dark:text-slate-500 text-[10px] sm:text-xs">Sunday: Closed</p>
                       </div>
                    </div>
                  </div>

                  <a 
                    href="https://www.google.com/maps/dir//Tejas+Mobile+Hub,+JP+Nagar,+Lauriya,+Bihar" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center justify-center gap-2 bg-brand-accent text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg shadow-orange-500/20 text-sm"
                  >
                    Get Directions <ArrowRight size={18} />
                  </a>
               </div>
               
               {/* Embedded Map */}
               <div className="h-64 md:h-80 lg:h-auto bg-slate-200 dark:bg-slate-800 relative group">
                  <iframe 
                    title="Tejas Mobile Location"
                    width="100%" 
                    height="100%" 
                    frameBorder="0"
                    style={{ border: 0 }} 
                    className="w-full h-full filter grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14216.0!2d84.4079!3d26.9992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDU5JzU3LjEiTiA4NMKwMjQnMjguNCJF!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin"
                    allowFullScreen
                  ></iframe>
                  
                  {/* Overlay Button */}
                  <a 
                     href="https://www.google.com/maps/search/?api=1&query=Tejas+Mobile+Hub+JP+Nagar+Lauriya"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="absolute bottom-6 left-6 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold px-4 py-2 rounded-lg shadow-xl hover:bg-brand-900 hover:text-white transition z-20 flex items-center gap-2"
                  >
                     <ExternalLink size={14} /> Open in Google Maps
                  </a>

                  {/* Hover Hint Overlay */}
                  <div className="absolute inset-0 bg-brand-900/10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 bg-[#0a0f1c] relative overflow-hidden vignette">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/20 to-transparent pointer-events-none"></div>
        <div className="container px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 uppercase">Ready for better service?</h2>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-medium px-4">Visit our hub in JP Nagar or shop our catalog online for genuine parts and expert repairs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/contact" 
              className="w-full sm:w-auto bg-brand-accent text-white font-black py-4 px-10 rounded-lg hover:bg-orange-600 transition shadow-xl shadow-orange-500/20 text-lg uppercase tracking-widest"
            >
              Get a Free Quote
            </Link>
            <a 
              href="tel:+919773564409" 
              className="w-full sm:w-auto bg-white text-brand-900 font-black py-4 px-10 rounded-lg hover:bg-slate-100 transition text-lg flex items-center justify-center gap-3 uppercase tracking-widest"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};