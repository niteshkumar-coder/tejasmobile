import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Product } from '../types';
import { MOBILE_PARTS, ACCESSORIES } from '../constants';
import { ShoppingCart, Search, Package, Smartphone, Filter, X } from 'lucide-react';

interface ShopProps {
  addToCart: (id: string) => void;
  products: Product[];
}

export const Shop: React.FC<ShopProps> = ({ addToCart, products }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  useEffect(() => {
    const q = searchParams.get('q');
    if (q !== null) {
      setSearchQuery(q);
    } else {
      setSearchQuery('');
    }
  }, [searchParams]);

  const allProducts = products;
  
  const categories = [
    { name: 'All', icon: <Package size={16} /> },
    { name: 'Mobile Parts', icon: <Smartphone size={16} /> },
    { name: 'Accessories', icon: <ShoppingCart size={16} /> }
  ];

  const filteredProducts = allProducts.filter(p => {
    const matchesCategory = selectedCategory === 'All' 
      || (selectedCategory === 'Mobile Parts' && p.category === 'part')
      || (selectedCategory === 'Accessories' && p.category === 'accessory');
    
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase())
      || (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
      
    return matchesCategory && matchesSearch;
  });

  const handleLocalSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim()) {
      setSearchParams({ q: val });
    } else {
      setSearchParams({});
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <div className="py-12 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-brand-900 dark:text-white mb-4">
            {searchQuery ? 'Search Results' : 'Shop Parts & Gadgets'}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            {searchQuery 
              ? `Showing the best matches for your search.` 
              : 'Browse our full collection of genuine mobile components and premium accessories.'}
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col lg:flex-row items-stretch justify-between gap-6 mb-8">
          <div className="flex items-center gap-2 p-1.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-x-auto no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat.name 
                    ? 'bg-brand-900 text-white shadow-lg' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                {cat.icon} {cat.name}
              </button>
            ))}
          </div>

          <div className="relative flex-1 max-w-xl">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, part or brand..."
              className="w-full pl-12 pr-12 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 focus:ring-2 focus:ring-brand-accent outline-none shadow-sm bg-white dark:bg-slate-900 text-brand-900 dark:text-white font-medium"
              value={searchQuery}
              onChange={handleLocalSearch}
            />
            {searchQuery && (
              <button 
                onClick={clearSearch}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-brand-accent transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Results Metadata */}
        <div className="flex items-center justify-between mb-8 border-b border-slate-200 dark:border-slate-800 pb-4">
           <div className="flex items-center gap-2">
              <span className="text-slate-500 dark:text-slate-400 font-medium">Found:</span>
              <span className="bg-brand-900 text-white px-3 py-0.5 rounded-full text-xs font-black uppercase">
                {filteredProducts.length} Items
              </span>
              {searchQuery && (
                <span className="text-brand-900 dark:text-brand-accent font-bold ml-2">for "{searchQuery}"</span>
              )}
           </div>
           <div className="hidden md:flex items-center gap-4 text-sm font-bold text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1"><Filter size={14}/> Sort by: Default</span>
           </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white dark:bg-slate-900 rounded-xl sm:rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group flex flex-col">
                <div className="aspect-square bg-slate-50 dark:bg-slate-800 overflow-hidden relative flex items-center justify-center p-2 sm:p-4">
                  <div className="absolute inset-0 opacity-10 blur-xl scale-110">
                    <img src={product.image} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                  </div>
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="relative z-10 w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-md" 
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  
                  {product.originalPrice && (
                    <span className="absolute top-4 left-4 bg-brand-accent text-white text-[10px] font-black px-2 py-1 rounded shadow-lg uppercase tracking-wider">
                      Hot Deal
                    </span>
                  )}

                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className={`px-3 py-1.5 rounded-lg text-[10px] font-black text-white shadow-md uppercase tracking-tighter ${product.category === 'part' ? 'bg-blue-600' : 'bg-teal-600'}`}>
                      {product.category === 'part' ? 'Repair Part' : 'Accessory'}
                    </span>
                  </div>
                </div>
                
                <div className="p-3 sm:p-5 flex flex-col flex-1">
                  <div className="mb-1 sm:mb-2 text-center sm:text-left">
                    <span className="text-[8px] sm:text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">
                       {product.category === 'part' ? 'Motherboard/PCB' : 'Gadgets Hub'}
                    </span>
                    <h3 className="font-bold text-slate-900 dark:text-white leading-tight line-clamp-2 h-8 sm:h-12 text-sm sm:text-lg mt-0.5 sm:mt-1">{product.name}</h3>
                  </div>
                  <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 mb-4 line-clamp-2 italic font-medium">{product.description}</p>
                  
                  <div className="mt-auto pt-2 sm:pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-sm sm:text-xl font-black text-brand-900 dark:text-brand-accent">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-[9px] sm:text-xs text-slate-400 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={() => addToCart(product.id)}
                      className="bg-brand-accent text-white p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-orange-600 transition shadow-lg shadow-orange-500/20 active:scale-90 flex items-center justify-center group/btn"
                      title="Add to Cart"
                    >
                      <ShoppingCart size={18} className="sm:w-[22px] sm:h-[22px] group-hover/btn:rotate-12 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 shadow-sm animate-fade-in-down">
             <div className="bg-slate-50 dark:bg-slate-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 border border-slate-100 dark:border-slate-700">
               <Search size={48} className="text-slate-300 dark:text-slate-500" />
             </div>
             <h3 className="text-2xl font-bold text-slate-800 dark:text-white">
               {products.length === 0 ? "Inventory is coming soon!" : "No matching products found"}
             </h3>
             <p className="text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto font-medium">
               {products.length === 0 
                 ? "Our live catalog is being updated with new genuine parts and accessories. Please check back in a few minutes!" 
                 : `We couldn't find anything matching "${searchQuery}". Try checking for typos or use more general terms.`}
             </p>
             {products.length > 0 && searchQuery && (
               <button 
                 onClick={clearSearch}
                 className="mt-8 bg-brand-900 text-white px-10 py-3.5 rounded-xl font-bold hover:bg-brand-accent transition shadow-xl uppercase tracking-widest text-sm"
               >
                 View Entire Collection
               </button>
             )}
          </div>
        )}

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
           {[
             { label: 'Original Parts', desc: '100% Genuine' },
             { label: 'Safe Delivery', desc: 'Insured Shipping' },
             { label: 'Quick Support', desc: 'Expert Tech Help' },
             { label: 'Best Prices', desc: 'Wholesale Rates' }
           ].map((badge, idx) => (
             <div key={idx} className="bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
                <p className="font-black text-brand-900 dark:text-white text-xs uppercase tracking-tighter">{badge.label}</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase">{badge.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};